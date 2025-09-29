import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
    // Optionally, verify token with backend here
  }, [navigate]);

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, admin! You can manage products here.</p>
      {/* Add product management UI here */}
    </div>
  );
}
