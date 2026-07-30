import { useEffect, useState } from "react";
import {
  FaUsers,
  FaFileContract,
  FaClipboardCheck,
  FaMoneyBillWave,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalCustomers: 0,
    totalPolicies: 0,
    activePolicies: 0,
    totalClaims: 0,
    pendingClaims: 0,
    totalPayments: 0,
    totalRevenue: 0,
    recentClaims: [],
    recentPayments: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ==========================
  // Fetch Dashboard Data
  // ==========================

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/dashboard/stats");

      if (data.success) {
        setDashboard(data.dashboard);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Dashboard Cards
  // ==========================

  const cards = [
    {
      title: "Total Customers",
      value: dashboard.totalCustomers,
      icon: <FaUsers />,
    },
    {
      title: "Active Policies",
      value: dashboard.activePolicies,
      icon: <FaFileContract />,
    },
    {
      title: "Total Claims",
      value: dashboard.totalClaims,
      icon: <FaClipboardCheck />,
    },
    {
      title: "Total Revenue",
      value: `₹${dashboard.totalRevenue.toLocaleString()}`,
      icon: <FaMoneyBillWave />,
    },
  ];

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>

        <h2>Loading Dashboard...</h2>
      </div>
    );
  }  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <p className="dashboard-text">
        Welcome back! Here's your insurance management overview.
      </p>

      {/* ==========================
          Dashboard Cards
      ========================== */}

      <div className="dashboard-cards">
        {cards.map((card, index) => (
          <div className="dashboard-card" key={index}>
            <div className="card-icon">
              {card.icon}
            </div>

            <div className="card-content">
              <h3>{card.title}</h3>
              <h2>{card.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* ==========================
          Recent Claims
      ========================== */}

      <div className="dashboard-section">
        <h2>Recent Claims</h2>

        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Policy Number</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.recentClaims.length > 0 ? (
              dashboard.recentClaims.map((claim) => (
                <tr key={claim._id}>
                  <td>
                    {claim.customer?.user?.name || "N/A"}
                  </td>

                  <td>
                    {claim.policy?.policyNumber || "N/A"}
                  </td>

                  <td>
                    <span
                      className={`status ${claim.status.toLowerCase()}`}
                    >
                      {claim.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  No Recent Claims Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ==========================
          Recent Payments
      ========================== */}

      <div className="dashboard-section">
        <h2>Recent Payments</h2>

        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Policy Number</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.recentPayments.length > 0 ? (
              dashboard.recentPayments.map((payment) => (
                <tr key={payment._id}>
                  <td>
                    {payment.customer?.user?.name || "N/A"}
                  </td>

                  <td>
                    {payment.policy?.policyNumber || "N/A"}
                  </td>

                  <td>
                    ₹{payment.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  No Recent Payments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ==========================
          Quick Summary
      ========================== */}

      <div className="dashboard-section">
        <h2>Quick Summary</h2>

        <table>
          <tbody>
            <tr>
              <td>Total Policies</td>
              <td>{dashboard.totalPolicies}</td>
            </tr>

            <tr>
              <td>Pending Claims</td>
              <td>{dashboard.pendingClaims}</td>
            </tr>

            <tr>
              <td>Total Payments</td>
              <td>{dashboard.totalPayments}</td>
            </tr>

            <tr>
              <td>Total Revenue</td>
              <td>
                ₹{dashboard.totalRevenue.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;