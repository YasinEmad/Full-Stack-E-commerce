
import React, { useState } from 'react';

const Footer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ ok: false, text: 'Please fill all fields.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ ok: true, text: 'Feedback sent. Thank you!' });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus({ ok: false, text: data.message || 'Failed to send feedback.' });
      }
    } catch (err) {
      console.error('Feedback send error:', err);
      setStatus({ ok: false, text: 'Network error. Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white text-gray-700 py-10 mt-12 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="flex flex-col space-y-4">
      
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Call Us</h4>
       

            <p className="text-gray-700">+20 1017844312</p>
            <p className="text-gray-600">Sut - Fri: 24 hours</p>
          </div>
            </div>


          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-700 hover:text-gray-900 transition duration-300">Home</a></li>
              <li><a href="/tech" className="text-gray-700 hover:text-gray-900 transition duration-300">tech Collection</a></li>
              <li><a href="/women" className="text-gray-700 hover:text-gray-900 transition duration-300">Arab Collection</a></li>
              <li><a href="/categories" className="text-gray-700 hover:text-gray-900 transition duration-300">All categories</a></li>
            </ul>
          </div>



          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Send Feedback</h4>
            <p className="text-sm text-gray-600 mb-4">Have suggestions or issues? Send us a quick message.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Your name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Your email"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                rows={3}
                className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Your message"
              />
              <div className="flex items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
                {status && (
                  <p className={`ml-4 text-sm ${status.ok ? 'text-green-600' : 'text-red-600'}`}>{status.text}</p>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ArabTech. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;