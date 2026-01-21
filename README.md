# Full-Stack E-commerce Platform

A comprehensive full-stack e-commerce web application built with modern technologies (Node.js, Express, MongoDB, React, Redux, Tailwind CSS). This platform provides a complete shopping experience with product catalog, advanced cart system, order management, admin dashboard, and email integration.

**Live Demo:** Deployment guides available in [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)

## 📋 Project Overview

This repository contains a complete e-commerce solution with:

- **Backend** – Express.js REST API with MongoDB, user authentication, order management
- **Frontend** – React + Vite SPA with Redux state management, responsive design, PWA support
- **Admin Panel** – Manage products, orders, and users with secure authentication
- **Email Integration** – Automated email notifications via Brevo (SMTP/API)

### Key Features

✅ **Product Management**
- Browse products by category (Tech, Arab products, etc.)
- Product search and filtering
- Detailed product pages with specifications
- Product recommendations

✅ **Shopping Cart**
- Add/remove products
- Persistent cart (localStorage)
- Real-time cart updates
- Cart drawer with quick view

✅ **Advanced Checkout**
- Phone input with validation (tel type, +country code support)
- Minimum 10-digit phone validation
- Order form with inline error messages
- Auto-focus on phone input
- Loading state during submission
- Success message: "Your order will be delivered in 1 day"
- Automatic cart cleanup after order
- Auto-redirect to home after success

✅ **Order Management**
- Create and view orders
- Order tracking
- Delivery status updates
- Order history with authentication

✅ **Admin Dashboard**
- Secure admin login with JWT
- Product CRUD operations
- Order management and delivery tracking
- User management
- Dashboard analytics

✅ **User Authentication**
- User registration and login
- Password validation
- Session management with httpOnly cookies
- JWT-based admin authentication

✅ **Email Integration**
- Feedback form with email notifications
- Order confirmation emails
- Admin notifications via Brevo

✅ **Technology Stack**
- Frontend: React 19, Redux Toolkit, Tailwind CSS 4, Vite 7
- Backend: Express.js 4, MongoDB 8, JWT, Nodemailer
- State Management: Redux with persistence
- Styling: Tailwind CSS with custom components
- Icons: React Icons, Lucide React
- Build Tool: Vite with PWA support

## 📁 Repository Structure

```
Full-Stack-E-commerce/
├── Backend/                          # Express.js API Server
│   ├── server.js                     # Main server entry point
│   ├── package.json                  # Backend dependencies
│   ├── .env                          # Environment variables (create manually)
│   ├── config/
│   │   └── db.js                     # MongoDB connection configuration
│   ├── models/                       # Mongoose schemas
│   │   ├── User.js                   # User model with validation
│   │   ├── Product.js                # Product schema
│   │   ├── Order.js                  # Order schema
│   │   └── Category.js               # Product categories
│   ├── controllers/                  # Request handlers
│   │   ├── userController.js         # User login/registration
│   │   ├── productController.js      # Product CRUD operations
│   │   └── orderController.js        # Order creation and management
│   ├── routes/                       # API endpoints
│   │   ├── users.js                  # User authentication routes
│   │   ├── products.js               # Product endpoints
│   │   ├── orders.js                 # Order management
│   │   ├── orderAuth.js              # Order authentication
│   │   ├── admin.js                  # Admin dashboard routes
│   │   └── feedback.js               # Feedback/contact form
│   ├── middleware/
│   │   └── errorHandler.js           # Global error handling
│   ├── services/
│   │   ├── emailService.js           # Brevo email integration
│   │   └── userService.js            # User business logic
│   ├── seed*.js                      # Data seeding scripts
│   └── diagnostics.js                # Deployment diagnostics
│
├── Frontend/                         # React + Vite SPA
│   ├── src/
│   │   ├── App.jsx                   # Main application component
│   │   ├── main.jsx                  # React entry point
│   │   ├── index.css                 # Global styles
│   │   ├── pages/                    # Page components
│   │   │   ├── Home.jsx              # Homepage with hero
│   │   │   ├── Categories.jsx        # Product categories view
│   │   │   ├── TechProducts.jsx      # Tech products page
│   │   │   ├── ArabProducts.jsx      # Arab products page
│   │   │   ├── ProductDetails.jsx    # Single product details
│   │   │   ├── Orders.jsx            # User orders listing
│   │   │   ├── About.jsx             # About page
│   │   │   ├── AdminLogin.jsx        # Admin authentication
│   │   │   └── AdminDashboard.jsx    # Admin management panel
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   └── Userlayout.jsx    # Page layout wrapper
│   │   │   ├── Common/
│   │   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   │   ├── Footer.jsx        # Footer component
│   │   │   │   ├── Hero.jsx          # Hero banner section
│   │   │   │   └── Searchbar.jsx     # Product search
│   │   │   ├── Products/
│   │   │   │   ├── Slider.jsx        # Product carousel
│   │   │   │   └── Collection.jsx    # Product grid
│   │   │   ├── Cart/
│   │   │   │   ├── CartDrawer.jsx    # Sliding cart panel
│   │   │   │   └── cartModal.jsx     # Checkout form with validation
│   │   │   ├── ErrorBoundary.jsx     # Error handling wrapper
│   │   │   └── LoadingSpinner.jsx    # Loading indicator
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useCache.js           # Caching utility
│   │   │   ├── useFilterProduct.js   # Product filtering
│   │   │   └── useAdminProducts.js   # Admin products logic
│   │   └── redux/                    # State management
│   │       ├── store.js              # Redux store configuration
│   │       ├── cartSlice.js          # Cart state & actions
│   │       └── productSlice.js       # Product state & actions
│   ├── public/                       # Static assets
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration with PWA
│   ├── eslint.config.js              # ESLint rules
│   ├── index.html                    # HTML template
│   └── README.md                     # Frontend-specific docs
│
├── README.md                         # This file
├── package.json                      # Root package.json
├── QUICK_START_VERCEL.md            # Quick deployment guide
├── VERCEL_DEPLOYMENT_GUIDE.md       # Detailed deployment docs
├── README_DEPLOYMENT.md              # Additional deployment info
├── DEPLOYMENT_INDEX.md               # Deployment resources index
├── DEPLOYMENT_CHECKLIST.md           # Pre-deployment checklist
├── CHANGES_SUMMARY.md                # Recent changes log
└── vercel.json                       # Vercel deployment config
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v20+ ([Download](https://nodejs.org/))
- **npm** v9+ (comes with Node.js)
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud)

### Clone the Repository

```bash
git clone <repository-url>
cd Full-Stack-E-commerce
```

### Backend Setup

1. **Navigate to Backend folder:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** with the following variables:
   ```env
   # MongoDB
   MONGO_URI=mongodb://localhost:27017/ecommerce-db
   
   # Server
   PORT=5000
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key_change_this
   
   # Admin
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=securepassword123
   
   # Email Service (Brevo)
   BREVO_API_KEY=your_brevo_api_key_here
   BREVO_SENDER_EMAIL=noreply@yourdomain.com
   ```

4. **Start the server** (development mode with hot reload):
   ```bash
   npm run dev
   ```
   
   Or start with Node directly:
   ```bash
   npm start
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **In a new terminal, navigate to Frontend:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   App will open at `http://localhost:5173` (Vite default)

