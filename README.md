**FarmTether**

**Prototype (Demo)**
FarmTether is a prototype linking smallholder farmers and buyers. This demo implements user registration/login, farmer product listings, seller browsing and ordering, simulated payment, and admin stats.

Overview
FarmTether is designed to empower farmers by providing a user-friendly platform that facilitates direct sales to buyers. It aims to enhance food security and improve the livelihoods of farmers in rural Africa.

**Table of Contents**
Features
Technologies Used
Requirements
Project Structure
Installation
Usage
Demo Accounts
How to Demo
API Endpoints
Next Steps
Contributions
License
Author

**Features**

- User Registration and Authentication: Farmers and buyers can quickly create accounts and log in securely.
- Product Listings: Farmers can list their products with descriptions, images, and prices.
- Price Dashboard: Users can view average pricing trends for various products to make informed purchasing decisions.
- Order Management: Buyers can place orders and track their statuses in real-time.
- Admin Dashboard: Admins can manage users, products, and view analytics on sales and user activity.
- Responsive Design: A seamless experience across devices, optimized for both desktop and mobile users.

**Technologies Used**
Backend:

Node.js
Express.js
Sequelize (ORM)
SQLite (Database)
JSON Web Tokens (JWT) for authentication
Frontend:
React.js
Bootstrap for responsive UI
Axios for making HTTP requests

**Requirements**

Node.js (v18+)
npm (Node Package Manager)

**Project Structure**

FarmTether/
├── backend/                # Contains the backend code
│   ├── config/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── server.js
└── frontend/               # Contains the frontend code
    ├── public/
    ├── src/
    ├── App.js
    └── index.js

**Installation**
Backend
Navigate to the backend directory:

bash
cd backend

Install dependencies:

bash
npm install

Copy .env.example to .env and set JWT_SECRET (or leave it as default).

Seed sample data:

bash
npm run seed  # Executing the seeding script

Start the backend:

bash
npm run dev  # API will run at http://localhost:5000/api

Frontend
Navigate to the frontend directory:

bash
cd ../frontend

Install dependencies:

bash
npm install

Start the frontend:

bash
npm start  # Open http://localhost:3000

**Demo Accounts (Seeded)**
Admin: Phone 000, Password adminpass
Farmer: Phone 250700000001, Password farmerpass
Seller: Phone 250700000002, Password sellerpass

**How to Demo**
Register or login as a farmer (or use the seeded farmer).
Add a new product.
Logout and login as a seller (or use the seeded seller).
Browse products, add to cart, and place an order (simulated payment).
Login as a farmer to show order notifications via the orders endpoint (or the admin can view orders).



**API Endpoints**

Authentication
POST /api/auth/register: Register a new user.
POST /api/auth/login: Log in a user.
Products
GET /api/products: Fetch all products.
POST /api/products: Add a new product (admin only).
Orders
GET /api/orders/my: View all orders for the logged-in user.
POST /api/orders: Place a new order.
Admin
GET /api/admin/price-dashboard: Fetch pricing data for the admin dashboard.


**Next Steps**
Replace mock payment with MTN/Airtel integration in production.
Add SMS notifications and offline-first sync for low-connectivity scenarios.
Harden authentication (rate limiting, stronger token handling).


**Contributions**
Contributions are welcome! If you'd like to contribute to the project, please create a pull request or submit an issue for any enhancements you think could improve the project.

**License**
This project is licensed under the MIT License. See the LICENSE file for details.

**Author**
Name: Joshua Mugisha
Degree: BSc in Software Engineering
Year: 2

