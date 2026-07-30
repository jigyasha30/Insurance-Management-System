const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const policyRoutes = require("./routes/policyRoutes");
const claimRoutes = require("./routes/claimRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const documentRoutes = require("./routes/documentRoutes");


// Load Environment Variables
dotenv.config();


// Connect Database
connectDB();


const app = express();


// ==========================
// CORS Configuration
// ==========================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5175",
      "https://insurance-management-system-9aj5641l6-jigyasha30.vercel.app"
    ],
    credentials: true,
  })
);


// ==========================
// Middleware
// ==========================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ==========================
// Static Upload Folder
// ==========================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// ==========================
// Home Route
// ==========================

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "🚀 Insurance Management System API is Running..."

  });

});



// ==========================
// API Routes
// ==========================

app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/customers",
  customerRoutes
);


app.use(
  "/api/policies",
  policyRoutes
);


app.use(
  "/api/claims",
  claimRoutes
);


app.use(
  "/api/payments",
  paymentRoutes
);


app.use(
  "/api/dashboard",
  dashboardRoutes
);


app.use(
  "/api/documents",
  documentRoutes
);



// ==========================
// 404 Handler
// ==========================

app.use(
  (req, res) => {

    res.status(404).json({

      success:false,

      message:
        "API Route Not Found"

    });

  }
);



// ==========================
// Server Start
// ==========================

const PORT =
  process.env.PORT || 5000;


app.listen(
  PORT,
  () => {

    console.log(
      `🚀 Server running on port ${PORT}`
    );

  }
);