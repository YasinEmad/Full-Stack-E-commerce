// cartModal.jsx
import { useState } from "react";
import axios from "axios";

export default function CartModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    clientName: "",
    phone: "",
    address: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     await axios.post("http://localhost:5000/api/orders", formData);

      setFormData({ productName: "", clientName: "", phone: "", address: "" });
      onClose();
    } catch (err) {
      console.error("Error creating order:", err);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "productName", placeholder: "Product Name" },
    { name: "clientName", placeholder: "Client Name" },
    { name: "phone", placeholder: "Phone", type: "number" },
    { name: "address", placeholder: "Address" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">

        <button onClick={onClose} className="absolute top-3 right-3">
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Confirm Order</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ name, placeholder, type = "text" }) => (
            <input
              key={name}
              name={name}
              type={type}
              placeholder={placeholder}
              className="w-full border rounded px-3 py-2"
              value={formData[name]}
              onChange={handleChange}
              required
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