### Initial Data Setup

Seed the database with sample data from the `Backend/` directory:

```bash
cd Backend

# Seed products
node seedProducts.js

# Seed sample orders
node seedOrders.js

# Seed sample users
node seed.js
```

Or use npm scripts:
```bash
npm run seed:orders
```

## 🔧 Configuration

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/ecommerce-db` |
| `PORT` | Server port | `5000` |
| `JWT_SECRET` | JWT signing key (change in production!) | `your_secret_key` |
| `ADMIN_EMAIL` | Admin login email | `admin@example.com` |
| `ADMIN_PASSWORD` | Admin login password | `secure_password` |
| `BREVO_API_KEY` | Brevo email service API key | `your_api_key` |
| `BREVO_SENDER_EMAIL` | Email sender address | `noreply@domain.com` |
| `NODE_ENV` | Environment | `development` or `production` |

### Frontend Environment Variables

Create `Frontend/.env.local` (optional):
```env
VITE_API_BASE=http://localhost:5000
```

## 📡 API Endpoints

### Public Routes

**Products**
```
GET    /api/products              # List all products
GET    /api/products/:id          # Get product details
POST   /api/products/search       # Search products
```

**Orders**
```
POST   /api/orders                # Create new order
GET    /api/orders/auth/verify    # Verify order auth session
```

**Feedback**
```
POST   /api/feedback              # Submit feedback/contact form
```

**Users**
```
POST   /api/users/register        # Register new user
POST   /api/users/login           # User login
POST   /api/users/logout          # User logout
```

### Protected Routes (Admin)

**Authentication**
```
POST   /api/admin/login           # Admin login (JWT)
GET    /api/admin/verify          # Verify admin token
```

**Admin Operations**
```
GET    /api/admin/products        # List all products
POST   /api/admin/products        # Create product
PUT    /api/admin/products/:id    # Update product
DELETE /api/admin/products/:id    # Delete product

GET    /api/admin/orders          # List orders
PUT    /api/admin/orders/:id      # Update order status

