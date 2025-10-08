// src/App.js

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Userlayout from './componentes/Layout/Userlayout';

// Lazy load pages for better initial load performance
const HomePage = lazy(() => import('./pages/Home'));
const Categories = lazy(() => import('./pages/Categories'));
const TechProducts = lazy(() => import('./pages/TechProducts'));
const ArabProducts = lazy(() => import('./pages/ArabProducts'));
const About = lazy(() => import('./pages/About'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));

// Admin pages (hidden)
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<Userlayout><Categories /></Userlayout>} />
            <Route path="/tech" element={<Userlayout><TechProducts /></Userlayout>} />
            <Route path="/arab" element={<Userlayout><ArabProducts /></Userlayout>} />
            <Route path="/about" element={<Userlayout><About /></Userlayout>} />
            <Route path="/product/:id" element={<Userlayout><ProductDetails /></Userlayout>} />
              {/* Hidden admin routes, not in navbar */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Catch all route for 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}



export default App;
