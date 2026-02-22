import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { ShoppingBag, Trash2, Check, Clock, Package } from 'lucide-react';

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    // Check authentication and fetch orders
    const checkAuthAndFetch = async () => {
      try {
        // Try to fetch orders - if 401, user is not authenticated
        const response = await fetch('/api/orders', { 
          credentials: 'include' 
        });
        
        if (response.status === 401) {
          // Not authenticated, redirect to login
          showNotification('Please login to access orders', 'error');
          setTimeout(() => navigate('/admin/login'), 1000);
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'Failed to load orders');
        showNotification('Error loading orders. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [navigate, showNotification]);

  const handleDelete = async (id) => {
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
      setError(err.message || 'Error deleting order');
      showNotification(err.message || 'Error deleting order', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleDelivered = async (order) => {
    const id = order._id;
    const newDelivered = !order.delivered;
    
    // Optimistic update
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
      // rollback on error
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, delivered: !newDelivered } : o)));
      setError(err.message || 'Error updating order');
      showNotification(err.message || 'Error updating order', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : filterStatus === 'delivered' 
      ? orders.filter(o => o.delivered)
      : orders.filter(o => !o.delivered);

  const deliveredCount = orders.filter(o => o.delivered).length;
  const pendingCount = orders.filter(o => !o.delivered).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-gray-600 mt-1">View and manage all customer orders</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
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
                <p className="text-3xl font-bold text-gray-900 mt-2">{deliveredCount}</p>
              </div>
              <Check className="w-12 h-12 text-green-100" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pendingCount}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-100" />
            </div>
          </div>
        </div>

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
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-8 flex items-start gap-3">
            <span className="text-red-600 font-bold text-xl flex-shrink-0">!</span>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm p-8 border-t-4 border-orange-500 overflow-hidden">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
            <Package className="w-6 h-6 text-orange-600" />
            {filterStatus === 'all' ? 'All Orders' : filterStatus === 'delivered' ? 'Delivered Orders' : 'Pending Orders'}
          </h2>

          {filteredOrders.length === 0 ? (
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
                          onClick={() => handleDelete(order._id)}
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
      </div>
    </div>
  );
}
