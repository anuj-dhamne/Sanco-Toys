import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminOrders = () => {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER}/order/get-all-orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch orders");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingStatus(orderId);
    const token = await getToken();
    try {
      await axios.patch(
        `${import.meta.env.VITE_SERVER}/order/update-order-status/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Order status updated!");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus("");
    }
  };

  const handleInvoicePreview = (invoiceBase64) => {
    if (!invoiceBase64) {
      toast.warn("Invoice not available.");
      return;
    }

    const pdfDataUrl = invoiceBase64.startsWith("data:application/pdf;base64,")
      ? invoiceBase64
      : `data:application/pdf;base64,${invoiceBase64}`;

    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head><title>Invoice Preview</title></head>
          <body style="margin:0">
            <iframe width="100%" height="100%" style="border:0" src="${pdfDataUrl}"></iframe>
          </body>
        </html>
      `);
    } else {
      toast.error("Failed to open new window for preview.");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <ToastContainer />
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">All Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 bg-white space-y-4"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-base sm:text-lg font-semibold text-gray-800">
                Order ID: {order._id}
              </div>
              <button
                onClick={() => handleInvoicePreview(order.invoice)}
                className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                Preview Invoice
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium">User:</p>
                <p>{order.user?.name || "Guest"}</p>
                <p>{order.user?.email || "N/A"}</p>
                <p>{order.user?.phone || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">Shipping Address:</p>
                <p>{order.shippingAddress || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">Total Amount:</p>
                <p>₹{order.totalAmount}</p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  <span
                    className={`font-semibold ${
                      order.paymentStatus === "paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm">
              <label className="font-medium">Order Status:</label>
              <select
                value={order.orderStatus}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
                disabled={updatingStatus === order._id}
              >
                {["processing", "shipped", "delivered", "cancelled"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="font-medium mb-1">Products:</p>
              <ul className="list-disc pl-6 text-sm space-y-1">
                {order.products.map((item) => (
                  <li key={item.product._id}>
                    {item.product.name} (Qty: {item.quantity}) — ₹{item.product.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-6">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
