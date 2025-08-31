// src/App.js

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Userlayout from './componentes/Layout/Userlayout';

// Lazy load pages for better initial load performance
const HomePage = lazy(() => import('./pages/Home'));
const Categories = lazy(() => import('./pages/Categories'));
const MensProducts = lazy(() => import('./pages/MensProducts'));
const WomensProducts = lazy(() => import('./pages/WomensProducts'));
const About = lazy(() => import('./pages/About'));

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
            <Route path="/men" element={<Userlayout><MensProducts /></Userlayout>} />
            <Route path="/women" element={<Userlayout><WomensProducts /></Userlayout>} />
            <Route path="/about" element={<Userlayout><About /></Userlayout>} />
            {/* Catch all route for 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}


export default App;
