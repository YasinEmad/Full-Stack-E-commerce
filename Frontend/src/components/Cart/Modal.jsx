import { useState } from "react";

const Modal = ({ isOpen, onClose, cartItems, productName }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [size, setSize] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      user: {
        name,
        phone,
        address,
      },
      products: cartItems.map((item) => ({
        product: item.id,
        quantity: 1, // Assuming quantity is 1, you might need to adjust this
        size,
      })),
      totalAmount: cartItems.reduce((acc, item) => acc + item.price, 0), // Adjust as per your pricing logic
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        // Handle successful order submission
        console.log("Order submitted successfully");
        onClose(); // Close the modal
      } else {
        // Handle errors
        console.error("Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 lg:w-[500px] lg:h-[500px] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 text-2xl"
        >
          &times;
        </button>

        <div className="flex justify-center mb-4">
          {cartItems &&
            cartItems.map((item) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-md object-cover mr-2"
              />
            ))}
        </div>

        <div className="text-center mb-4">
          <p className="text-lg font-medium text-gray-800">{productName}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <textarea
              id="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="size"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Size
            </label>
            <select
              id="size"
              required
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="">Select a size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
              <option value="XXL">Double Extra Large</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!name || !phone || !address || !size}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
