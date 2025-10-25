import React, { useState, useEffect } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    // auth for orders management
    const [authenticated, setAuthenticated] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
        (async () => {
            // Verify if already logged in for orders
            try {
                const verifyRes = await fetch('/api/orders/auth/verify', { credentials: 'include' });
                if (verifyRes.ok) {
                    setAuthenticated(true);
                    await fetchOrders();
                    return;
                }
            } catch {
                // ignore
            }

            setLoading(false);
        })();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/orders', { credentials: 'include' });
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

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;
        setActionLoading(true);
        try {
            const res = await fetch(`/api/orders/${id}`, { method: 'DELETE', credentials: 'include' });
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
                credentials: 'include'
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

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginLoading(true);
        try {
            const res = await fetch('/api/orders/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginEmail, password: loginPassword }),
                credentials: 'include'
            });
            const data = await res.json();
            if (res.ok) {
                setAuthenticated(true);
                setLoginEmail('');
                setLoginPassword('');
                // fetch orders after login
                await fetchOrders();
            } else {
                setLoginError(data.error || 'Login failed');
            }
        } catch {
            setLoginError('Server error');
        } finally {
            setLoginLoading(false);
        }
    };


        // If still loading while verifying/authenticated fetch
        if (loading) {
                return <div className="text-center py-10">Loading...</div>;
        }

        // If not authenticated show login form similar to AdminLogin
        if (!authenticated) {
                return (
                        <div 
                            className="flex items-center justify-center min-h-screen bg-cover bg-center" 
                            style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?q=80&w=923&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
                        >
                            <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
                                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Orders Login</h2>
                                <form onSubmit={handleLoginSubmit} className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />

                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />

                                    <button
                                        type="submit"
                                        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                                        disabled={loginLoading}
                                    >
                                        {loginLoading ? 'Logging in...' : 'Login'}
                                    </button>

                                    {loginError && (
                                        <div className="text-red-600 text-center mt-2 text-sm">{loginError}</div>
                                    )}
                                </form>
                            </div>
                        </div>
                );
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
