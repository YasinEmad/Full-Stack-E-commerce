
const Footer = () => {
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
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4">Stay updated with our latest collections and offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow p-2 rounded-l-md bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700 transition duration-300"
              >
                Subscribe
              </button>
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