import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [invoicePreview, setInvoicePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/order/get-user-orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const openInvoicePreview = (invoiceBase64) => {
    if (!invoiceBase64) {
      toast.error("Invoice not available.");
      return;
    }
    setInvoicePreview(invoiceBase64);
    setIsModalOpen(true);
  };

  const handleDownloadInvoice = () => {
    if (!invoicePreview) return;
    const linkSource = `data:application/pdf;base64,${invoicePreview}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = "invoice.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // ✅ Helper to format order ID (last 4 digits only)
  const getShortOrderId = (id) => {
    return id ? id.slice(-4) : "";
  };

  // ✅ Helper to format date in Indian format
  const formatIndianDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6 border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Order ID: #{getShortOrderId(order._id)}
                </p>
                <p className="text-sm text-gray-600">
                  Ordered on: {formatIndianDate(order.createdAt)}
                </p>
              </div>
              <button
                onClick={() => openInvoicePreview(order.invoice)}
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl transition duration-300 w-full sm:w-auto"
              >
                Preview & Download Invoice
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <p>
                <span className="font-medium">Order Status:</span>{" "}
                <span className="text-yellow-600">{order.orderStatus}</span>
              </p>
              <p>
                <span className="font-medium">Payment Status:</span>{" "}
                <span className="text-red-600">{order.paymentStatus}</span>
              </p>
              <p>
                <span className="font-medium">Shipping Address:</span>{" "}
                {order.shippingAddress}
              </p>
              <p>
                <span className="font-medium">Total:</span> ₹{order.totalAmount}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Products:</h3>
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl mb-2"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{item.product.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Invoice Modal */}
      {isModalOpen && invoicePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto p-4 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Invoice Preview
            </h3>
            <iframe
              src={`data:application/pdf;base64,${invoicePreview}`}
              title="Invoice Preview"
              className="w-full h-[60vh] sm:h-[70vh] rounded border"
            ></iframe>
            <div className="text-center mt-4">
              <button
                onClick={handleDownloadInvoice}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-xl transition duration-300"
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
