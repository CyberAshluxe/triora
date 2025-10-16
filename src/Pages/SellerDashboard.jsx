import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "gaming",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if logged in as seller
    const sellerToken = localStorage.getItem("sellerToken");
    const sellerGoogleUser = localStorage.getItem("sellerGoogleUser");
    if (!sellerToken && !sellerGoogleUser) {
      navigate("/seller-signin");
      return;
    }

    // Load products from localStorage
    const savedProducts = localStorage.getItem("sellerProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, [navigate]);

  const saveProductsToStorage = (newProducts) => {
    localStorage.setItem("sellerProducts", JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.image
    ) {
      setError("All fields are required");
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid price");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: price,
      category: formData.category,
      description: formData.description,
      image: formData.image,
    };

    const newProducts = [...products, newProduct];
    saveProductsToStorage(newProducts);

    setFormData({
      name: "",
      price: "",
      category: "gaming",
      description: "",
      image: "",
    });
    setSuccess("Product added successfully!");
  };

  const handleDelete = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    saveProductsToStorage(newProducts);
    setSuccess("Product deleted successfully!");
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleSaveEdit = () => {
    const price = parseFloat(editForm.price);
    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid price");
      return;
    }

    const newProducts = products.map((product) =>
      product.id === editingId ? { ...editForm, price } : product
    );
    saveProductsToStorage(newProducts);
    setEditingId(null);
    setEditForm({});
    setSuccess("Product updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    localStorage.removeItem("sellerGoogleUser");
    localStorage.removeItem("sellerRememberMe");
    localStorage.removeItem("sellerEmail");
    navigate("/seller-signin");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Seller Dashboard
            </h1>
            <p className="text-gray-600">Add and manage your products</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FaSignOutAlt className="w-4 h-4" />
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add New Product
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="gaming">Gaming</option>
                  <option value="skincare">Skincare</option>
                  <option value="ebooks">E-books</option>
                  <option value="flash-sale">Flash Sale</option>
                  <option value="new-arrivals">New Arrivals</option>
                  <option value="best-sellers">Best Sellers</option>
                  <option value="deal-of-the-month">Deal of the Month</option>
                  <option value="up-to-80-off">Up to 80% Off</option>
                  <option value="buy-2-pay-for-1">Buy 2 Pay for 1</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter product description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                Add Product
              </button>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Products ({products.length})
            </h2>
            {products.length === 0 ? (
              <p className="text-gray-500">No products added yet.</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    {editingId === product.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          name="name"
                          value={editForm.name || ""}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="number"
                          name="price"
                          value={editForm.price || ""}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          step="0.01"
                          min="0"
                        />
                        <select
                          name="category"
                          value={editForm.category || ""}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="gaming">Gaming</option>
                          <option value="skincare">Skincare</option>
                          <option value="ebooks">E-books</option>
                          <option value="flash-sale">Flash Sale</option>
                          <option value="new-arrivals">New Arrivals</option>
                          <option value="best-sellers">Best Sellers</option>
                          <option value="deal-of-the-month">
                            Deal of the Month
                          </option>
                          <option value="up-to-80-off">Up to 80% Off</option>
                          <option value="buy-2-pay-for-1">
                            Buy 2 Pay for 1
                          </option>
                        </select>
                        <textarea
                          name="description"
                          value={editForm.description || ""}
                          onChange={handleEditChange}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="url"
                          name="image"
                          value={editForm.image || ""}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 flex items-center gap-1"
                          >
                            <FaSave className="w-3 h-3" />
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 flex items-center gap-1"
                          >
                            <FaTimes className="w-3 h-3" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg";
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">
                            {product.category}
                          </p>
                          <p className="text-sm text-gray-500 mb-2">
                            ₦{product.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
