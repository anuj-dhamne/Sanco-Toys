import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ProductDisplay = ({ product,refreshProducts }) => {
const { getToken } = useAuth();
  const navigate = useNavigate();

const handleEdit = () => {
  navigate(`/admin/update-product/${product._id}`, { state: product });
};

const handleDelete=async(product)=>{
  const token = await getToken();
  try {
    const res= await axios.delete(`${import.meta.env.VITE_SERVER}/product/delete-product/${product._id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    toast.success("Product deleted successfully ! ");
    refreshProducts()
  } catch (error) {
    toast.error("Not able to delete product !");
  }
}

  const {
    name,
    description,
    price,
    discount,
    stock,
    images = [],
    videos = [],
    rating,
    category,
  } = product;

  const mrp = Math.round(price + (price * discount) / 100);
  const [selectedMedia, setSelectedMedia] = useState(images[0] || "");

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 flex flex-col md:flex-row gap-8 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition duration-300">
      {/* Left: Media Gallery */}
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
        <div className="flex md:flex-col gap-2 overflow-auto max-h-72 scrollbar-thin scrollbar-thumb-gray-300">
          {[...images, ...videos].map((media, index) =>
            media.includes(".mp4") ? (
              <video
                key={index}
                className={`w-16 h-16 rounded-lg object-cover border ${
                  selectedMedia === media ? "border-blue-500" : "border-gray-300"
                } cursor-pointer`}
                onClick={() => setSelectedMedia(media)}
              >
                <source src={media} type="video/mp4" />
              </video>
            ) : (
              <img
                key={index}
                src={media}
                alt={`media-${index}`}
                className={`w-16 h-16 rounded-lg object-cover border ${
                  selectedMedia === media ? "border-blue-500" : "border-gray-300"
                } cursor-pointer hover:opacity-80 transition`}
                onClick={() => setSelectedMedia(media)}
              />
            )
          )}
        </div>

        <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-xl shadow-inner">
          {selectedMedia?.includes(".mp4") ? (
            <video
              controls
              className="w-full max-h-96 object-contain rounded-xl border"
            >
              <source src={selectedMedia} type="video/mp4" />
            </video>
          ) : (
            <img
              src={selectedMedia}
              alt="selected"
              className="w-full max-h-96 object-contain rounded-xl border"
            />
          )}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="w-full md:w-1/2 space-y-5 relative">
        {/* Admin Actions */}
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            title="Edit"
            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition duration-200 shadow"
            onClick={handleEdit}
          >
            <FiEdit size={18} />
          </button>
          <button
            title="Delete"
            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition duration-200 shadow"
            onClick={()=>handleDelete(product)}
          >
            <FiTrash2 size={18} />
          </button>
        </div>

        <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
          {name}
        </h1>

        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold text-gray-900">₹{mrp}</span>
          <span className="line-through text-gray-400 text-sm">₹{price}</span>
          <span className="text-green-600 text-sm">({discount}% off)</span>
        </div>

        <p className="text-sm text-gray-700">
          Rating: <span className="font-medium">⭐ {rating}</span>
        </p>

        <p className="text-sm text-gray-700">Category: {category}</p>

        <p className="text-sm text-gray-700">
          Stock:{" "}
          <span
            className={`font-semibold ${
              stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stock > 0 ? `In Stock (${stock} available)` : "Out of Stock"}
          </span>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProductDisplay;
