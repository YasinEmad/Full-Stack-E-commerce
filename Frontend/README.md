# Frontend Documentation

React + Vite single-page application for the e-commerce platform with Redux state management, responsive design, and PWA support.

## 📋 Overview

Modern frontend built with:
- **React 19** - UI library
- **Vite 7** - Fast build tool
- **Redux Toolkit** - State management
- **Tailwind CSS 4** - Utility-first styling
- **React Router 7** - Client-side routing
- **PWA Plugin** - Progressive web app support

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables

Create `.env.local` (optional):
```env
VITE_API_BASE=http://localhost:5000
VITE_APP_NAME=E-commerce Store
```

### 3. Start Development Server
```bash
npm run dev
```

App runs on `http://localhost:5173` (Vite default)

### 4. Build for Production
```bash
npm run build
```

Generates optimized build in `dist/` folder.

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── App.jsx                    # Main app component with routes
│   ├── main.jsx                   # React entry point
│   ├── index.css                  # Global styles
│   ├── pages/                     # Page components
│   │   ├── Home.jsx               # Homepage with hero + products
│   │   ├── Categories.jsx         # Product categories view
│   │   ├── TechProducts.jsx       # Tech category page
│   │   ├── ArabProducts.jsx       # Arab category page
│   │   ├── ProductDetails.jsx     # Single product detail page
│   │   ├── Orders.jsx             # User orders listing page
│   │   ├── About.jsx              # About page
│   │   ├── AdminLogin.jsx         # Admin login form
│   │   └── AdminDashboard.jsx     # Admin management interface
│   ├── components/
│   │   ├── Layout/
│   │   │   └── Userlayout.jsx     # Page layout wrapper
│   │   ├── Common/
│   │   │   ├── Navbar.jsx         # Navigation header
│   │   │   ├── Footer.jsx         # Footer component
│   │   │   ├── Hero.jsx           # Hero banner section
│   │   │   └── Searchbar.jsx      # Product search bar
│   │   ├── Products/
│   │   │   ├── Slider.jsx         # Product carousel
│   │   │   └── Collection.jsx     # Product grid display
│   │   ├── Cart/
│   │   │   ├── CartDrawer.jsx     # Sliding cart panel
│   │   │   └── cartModal.jsx      # Checkout form with validation
│   │   ├── ErrorBoundary.jsx      # Error handling wrapper
│   │   └── LoadingSpinner.jsx     # Loading indicator
│   ├── hooks/                     # Custom React hooks
│   │   ├── useCache.js            # Caching utility
│   │   ├── useFilterProduct.js    # Product filtering logic
│   │   └── useAdminProducts.js    # Admin products operations
│   ├── redux/                     # Redux store & slices
│   │   ├── store.js               # Redux store configuration
│   │   ├── cartSlice.js           # Cart state & reducers
│   │   └── productSlice.js        # Product state & reducers
│   ├── assets/                    # Static images, icons, fonts
│   └── utils/                     # Helper functions
├── public/                        # Static files (favicon, manifest)
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── eslint.config.js               # ESLint configuration
├── package.json                   # Dependencies & scripts
└── README.md                      # This file
```

## 🎨 Components

### Layout Components

#### **Navbar.jsx**
Main navigation header with logo, menu links, and cart icon.

#### **Footer.jsx**
Page footer with links and company info.

#### **Userlayout.jsx**
Page wrapper providing Navbar + content + Footer.

### Product Components

#### **Collection.jsx**
Grid display of products with filters and sorting.

#### **Slider.jsx**
Carousel showing featured/trending products.

### Cart Components

#### **CartDrawer.jsx**
Sliding panel showing cart items and totals.

#### **cartModal.jsx** ⭐ (Enhanced with Advanced Checkout)
Checkout form with these features:
- **Phone Input**: Tel type with country code (+) support
- **Phone Validation**: Minimum 10 digits required
- **Error Messages**: Inline validation feedback
- **Auto-focus**: Focuses phone field on modal open
- **Loading State**: Spinner during submission
- **Double-submit Prevention**: Button disabled while sending
- **Success Message**: "Your order will be delivered in 1 day"
- **Cart Cleanup**: Clears Redux store and localStorage
- **Auto-redirect**: Redirects to home after 3 seconds

## 🔄 State Management (Redux)

### Cart State
```javascript
{
  items: [],        // Array of cart items
  isCartOpen: false // Cart drawer visibility
}
```

### Available Actions
- `addToCart(product)` - Add or increase quantity
- `removeFromCart(id)` - Remove item by ID
- `clearCart()` - Clear entire cart
- `openCart()` - Show cart drawer
- `closeCart()` - Hide cart drawer

### Using Redux
```jsx
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart } from '../redux/cartSlice';

function Component() {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  
  // Use dispatch to trigger actions
  dispatch(addToCart(product));
}
```

## 📄 Pages

- **Home.jsx** - Homepage with hero, featured products
- **Categories.jsx** - Product categories view
- **TechProducts.jsx** - Technology products page
- **ArabProducts.jsx** - Arabic/local products page
- **ProductDetails.jsx** - Single product detail view
- **Orders.jsx** - User orders management
- **About.jsx** - Company information
- **AdminLogin.jsx** - Admin authentication
- **AdminDashboard.jsx** - Admin management interface

## 🛒 Shopping Flow

1. Browse products on Home/Categories pages
2. Click product to view details
3. Add to cart from ProductDetails
4. Click cart icon to open drawer
5. Click "Buy Now" to checkout
6. Fill form with validation (phone required, 10+ digits)
7. Submit order
8. See success message
9. Auto-redirect to home after 3 seconds

## 🎨 Styling

Uses **Tailwind CSS 4** with utility-first approach:
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Flexbox & Grid layouts
- Animations and transitions
- Custom component styling

Mobile-first responsive design:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  // 1 column mobile, 2 tablet, 4 desktop
</div>
```

## 🌐 API Integration

### Base URL Configuration
```javascript
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
```

### Fetch Products
```javascript
const response = await fetch(`${API_BASE}/api/products`);
```

### Create Order
```javascript
await axios.post(`${API_BASE}/api/orders`, formData);
```

## 🧪 Development Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📦 Building & Deployment

### Production Build
```bash
npm run build
# Creates optimized dist/ folder
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 🐛 Troubleshooting

### Blank Screen on Load
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for errors
- Verify API_BASE URL
- Ensure backend is running

### Cart Not Persisting
- Check if localStorage is enabled
- Verify Redux store configuration
- Review cartSlice reducers

### API Errors
- Verify backend is running on correct port
- Check CORS settings
- Review network tab in DevTools
- Confirm VITE_API_BASE is set correctly

### Build Errors
- Delete `node_modules` and `dist`
- Run `npm install` again
- Ensure Node v20+

## 📚 Dependencies

**Core:**
- react, react-dom, vite

**State & Routing:**
- @reduxjs/toolkit, react-redux, react-router-dom

**Styling:**
- tailwindcss, @tailwindcss/vite

**UI & Icons:**
- react-icons, lucide-react

**Utilities:**
- axios, react-lazy-load-image-component

## 🚀 PWA Features

- Install as native app
- Offline support with caching
- App shell architecture
- Push notifications ready

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
