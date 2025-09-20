import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth, useUser, useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"

const ProductUser = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useSignIn();
  const {
    name,
    description,
    price,
    discount,
    images = [],
    videos = [],
    ratings = {},
    stock,
    category,
  } = product;

  const { getToken } = useAuth();

  const calculatedMRP = Math.round(price / (1 - discount / 100));
  const [selectedMedia, setSelectedMedia] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  const isVideo = (url) => typeof url === "string" && url.includes("mp4");


  const redirectToLogin = () => {
    // toast.info("Please log in to continue");
    navigate("/sign-in");
  };

  const handleAddtoCart = async (product, quantity) => {
    if (!user) {
      redirectToLogin();
      return;
    }
    const token = await getToken();
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER}/cart/add-to-cart/${product._id}`, { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response for cart : ", res);
      toast.success("Item Added to Cart Successfully ! ");
    } catch (error) {
      console.log("Error while adding to cart ! : ", error);
      toast.error("Failed to add product to cart !");
    }
  }
  const handleBuyNow = async (product, quantity) => {
    if (!user) {
      redirectToLogin();
      return;
    }
    const token = await getToken();
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER}/cart/add-to-cart/${product._id}`, { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response for cart : ", res);
      toast.success("Item Added to Cart Successfully ! ");
      setTimeout(() => {
        navigate("/cart");
      }, 2000);
    } catch (error) {
      console.log("Error while adding to cart ! : ", error);
      toast.error("Failed to add product to cart !");
    }
  }


  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-6xl p-6 flex flex-col md:flex-row gap-8 border rounded-xl shadow-lg bg-white">
        {/* Left: Media */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Thumbnail"
                onClick={() => setSelectedMedia(img)}
                className={`w-14 h-14 object-cover rounded-lg cursor-pointer border transition ${selectedMedia === img ? "border-blue-500" : "border-gray-300"
                  } hover:opacity-80`}
              />
            ))}
            {videos.length > 0 &&
              videos.map((vid, idx) => (
                <video
                  key={idx}
                  className={`w-14 h-14 object-cover rounded-lg cursor-pointer border transition ${selectedMedia === vid ? "border-blue-500" : "border-gray-300"
                    } hover:opacity-80`}
                  onClick={() => setSelectedMedia(vid)}
                >
                  <source src={vid} type="video/mp4" />
                </video>
              ))}
          </div>

          {/* Main Display */}
          <div className="flex-1 flex justify-center items-center">
            {isVideo(selectedMedia) ? (
              <video
                controls
                className="w-full max-h-80 rounded-xl shadow-md object-contain"
              >
                <source src={selectedMedia} type="video/mp4" />
              </video>
            ) : (
              <img
                src={selectedMedia}
                alt="Selected"
                className="w-full max-h-80 rounded-xl shadow-md object-contain"
              />
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 space-y-5">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">{name}</h1>
          <p className="text-gray-600">{description}</p>
          <p className="text-gray-700 font-medium">
            Category: <span className="text-blue-600">{category}</span>
          </p>
          <p className="text-lg font-semibold text-yellow-600">
            ⭐ {ratings?.average || 0} ({ratings?.count || 0} reviews)
          </p>

          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-gray-900">₹{price}</span>
            <span className="line-through text-gray-500">₹{calculatedMRP}</span>
            <span className="text-green-600 font-semibold">-{discount}% OFF</span>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-medium">Quantity:</label>
            <div className="flex items-center space-x-2 border rounded-md px-2 py-1">
              <button
                onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                className="w-8 h-8 bg-gray-200 text-black rounded hover:bg-gray-300"
              >
                −
              </button>
              <span className="min-w-[24px] text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-8 h-8 bg-gray-200 text-black rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>


          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button className="flex-1 bg-yellow-500 text-white py-2 rounded-lg shadow hover:bg-yellow-600 transition font-medium"
              onClick={() => handleAddtoCart(product, quantity)}>
              Add to Cart
            </button>
            <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg shadow hover:bg-orange-600 transition font-medium"
              onClick={() => handleBuyNow(product, quantity)}>
              Buy Now
            </button>
          </div>

          <p
            className={`font-semibold ${stock > 0 ? "text-green-600" : "text-red-500"
              }`}
          >
            {stock > 0 ? `In Stock` : "Out of Stock"}
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProductUser;
