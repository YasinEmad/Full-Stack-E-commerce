# Backend API Documentation

Express.js REST API server for the e-commerce platform with MongoDB integration, user authentication, product management, and order processing.

## 📋 Overview

The backend provides:
- User authentication & authorization
- Product CRUD operations
- Order management with tracking
- Admin dashboard API
- Email notifications via Brevo
- Feedback/contact form handling
- Data validation and error handling

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables

Create `.env` file in `Backend/` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/ecommerce-db

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT & Authentication
JWT_SECRET=your_super_secret_key_change_this_in_production

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecurePassword123

# Email Service (Brevo)
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=noreply@yourdomain.com
ADMIN_NOTIFICATION_EMAIL=admin@yourdomain.com
```

### 3. Start Server

**Development (with hot reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:5000` by default.

## 📁 Project Structure

```
Backend/
├── server.js                 # Main server entry point
├── config/
│   └── db.js               # MongoDB connection setup
├── models/                 # Mongoose schemas
│   ├── User.js             # User authentication model
│   ├── Product.js          # Product catalog model
│   ├── Order.js            # Order management model
│   └── Category.js         # Product categories
├── controllers/            # Request handlers
│   ├── userController.js   # User auth logic
│   ├── productController.js # Product operations
│   └── orderController.js  # Order handling
├── routes/                 # API endpoints
│   ├── users.js            # /api/users routes
│   ├── products.js         # /api/products routes
│   ├── orders.js           # /api/orders routes
│   ├── orderAuth.js        # Order authentication
│   ├── admin.js            # /api/admin routes
│   └── feedback.js         # /api/feedback routes
├── middleware/
│   └── errorHandler.js     # Global error handling
├── services/
│   ├── emailService.js     # Brevo email integration
│   └── userService.js      # User business logic
├── seeds/                  # Data population scripts
│   ├── seedProducts.js
│   ├── seedOrders.js
│   ├── seed.js
│   └── migrateUsers.js
├── package.json            # Dependencies and scripts
└── .env                    # Environment variables (create manually)
```

## 🔌 API Endpoints

### Authentication Routes (`/api/users`)

#### Register User
```
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: { success: true, message: "User registered", user: {...} }
```

#### User Login
```
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: { success: true, message: "Login successful", user: {...} }
```

#### Logout
```
POST /api/users/logout

Response: { success: true, message: "Logged out" }
```

---

### Product Routes (`/api/products`)

#### List All Products
```
GET /api/products

Response: [ { _id, name, price, image, category, stock, ... }, ... ]
```

#### Get Single Product
```
GET /api/products/:id

Response: { _id, name, description, price, image, ... }
```

#### Search Products
```
POST /api/products/search
Content-Type: application/json

{
  "query": "laptop",
  "category": "tech",
  "minPrice": 100,
  "maxPrice": 2000
}

Response: [ { matching products }, ... ]
```

#### Filter by Category
```
GET /api/products?category=tech
GET /api/products?category=arab

Response: [ { filtered products }, ... ]
```

---

### Order Routes (`/api/orders`)

#### Create Order
```
POST /api/orders
Content-Type: application/json

{
  "productName": "Laptop Pro",
  "clientName": "John Doe",
  "phone": "+201000000000",
  "address": "123 Main St, Cairo, Egypt",
  "items": [ { productId, quantity }, ... ]  // optional
}

Response: { success: true, orderId: "...", message: "Order created" }
```

#### Get User Orders (Authenticated)
```
GET /api/orders
Credentials: include

Response: [
  {
    _id: "...",
    productName: "...",
    clientName: "...",
    phone: "...",
    address: "...",
    delivered: false,
    createdAt: "...",
    updatedAt: "..."
  },
  ...
]
```

#### Get Order Details
```
GET /api/orders/:id

Response: { _id, productName, clientName, phone, address, delivered, ... }
```

#### Update Order (Delivery Status)
```
PUT /api/orders/:id
Content-Type: application/json

{
  "delivered": true
}

Response: { success: true, order: {...}, message: "Order updated" }
```

#### Delete Order
```
DELETE /api/orders/:id

Response: { success: true, message: "Order deleted" }
```

#### Verify Order Session
```
GET /api/orders/auth/verify

Response: { authenticated: true } or { authenticated: false }
```

---

### Admin Routes (`/api/admin`)

#### Admin Login
```
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "AdminPassword123"
}

Response: { 
  success: true, 
  message: "Login successful",
  token: "jwt_token...",
  admin: { email, role: "admin" }
}
```

#### Get All Products (Admin)
```
GET /api/admin/products
Authorization: Bearer <jwt_token>

Response: [
  {
    _id: "...",
    name: "Product Name",
    price: 999,
    image: "url",
    category: "tech",
    stock: 50,
    rating: 4.5,
    ...
  },
  ...
]
```

