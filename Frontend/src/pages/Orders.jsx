import React, { useState, useEffect } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;
        setActionLoading(true);
        try {
            const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Failed to delete order');
            }
            setOrders((prev) => prev.filter((o) => o._id !== id));
        } catch (err) {
            setError(err.message || 'Error deleting order');
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
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Failed to update order');
            }
            const updated = await res.json();
            setOrders((prev) => prev.map((o) => (o._id === updated._id ? updated : o)));
        } catch (err) {
            // rollback on error
            setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, delivered: !newDelivered } : o)));
            setError(err.message || 'Error updating order');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    }


    return (
        <div className="container mx-auto px-2 py-8">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center tracking-tight">Orders</h1>
                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0 z-10">
                                <th className="py-4 px-4 border-b font-semibold text-gray-700">Order ID</th>
                                <th className="py-4 px-4 border-b font-semibold text-gray-700">Product Name</th>
                                <th className="py-4 px-4 border-b font-semibold text-gray-700">Client Name</th>
                                <th className="py-4 px-4 border-b font-semibold text-gray-700">Address</th>
                                <th className="py-4 px-4 border-b font-semibold text-gray-700">Phone</th>
                                <th className="py-4 px-4 border-b font-semibold text-gray-700">Delivered</th>
                                <th className="py-4 px-4 border-b font-semibold text-gray-700">Actions</th>
                                <th className="py-4 px-4 border-b font-semibold text-gray-700">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className={`transition-colors duration-200 ${order.delivered ? 'bg-green-50' : 'bg-white'} hover:bg-blue-50`}
                                >
                                    <td className="py-3 px-4 border-b text-sm font-mono">{order.orderId}</td>
                                    <td className="py-3 px-4 border-b text-sm">{order.productName}</td>
                                    <td className="py-3 px-4 border-b text-sm">{order.clientName}</td>
                                    <td className="py-3 px-4 border-b text-sm">{order.address}</td>
                                    <td className="py-3 px-4 border-b text-sm">{order.phone}</td>
                                    <td className="py-3 px-4 border-b text-center">
                                        <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold ${order.delivered ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            <input
                                                type="checkbox"
                                                checked={!!order.delivered}
                                                onChange={() => handleToggleDelivered(order)}
                                                aria-label={`Mark order ${order.orderId} delivered`}
                                                disabled={actionLoading}
                                                className="accent-green-600 w-4 h-4 mr-1"
                                            />
                                            {order.delivered ? 'Delivered' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 border-b text-center">
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm transition flex items-center gap-2 mx-auto"
                                            disabled={actionLoading}
                                            title="Delete order"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                            <span className="hidden sm:inline">Delete</span>
                                        </button>
                                    </td>
                                    <td className="py-3 px-4 border-b text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