GET    /api/admin/users           # List users
DELETE /api/admin/users/:id       # Delete user
```

### Order Management

```
GET    /api/orders                # Get user orders (with auth)
GET    /api/orders/:id            # Get order details
PUT    /api/orders/:id            # Update order (delivery status)
DELETE /api/orders/:id            # Delete order
```

## 🛒 Cart Checkout Flow Features

### Phone Input Validation
- Input type: `tel` (supports country codes with `+`)
- Allows leading zeros (e.g., `01xxxxxxxxx`)
- Blocks non-numeric except `+`, spaces, dashes
- Minimum 10 digits required
- Real-time validation feedback

### Checkout UX
- Auto-focus on phone field
- Inline error messages for each field
- Loading spinner during submission
- Prevents double-submit (button disabled)
- Success message: "Your order will be delivered in 1 day"
- Auto-redirect to home after 3 seconds

### Post-Submit Actions
- Clear cart from Redux store
- Remove items from localStorage
- Reset form data
- Display success screen
- Automatic redirect to homepage

## 📊 State Management (Redux)

### Cart Slice
```javascript
// Actions available
dispatch(addToCart(product))      // Add product to cart
dispatch(removeFromCart(id))      // Remove product by ID
dispatch(clearCart())             // Clear entire cart
dispatch(openCart())              // Show cart drawer
dispatch(closeCart())             // Hide cart drawer

// State structure
{
  items: [],           // Array of cart items
  isCartOpen: false    // Cart drawer visibility
}
```

### Product Slice
```javascript
// State for products
{
  items: [],           // All products
  filteredItems: [],   // Filtered products
  selectedProduct: null // Currently viewed product
}
```

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  rating: Number,
  reviews: [String]
}
```

### Order Model
```javascript
{
  productName: String,
  clientName: String,
  phone: String,
  address: String,
  delivered: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  name: String,
  description: String,
  products: [ObjectId]
}
```

## 🎨 UI Components

### Layout
- `Navbar.jsx` – Navigation with cart icon
- `Footer.jsx` – Footer section
- `Hero.jsx` – Banner section
- `Userlayout.jsx` – Page wrapper with header/footer

### Shopping
- `CartDrawer.jsx` – Sliding cart panel
- `cartModal.jsx` – Checkout form with validation
- `Collection.jsx` – Product grid
- `Slider.jsx` – Product carousel

### Admin
- `AdminLogin.jsx` – Admin authentication
- `AdminDashboard.jsx` – Management interface

### Utilities
- `ErrorBoundary.jsx` – Error handling wrapper
- `Searchbar.jsx` – Product search

## 🔐 Authentication

### User Authentication
- Email/password registration
- Session-based login
- Password validation (minimum requirements)
- Logout functionality

### Admin Authentication
- Admin email/password login
- JWT token generation
- httpOnly cookie storage
- Token expiration (configurable)

## 📧 Email Integration

Powered by [Brevo](https://www.brevo.com/) (formerly Sendinblue):

- Feedback form submissions
- Order confirmations
- Admin notifications
- Email templates support

**Setup:**
1. Create Brevo account
2. Get API key from dashboard
3. Add to `.env` as `BREVO_API_KEY`

## 🧪 Testing & Debugging

### Seed Database
```bash
cd Backend
node seedProducts.js    # Add sample products
node seedOrders.js      # Add sample orders
node seed.js            # Add sample users
```

### Clear Database (Development)
```bash
node migrateUsers.js    # Helper script for user management
```

### Verify Deployment
```bash
node validate-deployment.js
node diagnostics.js
```

## 📱 Frontend Features

- **Responsive Design** – Mobile, tablet, desktop
- **PWA Support** – Install as app, offline support
- **Lazy Loading** – Code splitting with Suspense
- **Image Optimization** – Lazy load images
- **Dark Mode Ready** – Tailwind CSS utility classes
- **Accessibility** – ARIA labels, semantic HTML
- **Performance** – Vite fast HMR, optimized builds

## 🚢 Deployment

### Vercel Deployment
See [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md) for step-by-step instructions.

Quick deploy:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Setup for Production
1. Set all environment variables in Vercel dashboard
2. Update API base URL for frontend
3. Enable MongoDB Atlas connection
4. Configure Brevo credentials
5. Set strong JWT secret

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify `MONGO_URI` is correct
- Check network access (firewall rules)
- Confirm MongoDB service is running
- Try with connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

### Email Not Sending
- Verify Brevo account is active
- Check API key validity
- Confirm sender email is verified in Brevo
- Check spam folder for test emails

### JWT/Auth Errors
- Ensure `JWT_SECRET` is set in `.env`
- Clear browser cookies and retry
- Check token expiration
- Verify admin credentials

### Port Already in Use
```bash
# Kill process on port 5000
kill -9 $(lsof -t -i:5000)

# Or change PORT in .env
PORT=5001
```

### Frontend Not Loading
- Clear browser cache: Ctrl+Shift+Delete
- Check Vite dev server is running
- Verify API base URL configuration
- Check console for CORS errors

## Table of contents

 - [Prerequisites](#prerequisites)
 - [Quick start](#quick-start)
	 - [Backend](#backend-setup)
	 - [Frontend](#frontend-setup)
 - [Configuration](#-configuration)
 - [API Endpoints](#-api-endpoints)
 - [Database Models](#-database-models)
 - [State Management](#-state-management-redux)
 - [Deployment](#-deployment)
 - [Troubleshooting](#-troubleshooting)

## Prerequisites

 - Node.js (project expects Node v20 — see `.nvmrc` in both `Backend/` and `Frontend/`).
 - npm or yarn
 - MongoDB (local or a connection string for a hosted DB)




