import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { Lock, Mail, Shield } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        showNotification('Login successful! Redirecting...', 'success');
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      } else {
        const errorMsg = data.error || 'Login failed. Please try again.';
        setError(errorMsg);
        showNotification(errorMsg, 'error');
      }
    } catch (err) {
      const errorMsg = 'Server error. Please try again later.';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative overflow-hidden" 
      style={{ backgroundImage: "url('https://i.pinimg.com/736x/b3/15/52/b315527f272a1a00df44206a286308b7.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Login Container - Horizontal Layout */}
      <div className="relative z-10 w-full max-w-5xl mx-4 flex rounded-3xl shadow-2xl overflow-hidden bg-white">
        
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 p-12 flex-col justify-center text-white">
          <div className="mb-8">
            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Admin Portal</h1>
            <p className="text-orange-100 text-lg">Secure access to your dashboard</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure Authentication</h3>
                <p className="text-orange-100">Protected with industry-standard encryption</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Data Protection</h3>
                <p className="text-orange-100">Your credentials are always safe with us</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Session Management</h3>
                <p className="text-orange-100">Automatic session timeout for security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8">Sign in to access your admin dashboard</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <span className="text-red-600 font-bold text-xl flex-shrink-0">!</span>
                  <div>
                    <p className="text-red-800 font-semibold text-sm">Login Error</p>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all duration-300 transform ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:from-orange-600 hover:to-orange-700 active:scale-95'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
              {/* Return to Website Button */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full mt-4 py-3 px-4 rounded-lg font-bold text-orange-600 border-2 border-orange-500 bg-white hover:bg-orange-50 transition-all duration-300"
              >
                Return to Website
              </button>
            </form>

            {/* Footer Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600 text-xs">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
