import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard
import Dashboard from "./pages/Dashboard";

// Customers
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";

// Policies
import Policies from "./pages/Policies";
import AddPolicy from "./pages/AddPolicy";
import EditPolicy from "./pages/EditPolicy";

// Claims
import Claims from "./pages/Claims";
import AddClaim from "./pages/AddClaim";
import EditClaim from "./pages/EditClaim";

// Payments
import Payments from "./pages/Payments";
import AddPayment from "./pages/AddPayment";
import EditPayment from "./pages/EditPayment";

// Documents
import Documents from "./pages/Documents";
import UploadDocument from "./pages/UploadDocument";
import EditDocument from "./pages/EditDocument";

// Profile
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          {/* Dashboard */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Customers */}

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/add-customer"
            element={<AddCustomer />}
          />

          <Route
            path="/edit-customer/:id"
            element={<EditCustomer />}
          />

          {/* Policies */}

          <Route
            path="/policies"
            element={<Policies />}
          />

          <Route
            path="/add-policy"
            element={<AddPolicy />}
          />

          <Route
            path="/edit-policy/:id"
            element={<EditPolicy />}
          />

          {/* Claims */}

          <Route
            path="/claims"
            element={<Claims />}
          />

          <Route
            path="/add-claim"
            element={<AddClaim />}
          />

          <Route
            path="/edit-claim/:id"
            element={<EditClaim />}
          />

          {/* Payments */}

          <Route
            path="/payments"
            element={<Payments />}
          />

          <Route
            path="/add-payment"
            element={<AddPayment />}
          />

          <Route
            path="/edit-payment/:id"
            element={<EditPayment />}
          />

          {/* Documents */}

          <Route
            path="/documents"
            element={<Documents />}
          />

          <Route
            path="/upload-document"
            element={<UploadDocument />}
          />

          <Route
            path="/edit-document/:id"
            element={<EditDocument />}
          />

          {/* Profile */}

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Routes>

      {/* Toast Notifications */}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;