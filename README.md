# 🛒 Price Tracker API

A scalable RESTful backend API built with Node.js, Express.js, and MongoDB that **automatically scrapes product prices**, sends email alerts, and maintains price history — similar to how Buyhatke works.

## 🚀 Features

- **User Authentication** — Secure register/login with JWT tokens and bcrypt password hashing
- **Product Management** — Add, view, and delete products to track
- **Automated Price Scraping** — Auto-fetches prices from Amazon & Flipkart using Cheerio + Axios
- **Scheduled Cron Job** — Runs every hour to detect price changes automatically
- **Email Alerts** — Get notified via email when prices drop below your target using Nodemailer
- **Price History** — Track complete price history with pagination, drop percentage and statistics
- **Security** — Rate limiting (100 req/15min) and HTTP security headers via Helmet
- **Performance** — MongoDB compound indexes for fast price history queries

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcryptjs
- **Web Scraping:** Cheerio + Axios
- **Scheduled Jobs:** Node-cron
- **Email Service:** Nodemailer (Gmail)
- **Security:** Helmet + express-rate-limit
- **API Format:** REST + JSON

## 📁 Project Structure

price-tracker/
├── config/
│   ├── db.js
│   └── mailer.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── alertController.js
│   └── priceHistoryController.js
├── cron/
│   └── pricePoller.js
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
├── scraper/
│   └── scrapePrice.js
├── tests/
│   └── product.test.js
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
| GET | /api/history/:productId?page=1&limit=20&sort=desc | Get paginated history |

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
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

4. Run the server

```bash
npm run dev
```

## 🔄 How Automated Price Tracking Works

1. User adds a product with its Amazon/Flipkart URL
2. Cron job runs **every hour** automatically
3. Scraper fetches the current price from the product page
4. If price has changed, it is saved to Price History
5. If price drops below a user's target, an **email alert is sent instantly**

## 👩‍💻 Author

**Paridhi Sharma**
- LinkedIn: [linkedin.com/in/paridhi-sharma-26b735313](https://linkedin.com/in/paridhi-sharma-26b735313)
- GitHub: [github.com/Paridhiiiiiii](https://github.com/Paridhiiiiiii)
- GitHub: [github.com/Paridhiiiiiii](https://github.com/Paridhiiiiiii)
