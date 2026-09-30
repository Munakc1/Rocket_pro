# 🚀 Rocket Pro — Backend

Backend API for **Rocket Pro**, a Nepal-focused stock market and NEPSE information platform.

Rocket Pro provides backend services for user authentication, market data, stock information, password recovery, and other services required by the Rocket Pro web application.

> **Status:** Beta / Development

---

## 📌 About Rocket Pro

Rocket Pro is a NEPSE-focused web platform designed to provide users with useful information about the Nepalese stock market.

The backend is responsible for:

* User registration and login
* JWT-based authentication
* Password reset and forgot-password functionality
* User account management
* NEPSE market data APIs
* Stock and company information
* Market movers
* Market breadth
* Sector indices
* News-related API services
* Secure communication between the frontend and backend

---

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **TypeScript**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT (JSON Web Token)**
* **Nodemailer**
* **bcrypt**
* **CORS**
* **dotenv**
* **tsx**

### Development Tools

* VS Code
* Git
* GitHub
* npm
* MongoDB Atlas

---

## 📁 Project Structure

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── config.ts
│   │   └── db.ts
│   │
│   ├── controllers/
│   │   └── auth.controller.ts
│   │
│   ├── models/
│   │   └── user.model.ts
│   │
│   ├── routes/
│   │   └── auth.routes.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── mailer.ts
│   │
│   └── index.ts
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Requirements

Before running the backend, make sure you have:

* Node.js installed
* npm installed
* MongoDB Atlas account or local MongoDB
* Git installed
* A Gmail account with an App Password if email functionality is enabled

Check Node.js:

```bash
node -v
```

Check npm:

```bash
npm -v
```

---

## 🚀 Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the backend directory:

```bash
cd Rocket_Pro/backend
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

FRONTEND_URL=http://localhost:3000

JWT_SECRET=your_new_jwt_secret
JWT_EXPIRES_IN=7d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
```

### Important

Never commit `.env` to GitHub.

Make sure `.gitignore` contains:

```gitignore
.env
.env.*
!.env.example
node_modules/
dist/
```

For security, use a **MongoDB Atlas connection string without a port** when using `mongodb+srv://`.

Example format:

```text
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/rocketpro
```

Do not add `:27017` to an `mongodb+srv://` connection string.

---

## ▶️ Running the Backend

Start the development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## ❤️ Health Check

You can check whether the backend is running using:

```text
GET /api/health
```

Example:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "Rocket Pro backend is running."
}
```

---

# 🔑 Authentication API

Authentication routes are available under:

```text
/api/auth
```

## Register

```http
POST /api/auth/register
```

Example request:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9800000000",
  "password": "your-password"
}
```

---

## Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "john@example.com",
  "password": "your-password"
}
```

---

## Forgot Password

```http
POST /api/auth/forgot-password
```

Example request:

```json
{
  "email": "john@example.com"
}
```

This endpoint can generate a password-reset token and send a reset email to the user's registered email address.

---

## Reset Password

```http
POST /api/auth/reset-password/:token
```

Example request:

```json
{
  "password": "new-password"
}
```

The reset token should be validated before allowing the password to be changed.

---

# 📊 Market Data API

Rocket Pro will provide APIs for NEPSE market information.

Planned services include:

```text
GET /api/market/index
GET /api/market/ticker
GET /api/market/movers
GET /api/market/breadth
GET /api/market/sectors
```

These APIs can provide information such as:

* NEPSE Index
* Previous close
* Change
* Percentage change
* Turnover
* Traded stocks
* Top gainers
* Top losers
* Market breadth
* Sector indices
* Stock prices

---

# 🗄️ Database

Rocket Pro uses **MongoDB** with **Mongoose**.

The main user collection contains information such as:

```text
User
├── fullName
├── email
├── phone
├── password
├── resetPasswordToken
├── resetPasswordExpires
├── createdAt
└── updatedAt
```

Passwords should never be stored as plain text.

Passwords should be hashed before being stored in MongoDB.

---

# 🔒 Security

Rocket Pro backend follows basic security practices including:

* Password hashing
* JWT authentication
* Environment variables for secrets
* CORS configuration
* Password reset token expiration
* Input validation
* Protected API routes
* No sensitive credentials committed to Git

### Never commit:

```text
.env
MongoDB passwords
JWT secrets
Gmail App Passwords
API keys
Private credentials
```

---

# 📧 Email Service

Nodemailer is used for email-related functionality.

The email service can be used for:

* Forgot-password emails
* Password reset links
* Account-related notifications
* Future Rocket Pro notifications

For Gmail SMTP, an **App Password** should be used instead of the normal Gmail account password.

---

# 🔄 Backend Request Flow

The general request flow is:

```text
Frontend
   │
   ▼
Express API
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ├── Authentication
   ├── Market Data
   └── Other Services
   │
   ▼
Models / Services
   │
   ▼
MongoDB
```

For authentication:

```text
User
 │
 ▼
Frontend Login/Register Form
 │
 ▼
POST /api/auth/...
 │
 ▼
Auth Route
 │
 ▼
Auth Controller
 │
 ▼
User Model
 │
 ▼
MongoDB
 │
 ▼
JWT Response
 │
 ▼
Frontend
```

---

# 🧪 Development

Run the backend in development mode:

```bash
npm run dev
```

After making changes to the TypeScript files, `tsx watch` automatically restarts the development server.

---

# 🏗️ Production Build

Build the TypeScript project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

> Make sure the `build` and `start` scripts in `package.json` match your project's actual configuration.

---

# 🧪 API Testing

You can test the APIs using tools such as:

* Postman
* Insomnia
* Thunder Client
* Frontend application
* REST Client extensions

Example health-check request:

```http
GET http://localhost:5000/api/health
```

Example registration request:

```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json
```

---

# 🌐 Frontend

The Rocket Pro frontend communicates with this backend through REST APIs.

Development frontend:

```text
http://localhost:3000
```

Development backend:

```text
http://localhost:5000
```

---

# 🚧 Current Development Status

### Completed / In Progress

* [x] Express server setup
* [x] TypeScript configuration
* [x] MongoDB/Mongoose configuration
* [x] CORS configuration
* [x] Health check endpoint
* [x] Authentication route structure
* [x] User model
* [ ] Complete registration implementation
* [ ] Complete login implementation
* [ ] JWT authentication middleware
* [ ] Forgot-password email flow
* [ ] Reset-password flow
* [ ] Market data API
* [ ] Stock API
* [ ] News API
* [ ] Production deployment

---

# 🎯 Future Improvements

Planned backend improvements include:

* Real-time NEPSE market data integration
* Stock search API
* Company details API
* Historical price API
* Technical indicator API
* Portfolio API
* Watchlist API
* User notifications
* Market alerts
* News aggregation
* API rate limiting
* Request validation
* Logging and monitoring
* Production deployment
* API documentation with Swagger/OpenAPI

---

# 📜 License

This project is currently developed as a portfolio and educational project.

Copyright © 2026 Rocket Pro.

---

## 👩‍💻 Author

**Muna K.C.**

Rocket Pro — NEPSE Market Intelligence Platform
