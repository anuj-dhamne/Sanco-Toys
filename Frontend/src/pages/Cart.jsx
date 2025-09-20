import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Plus, Minus } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CartItemList = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_SERVER}/cart/get-cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.data);
    } catch (err) {
      // console.error("Fetching cart failed:", err);
      toast.error("There So no Product in cart !");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);


  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      console.log(" new Quantity : ",newQuantity);
      console.log("product ID :",productId);
      const token = await getToken();
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER}/cart/update-cart-item/${productId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(res.data.data);
      toast.success("Quantity updated!");
    } catch (err) {
      console.error("Update quantity failed:", err);
      toast.error("Failed to update quantity.");
    }
  };

  const handleRemove = async (productId) => {
    try {
      const token = await getToken();
      console.log("toten : ",token);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/cart/remove-from-cart/${productId}`,{},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(res.data.data);
      toast.success("Product removed!");
    } catch (err) {
      console.error("Remove from cart failed:", err);
      toast.error("Failed to remove product.");
    }
  };

  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading cart...</p>;
  }

  if (!cart || cart.products.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Cart Items */}
      <div className="space-y-4">
        {cart.products.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            {/* Left: Image and Product Name */}
            <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
              <img
                src={
                  item.product.images && item.product.images.length > 0
                    ? item.product.images[0]
                    : "https://via.placeholder.com/100"
                }
                alt={item.product.name || "Product"}
                className="h-24 w-24 sm:h-28 sm:w-28 object-contain rounded-xl"
                loading="lazy"
              />
              <h2 className="text-base sm:text-lg font-semibold">{item.product.name || "No Name"}</h2>
            </div>

            {/* Price */}
            <div className="w-full sm:w-24 text-center">
              <p className="text-gray-700 font-semibold">₹{item.product.price}</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2 justify-center w-full sm:w-auto">
              <button
                onClick={() =>
                  item.quantity > 1 &&
                  handleQuantityChange(item.product._id, item.quantity - 1)
                }
                className="p-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                <Minus size={16} />
              </button>
              <span className="text-lg">{item.quantity}</span>
              <button
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity + 1)
                }
                className="p-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Remove button */}
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <button
                onClick={() => handleRemove(item.product._id)}
                className="text-red-600 flex items-center gap-1 text-sm hover:underline"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Amount and Order Now Button */}
      <div className="mt-10 bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center space-y-6">
        <h3 className="text-2xl font-semibold text-center">Total Amount: ₹{calculateTotal()}</h3>
        <button
          className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300 text-lg"
          onClick={()=>{navigate("/order-summary")}}
        >
          Order Now
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CartItemList;
