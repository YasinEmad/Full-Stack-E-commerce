import React from 'react';

const products = [
  {
    id: 1,
    name: 'Vintage Leather Backpack',
    price: '$79.99',
    imageUrl: '/young-friends-having-fun-together.jpg',
    alt: 'Vintage Leather Backpack',
  },
  {
    id: 2,
    name: 'Wireless Bluetooth Headphones',
    price: '$49.99',
    imageUrl: '/young-male-model-reading-side-view.jpg',
    alt: 'Wireless Bluetooth Headphones',
  },
  {
    id: 3,
    name: 'Handcrafted Ceramic Mug',
    price: '$19.50',
    imageUrl: '/young-woman-wearing-trucker-hat.jpg',
    alt: 'Handcrafted Ceramic Mug',
  },
  {
    id: 4,
    name: 'Classic Aviator Sunglasses',
    price: '$89.00',
    imageUrl: 'young-friends-having-fun-together (1).jpg',
    alt: 'Classic Aviator Sunglasses',
  },
];

const App = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Best Sellers
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Discover our most popular products, loved by customers around the world.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col h-full overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            >
              <img
                src={product.imageUrl}
                alt={product.alt}
                className="w-full h-80 object-cover rounded-t-xl group-hover:opacity-80 transition-opacity duration-200"
              />

              <div className="flex flex-1 flex-col p-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-900">{product.price}</p>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
