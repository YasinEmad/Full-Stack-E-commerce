import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminProducts } from '../hooks/useAdminProducts';
import { useNotification } from '../context/NotificationContext';
import { Package, Plus, Trash2, Edit2, ShoppingCart, TrendingUp, ShoppingBag, LogOut, Check, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const { showNotification } = useNotification();

  const {
    products,
    newProduct,
    editingProduct,
    setEditingProduct,
    handleInputChange,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  } = useAdminProducts();

  const inStockProducts = products.filter(p => p.inStock).length;
  const saleProducts = products.filter(p => p.sale).length;
  const deliveredOrders = orders.filter(o => o.delivered).length;
  const pendingOrders = orders.filter(o => !o.delivered).length;

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const response = await fetch('/api/orders', { 
        credentials: 'include' 
      });
      
      if (response.status === 401) {
        navigate('/admin/login');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setOrdersError(error.message);
      showNotification('Error fetching orders', 'error');
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/orders/${id}`, { 
        method: 'DELETE', 
        credentials: 'include' 
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to delete order');
      }
      setOrders((prev) => prev.filter((o) => o._id !== id));
      showNotification('Order deleted successfully', 'success');
    } catch (err) {
      setOrdersError(err.message || 'Error deleting order');
      showNotification(err.message || 'Error deleting order', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleDelivered = async (order) => {
    const id = order._id;
    const newDelivered = !order.delivered;
    
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, delivered: newDelivered } : o)));
    setActionLoading(true);
    
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delivered: newDelivered }),
        credentials: 'include'
      });
      
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to update order');
      }
      
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o._id === updated._id ? updated : o)));
      showNotification(
        `Order marked as ${newDelivered ? 'delivered' : 'pending'}`,
        'success'
      );
    } catch (err) {
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, delivered: !newDelivered } : o)));
      setOrdersError(err.message || 'Error updating order');
      showNotification(err.message || 'Error updating order', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
      showNotification('Logged out successfully', 'success');
      setTimeout(() => navigate('/admin/login'), 500);
    } catch (error) {
      showNotification('Error logging out', 'error');
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : filterStatus === 'delivered' 
      ? orders.filter(o => o.delivered)
      : orders.filter(o => !o.delivered);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Tabs */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your business</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition active:scale-95"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 font-bold text-lg flex items-center gap-2 transition-all ${
                activeTab === 'products'
                  ? 'text-orange-600 border-b-4 border-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-5 h-5" />
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-bold text-lg flex items-center gap-2 transition-all ${
                activeTab === 'orders'
                  ? 'text-orange-600 border-b-4 border-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              Orders
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {activeTab === 'products' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
                </div>
                <Package className="w-12 h-12 text-orange-100" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">In Stock</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{inStockProducts}</p>
                </div>
                <ShoppingCart className="w-12 h-12 text-green-100" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">On Sale</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{saleProducts}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-100" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
                </div>
                <ShoppingBag className="w-12 h-12 text-orange-100" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Delivered</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{deliveredOrders}</p>
                </div>
                <Check className="w-12 h-12 text-green-100" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{pendingOrders}</p>
                </div>
                <Clock className="w-12 h-12 text-yellow-100" />
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <>
        {/* Create/Edit Form */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border-t-4 border-orange-500">
          <div className="flex items-center gap-2 mb-6">
            {editingProduct ? (
              <>
                <Edit2 className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
              </>
            ) : (
              <>
                <Plus className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
              </>
            )}
          </div>

          <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={editingProduct ? editingProduct.name : newProduct.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={editingProduct ? editingProduct.category : newProduct.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                >
                  <option value="accessories">Accessories</option>
                  <option value="arab">Arab</option>
                  <option value="tech">Tech</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (EGP) *
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={editingProduct ? editingProduct.price : newProduct.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Enter brand name"
                  value={editingProduct ? editingProduct.brand : newProduct.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="text"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={editingProduct ? editingProduct.image : newProduct.image}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Image2 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Second Image URL
                </label>
                <input
                  type="text"
                  name="image2"
                  placeholder="https://example.com/image2.jpg"
                  value={editingProduct ? editingProduct.image2 : newProduct.image2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Image3 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Third Image URL
                </label>
                <input
                  type="text"
                  name="image3"
                  placeholder="https://example.com/image3.jpg"
                  value={editingProduct ? editingProduct.image3 : newProduct.image3}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Colors
                </label>
                <input
                  type="text"
                  name="colors"
                  placeholder="e.g. red, blue, black"
                  value={editingProduct ? editingProduct.colors : newProduct.colors}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter product description"
                  value={editingProduct ? editingProduct.description : newProduct.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="md:col-span-2 flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={editingProduct ? editingProduct.inStock : newProduct.inStock}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">In Stock</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sale"
                    checked={editingProduct ? editingProduct.sale : newProduct.sale}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">On Sale</span>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition active:scale-95"
              >
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 border-t-4 border-orange-500">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
              Product List
            </h2>
            <p className="text-gray-600 mt-2">Total products: <span className="font-bold text-gray-900">{products.length}</span></p>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No products yet. Add your first product above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-orange-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{product.brand}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-orange-100 text-orange-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">EGP {product.price}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2 flex-col">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            product.inStock 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                          </span>
                          {product.sale && (
                            <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              🔥 On Sale
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-900 font-semibold transition p-2 rounded hover:bg-orange-100"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="inline-flex items-center gap-2 text-red-600 hover:text-red-900 font-semibold transition p-2 rounded hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
          </>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border-t-4 border-orange-500">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filter Orders</h2>
              <div className="flex gap-3 flex-wrap">
                {['all', 'delivered', 'pending'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      filterStatus === status
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'all' ? 'All Orders' : status === 'delivered' ? 'Delivered' : 'Pending'}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {ordersError && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-8 flex items-start gap-3">
                <span className="text-red-600 font-bold text-xl flex-shrink-0">!</span>
                <p className="text-red-700 text-sm">{ordersError}</p>
              </div>
            )}

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm p-8 border-t-4 border-orange-500 overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
                {filterStatus === 'all' ? 'All Orders' : filterStatus === 'delivered' ? 'Delivered Orders' : 'Pending Orders'}
              </h2>

              {ordersLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto"></div>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No orders found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Address
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredOrders.map((order) => (
                        <tr
                          key={order._id}
                          className={`transition-all ${
                            order.delivered ? 'bg-green-50 hover:bg-green-100' : 'bg-white hover:bg-orange-50'
                          }`}
                        >
                          <td className="px-6 py-4">
                            <span className="font-mono text-sm font-bold text-gray-900">#{order.orderId}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-gray-900">{order.productName}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <p className="font-semibold text-gray-900">{order.clientName}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">{order.address}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-gray-900">{order.phone}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!order.delivered}
                                onChange={() => handleToggleDelivered(order)}
                                disabled={actionLoading}
                                className="w-5 h-5 accent-green-600 rounded"
                              />
                              <span
                                className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                                  order.delivered
                                    ? 'bg-green-200 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {order.delivered ? '✓ Delivered' : '⏱ Pending'}
                              </span>
                            </label>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => handleDeleteOrder(order._id)}
                              disabled={actionLoading}
                              className="inline-flex items-center gap-2 text-red-600 hover:text-red-900 font-semibold transition p-2 rounded hover:bg-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
