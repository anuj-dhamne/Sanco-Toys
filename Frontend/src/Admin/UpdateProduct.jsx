import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProductForm = () => {
  const { state } = useLocation();
  console.log("State : ",state);
  const { id } = useParams();
  const { getToken } = useAuth();
    const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    category: "",
    images: [],
    videos: [],
  });

  useEffect(() => {
    if (state) {
      setFormData({
        name: state.name || "",
        description: state.description || "",
        price: state.price || "",
        discount: state.discount || "",
        stock: state.stock || "",
        category: state.category || "manual",
        images: [],
        videos: [],
      });
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Array.from(files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData: ",formData);
    const token = await getToken();

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("description", formData.description);
    updatedData.append("price", formData.price);
    updatedData.append("discount", formData.discount);
    updatedData.append("stock", formData.stock);
    updatedData.append("category", formData.category);

    formData.images.forEach((img) => updatedData.append("images", img));
    formData.videos.forEach((vid) => updatedData.append("videos", vid));

    console.log("data to update : ",updatedData);
    try {
      await axios.patch(
        `${import.meta.env.VITE_SERVER}/product/update-product/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("✅ Product updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update product.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Discount</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="manual">Manual</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Videos</label>
          <input
            type="file"
            name="videos"
            multiple
            accept="video/*"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
                    type="submit"
                    disabled={loading}
                    className={`w-full sm:w-auto ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-all"
                        } text-white px-8 py-3 rounded-xl font-semibold transition duration-200`}
                >
                    {loading ? "Updating..." : "🚀 Update Product"}
                </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
      
    </div>
  );
};

export default UpdateProductForm;
