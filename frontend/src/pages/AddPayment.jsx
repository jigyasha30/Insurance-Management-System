import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import "./AddPayment.css";

function AddPayment() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer: "",
    policy: "",
    amount: "",
    paymentMethod: "UPI",
    paymentStatus: "Pending",
    transactionId: "",
    dueDate: "",
  });

  // ==========================
  // Fetch Customers
  // ==========================

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data.customers);
    } catch (error) {
      toast.error("Failed to load customers");
    }
  };

  // ==========================
  // Fetch Policies
  // ==========================

  const fetchPolicies = async () => {
    try {
      const res = await API.get("/policies");
      setPolicies(res.data.policies);
    } catch (error) {
      toast.error("Failed to load policies");
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchPolicies();
  }, []);

  // ==========================
  // Handle Change
  // ==========================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================
  // Submit Payment
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/payments", formData);

      toast.success("Payment added successfully");

      setTimeout(() => {
        navigate("/payments");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add payment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-payment-container">
      <h1>Add Payment</h1>

      <form
        className="add-payment-card"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Customer</label>

          <select
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
          >
            <option value="">Select Customer</option>

            {customers.map((customer) => (
              <option
                key={customer._id}
                value={customer._id}
              >
                {customer.user?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Policy</label>

          <select
            name="policy"
            value={formData.policy}
            onChange={handleChange}
            required
          >
            <option value="">Select Policy</option>

            {policies.map((policy) => (
              <option
                key={policy._id}
                value={policy._id}
              >
                {policy.policyNumber}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Amount</label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <div className="form-group">
          <label>Payment Status</label>

          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Transaction ID</label>

          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            placeholder="Enter Transaction ID"
          />
        </div>

        <div className="form-group">
          <label>Due Date</label>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="add-payment-btn-submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Payment"}
        </button>
      </form>
    </div>
  );
}

export default AddPayment;