// cartModal.jsx
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";

export default function CartModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const phoneInputRef = useRef(null);
  const [formData, setFormData] = useState({
    productName: "",
    clientName: "",
    phone: "",
    address: "",
  });

  // Auto-focus phone input when modal opens
  useEffect(() => {
    if (isOpen && phoneInputRef.current) {
      setTimeout(() => phoneInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Validate phone: allow +, digits, and dashes/spaces
  const validatePhone = (phone) => {
    if (!phone) return "Phone number is required";
    const cleanedPhone = phone.replace(/[\s\-]/g, "");
    const phoneRegex = /^\+?[0-9]{10,}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      return "Phone must be at least 10 digits (can start with +)";
    }
    return null;
  };

  const handlePhoneChange = (e) => {
    let { value } = e.target;
    // Only allow digits, +, spaces, and dashes
    value = value.replace(/[^0-9+\s\-]/g, "");
    setFormData((prev) => ({ ...prev, phone: value }));
    // Clear error if user is typing
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: null }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      handlePhoneChange(e);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear field-specific errors
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }
    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
      await axios.post(`${API_BASE}/api/orders`, formData);

      // Clear cart from Redux store
      dispatch(clearCart());

      // Show success message
      setSubmitted(true);

      // Reset form
      setFormData({ productName: "", clientName: "", phone: "", address: "" });
      setErrors({});

      // Auto-redirect to home after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      console.error("Error creating order:", err);
      setErrors({ submit: err.message || "Failed to submit order. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Show success screen
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl w-full max-w-md text-center shadow-lg border-2 border-orange-200">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full">
              <svg
                className="w-8 h-8 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-orange-700 mb-2">Order Confirmed!</h2>
          <p className="text-lg font-semibold text-orange-600 mb-4">
            Your order will be delivered in 1 day.
          </p>
          <p className="text-gray-600 text-sm">
            Redirecting you to home in a few seconds...
          </p>
        </div>
      </div>
    );
  }

  const fields = [
    { name: "productName", placeholder: "Product Name", type: "text" },
    { name: "clientName", placeholder: "Client Name", type: "text" },
    {
      name: "phone",
      placeholder: "01xxxxxxxxx",
      type: "tel",
      ref: phoneInputRef,
    },
    { name: "address", placeholder: "Address", type: "text" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md relative shadow-lg border-2 border-orange-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-orange-500 hover:text-orange-700 text-2xl bg-orange-100 rounded-full w-10 h-10 flex items-center justify-center shadow-sm transition"
          disabled={loading}
          aria-label="Close cart modal"
        >
          ✕
        </button>

        <h2 className="text-2xl font-extrabold mb-6 text-orange-700 text-center tracking-tight">Confirm Order</h2>

        {/* General error message */}
        {errors.submit && (
          <div className="mb-4 p-3 bg-orange-100 border border-orange-400 text-orange-700 rounded">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map(({ name, placeholder, type = "text", ref }) => (
            <div key={name}>
              <input
                ref={ref}
                name={name}
                type={type}
                placeholder={placeholder}
                className={`w-full border rounded-xl px-4 py-3 outline-none transition text-lg font-medium shadow-sm ${
                  errors[name]
                    ? "border-orange-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    : "border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                }`}
                value={formData[name]}
                onChange={handleChange}
                disabled={loading}
                autoComplete={name === "phone" ? "tel" : "off"}
              />
              {errors[name] && (
                <p className="text-orange-500 text-xs mt-1 font-medium">
                  {errors[name]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg shadow-md"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2">⏳</span>
                Submitting...
              </>
            ) : (
              "Submit Order"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
