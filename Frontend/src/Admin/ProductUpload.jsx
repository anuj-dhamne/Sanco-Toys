import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductUploadForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discount: "",
        stock: "",
        category: "manual",
        images: [],
        videos: [],
    });
    const { getToken } = useAuth();
    
    const [loading, setLoading] = useState(false);




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    };

    const handleVideoUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({ ...prev, videos: [...prev.videos, ...files] }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = await getToken();
        if (!token) {
            toast.error("No token found. Please log in.");
            setLoading(false);
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("discount", formData.discount);
        data.append("stock", formData.stock);
        data.append("category", formData.category);

        formData.images.forEach((img) => data.append("images", img));
        formData.videos.forEach((vid) => data.append("videos", vid));

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER}/product/create-product`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("🎉 Product uploaded successfully!");
            setFormData({
                name: "",
                description: "",
                price: "",
                discount: "",
                stock: "",
                category: "manual",
                images: [],
                videos: [],
            });
        } catch (err) {
            toast.error("❌ Upload failed. Try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-gradient-to-br from-gray-50 to-white shadow-2xl rounded-2xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📦 Upload New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="discount"
                        placeholder="Discount (%)"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.discount}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="category"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="manual">Manual</option>
                        <option value="remote">Remote</option>
                    </select>
                </div>

                {/* Description */}
                <textarea
                    name="description"
                    rows="4"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                {/* Images Upload */}
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">🖼️ Upload Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-3 mt-3 flex-wrap">
                        {formData.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={URL.createObjectURL(img)}
                                alt={`preview-${idx}`}
                                className="w-20 h-20 object-cover rounded-md shadow border"
                            />
                        ))}
                    </div>
                </div>

                {/* Videos Upload */}
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">🎥 Upload Videos (Optional)</label>
                    <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={handleVideoUpload}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-3 mt-3 flex-wrap">
                        {formData.videos.map((vid, idx) => (
                            <video
                                key={idx}
                                src={URL.createObjectURL(vid)}
                                controls
                                className="w-32 rounded shadow"
                            />
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full sm:w-auto ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-all"
                        } text-white px-8 py-3 rounded-xl font-semibold transition duration-200`}
                >
                    {loading ? "Uploading..." : "🚀 Upload Product"}
                </button>

            </form>
            <ToastContainer position="top-right" autoClose={3000} />

        </div>
    );
};

export default ProductUploadForm;
