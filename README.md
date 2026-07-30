# 🛡️ Innovexis Insurance Management System

A full-stack **Insurance Management System** built to manage customers, insurance policies, claims, payments, and documents efficiently.
The application provides a modern dashboard, secure authentication, CRUD operations, and a responsive user interface.

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* Secure Login
* JWT based authentication
* Role-based access control

### 👥 Customer Management

* Add new customers
* View customer details
* Update customer information
* Delete customers
* Search customers

### 📄 Policy Management

* Create insurance policies
* View policy details
* Update policies
* Delete policies
* Manage policy status

### 📋 Claims Management

* Submit insurance claims
* View claims
* Update claim status
* Delete claims
* Claim tracking

### 💳 Payment Management

* Add payments
* Update payment details
* Delete payments
* Track payment status
* Payment history

### 📁 Document Management

* Upload documents
* View uploaded documents
* Delete documents
* Manage customer policy documents

### 📊 Dashboard

* Total customers overview
* Active policies statistics
* Claims summary
* Revenue calculation
* Recent claims and payments

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* React Toastify
* SweetAlert2
* React Icons
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer File Upload
* bcrypt.js

### Tools

* Git & GitHub
* MongoDB Atlas
* Postman
* VS Code

---

## 📂 Project Structure

```
Innovexis-Insurance-Management-System/

│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/jigyasha30/Insurance-Management-System.git
```

---

# Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Modules

| Module         | Endpoint         |
| -------------- | ---------------- |
| Authentication | `/api/auth`      |
| Customers      | `/api/customers` |
| Policies       | `/api/policies`  |
| Claims         | `/api/claims`    |
| Payments       | `/api/payments`  |
| Documents      | `/api/documents` |
| Dashboard      | `/api/dashboard` |

---

## 📸 Screenshots

Add application screenshots here:

* Login Page
* Dashboard
* Customers
* Policies
* Claims
* Payments
* Documents

---

## 🔒 Security Features

* Password hashing using bcrypt
* JWT authentication
* Protected routes
* Role-based authorization
* Secure API access

---

## 🌟 Future Improvements

* Email notifications
* Payment gateway integration
* Advanced analytics
* Admin activity logs
* Cloud file storage

---

## 👩‍💻 Developer

**Jigyasha Yaduvanshi**

Full Stack Developer Intern Project

---

## 📄 License

This project is developed for educational and internship purposes.
