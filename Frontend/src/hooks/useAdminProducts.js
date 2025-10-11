import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'accessories',
    price: '',
    brand: '',
    image: '',
    image2: '',
    image3: '',
    description: '',
    colors: [],
    inStock: true,
    sale: false,
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch('/api/admin/verify', {
          credentials: 'include',
        });

        if (!response.ok) {
          localStorage.clear();
          sessionStorage.clear();
          navigate('/admin/login');
        } else {
          fetchProducts();
        }
      } catch {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/admin/login');
      }
    };

    verifyAuth();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: val });
    } else {
      setNewProduct({ ...newProduct, [name]: val });
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
        credentials: 'include',
      });
      if (response.ok) {
        await fetchProducts();
        setNewProduct({
          name: '',
          category: 'accessories',
          price: '',
          brand: '',
          image: '',
          image2: '',
          image3: '',
          description: '',
          colors: [],
          inStock: true,
          sale: false,
        });
      }
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const response = await fetch(`/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
        credentials: 'include',
      });
      if (response.ok) {
        await fetchProducts();
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (response.ok) {
          await fetchProducts();
        }
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  return {
    products,
    newProduct,
    editingProduct,
    setEditingProduct,
    handleInputChange,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
}
