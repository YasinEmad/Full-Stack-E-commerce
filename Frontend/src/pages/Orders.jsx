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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 border-b">Order ID</th>
                            <th className="py-3 px-4 border-b">Product Name</th>
                            <th className="py-3 px-4 border-b">Client Name</th>
                            <th className="py-3 px-4 border-b">Address</th>
                            <th className="py-3 px-4 border-b">Phone</th>
                            <th className="py-3 px-4 border-b">Delivered</th>
                            <th className="py-3 px-4 border-b">Actions</th>
                            <th className="py-3 px-4 border-b">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className={`hover:bg-gray-50 ${order.delivered ? 'bg-green-50' : ''}`}>
                                <td className="py-3 px-4 border-b">{order.orderId}</td>
                                <td className="py-3 px-4 border-b">{order.productName}</td>
                                <td className="py-3 px-4 border-b">{order.clientName}</td>
                                <td className="py-3 px-4 border-b">{order.address}</td>
                                <td className="py-3 px-4 border-b">{order.phone}</td>
                                <td className="py-3 px-4 border-b text-center">
                                    <input
                                        type="checkbox"
                                        checked={!!order.delivered}
                                        onChange={() => handleToggleDelivered(order)}
                                        aria-label={`Mark order ${order.orderId} delivered`}
                                        disabled={actionLoading}
                                    />
                                </td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete(order._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        disabled={actionLoading}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="py-3 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
