# 🛒 Price Tracker API

A scalable RESTful backend API built with Node.js, Express.js, and MongoDB that tracks product prices, manages price alerts, and maintains price history — similar to how Buyhatke works.

## 🚀 Features

- **User Authentication** — Secure register/login with JWT tokens and bcrypt password hashing
- **Product Management** — Add, view, and delete products to track
- **Price Updates** — Update product prices with automatic change detection
- **Price Alerts** — Set target prices and get notified when prices drop below target
- **Price History** — Track complete price history with drop percentage and statistics

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcryptjs
- **API Format:** REST + JSON
- **Protocol:** HTTP

## 📁 Project Structure

price-tracker/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── alertController.js
│   └── priceHistoryController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Alert.js
│   └── PriceHistory.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── alertRoutes.js
│   └── priceHistoryRoutes.js
├── .env
├── package.json
└── server.js

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| POST | /api/products/add | Add new product |
| GET | /api/products/:id | Get single product |
| DELETE | /api/products/:id | Delete product |
| PATCH | /api/products/:id/price | Update product price |

### Alerts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/alerts/set | Set price alert |
| GET | /api/alerts | Get all alerts |
| GET | /api/alerts/check | Check & trigger alerts |
| DELETE | /api/alerts/:id | Delete alert |

### Price History
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/history | Get all price history |
| GET | /api/history/:productId | Get history for product |

## ⚙️ Setup & Installation

1. Clone the repository
```bash
git clone https://github.com/Paridhiiiiiii/price-tracker-api.git
cd price-tracker-api
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/pricetracker
JWT_SECRET=your_secret_key
```

4. Run the server
```bash
npm run dev
```

## 👩‍💻 Author

**Paridhi Sharma**
- LinkedIn: [linkedin.com/in/paridhi-sharma-26b735313](https://linkedin.com/in/paridhi-sharma-26b735313)
- GitHub: [github.com/Paridhiiiiiii](https://github.com/Paridhiiiiiii)