#### Create Product (Admin)
```
POST /api/admin/products
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 299.99,
  "image": "image_url",
  "category": "tech",
  "stock": 100,
  "rating": 4.5
}

Response: { success: true, product: {...}, message: "Product created" }
```

#### Update Product (Admin)
```
PUT /api/admin/products/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 349.99,
  "stock": 75
}

Response: { success: true, product: {...} }
```

#### Delete Product (Admin)
```
DELETE /api/admin/products/:id
Authorization: Bearer <jwt_token>

Response: { success: true, message: "Product deleted" }
```

#### Get All Orders (Admin)
```
GET /api/admin/orders
Authorization: Bearer <jwt_token>

Response: [ { _id, productName, clientName, delivered, ... }, ... ]
```

#### Get All Users (Admin)
```
GET /api/admin/users
Authorization: Bearer <jwt_token>

Response: [ { _id, name, email, createdAt }, ... ]
```

#### Delete User (Admin)
```
DELETE /api/admin/users/:id
Authorization: Bearer <jwt_token>

Response: { success: true, message: "User deleted" }
```

---

### Feedback Routes (`/api/feedback`)

#### Submit Feedback/Contact Form
```
POST /api/feedback
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Product Inquiry",
  "message": "I have a question about your products..."
}

Response: { 
  success: true, 
  message: "Feedback sent successfully. We'll get back to you soon."
}
```

---

## 🗄️ Database Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  role: String (default: "user"),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  image: String (URL),
  category: String,
  stock: Number,
  rating: Number (0-5),
  reviews: [String],
  inStock: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  _id: ObjectId,
  productName: String,
  clientName: String,
  phone: String,
  address: String,
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  delivered: Boolean (default: false),
  paymentStatus: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  image: String,
  products: [ObjectId],
  createdAt: Date
}
```

## 🔐 Authentication & Security

### User Authentication
- Email/password based
- Passwords hashed with bcrypt
- Session management with cookies
- Login validation

### Admin Authentication
- JWT token-based
- Secure password hashing
- Token stored in httpOnly cookies
- Protected admin routes

### Security Features
- CORS enabled for frontend domain
- Cookie parser for secure cookies
- Environment variables for sensitive data
- Error messages don't expose internal details
- Input validation on all endpoints

## 📧 Email Integration

Uses **Brevo** (formerly Sendinblue) for sending emails:

### Setup Brevo
1. Create account at https://www.brevo.com/
2. Get API key from Settings → API
3. Verify sender email address
4. Add credentials to `.env`

### Email Events
- **New Order** → Send confirmation to customer
- **Feedback** → Send to admin email
- **Order Status** → Notify customer of delivery updates

## 🌱 Seeding Data

Populate database with sample data for development:

### Seed Products
```bash
node seedProducts.js
```
Creates sample tech and arab products.

### Seed Orders
```bash
node seedOrders.js
```
Creates sample orders with different statuses.

### Seed Users
```bash
node seed.js
```
Creates sample users for testing.

### Migrate Users (Utility)
```bash
node migrateUsers.js
```
Helper for user management and index creation.

## 🧪 Testing Endpoints

### Using cURL
```bash
# Get products
curl http://localhost:5000/api/products

# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"productName":"Laptop","clientName":"John","phone":"01000000000","address":"123 Main St"}'

# Admin login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"supersecret"}'
```

### Using Postman/Insomnia
1. Import API endpoints into Postman
2. Set base URL: `http://localhost:5000`
3. Test each endpoint with sample data
4. Check Authorization header for admin routes

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service or check `MONGO_URI`

### JWT Token Expired
**Solution:** Logout and login again to get new token

### Email Not Sending
**Solution:** 
- Verify Brevo API key
- Check sender email is verified
- Review Brevo logs

### Port Already in Use
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>

# Or change PORT in .env
PORT=5001
```

### CORS Errors
**Solution:** Update CORS origin in server.js to match frontend URL

## 📚 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **cookie-parser** - Parse cookies
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **nodemailer** - Email sending
- **shortid** - Generate unique IDs
- **axios** - HTTP requests (for Brevo API)
- **nodemon** - Dev auto-reload

## 🚀 Deployment

For production deployment to Vercel, Railway, or Heroku:

1. Set environment variables in platform dashboard
2. Ensure MongoDB is accessible (use Atlas cloud)
3. Configure CORS for production domain
4. Update JWT_SECRET to strong random value
5. Test all endpoints before deploying

See [VERCEL_DEPLOYMENT_GUIDE.md](../VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📖 Additional Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [Brevo API Docs](https://developers.brevo.com/)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
