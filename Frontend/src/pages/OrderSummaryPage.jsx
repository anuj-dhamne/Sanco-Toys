import { useEffect, useState } from "react";
import OrderSummary from "../components/common/OrderSummary";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useUserStore } from "../context/useUserStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState(""); // ✅ Shipping address state
  const { getToken } = useAuth();
  const user = useUserStore().userData;

  useEffect(() => {
    const fetchCart = async () => {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_SERVER}/cart/get-cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.data);
    };
    fetchCart();
  }, []);

  const handlePayment = async () => {
    // console.log("in handle payment function");
    if (!address.trim()) {
      toast.error("Please enter your shipping address");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const token = await getToken();
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER}/payment/create-order`,
      { amount: totalAmount ,shippingAddress:address },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("data from backend : ",data);
    // console.log("amount data : ",data.data.amount);

    const options = {
      key: `${import.meta.env.VITE_RAZORPAY_KEY}`,
      amount: data.data.amount,
      currency: "INR",
      name: "Sanco Toys",
      description: "Test Transaction",
      order_id: data.data.id,
      handler: async function (response) {
        const verificationResponse = await axios.post(
          `${import.meta.env.VITE_SERVER}/payment/verify`,
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            shippingAddress: address,
            amount:data.data.amount // ✅ Optional: pass address for saving
          }
        );

        if (verificationResponse.status === 200) {
          toast.success("Payment Done!");
          fetchCart();
          navigate("/orders");
        } else {
          toast.error("Payment Failed!");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phoneNumber,
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  if (!cart) return <p>Loading...</p>;

  const subtotal = cart.products.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  // const shipping = 40;
  const shipping = 0;
  const totalAmount = subtotal + shipping;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <OrderSummary cart={cart} />
      {/* ✅ Shipping Address Input */}
      <div className="mt-6">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Shipping Address <span className="text-red-500">*</span>
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your shipping address"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      {/* ✅ Payment Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handlePayment}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
