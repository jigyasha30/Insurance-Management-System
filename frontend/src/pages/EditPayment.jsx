import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import "./EditPayment.css";

function EditPayment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    customer: "",
    policy: "",
    amount: "",
    paymentMethod: "UPI",
    paymentStatus: "Pending",
    transactionId: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  // ==========================
  // Fetch All Data
  // ==========================

  const fetchData = async () => {
    try {
      const [customerRes, policyRes, paymentRes] = await Promise.all([
        API.get("/customers"),
        API.get("/policies"),
        API.get(`/payments/${id}`),
      ]);

      setCustomers(customerRes.data.customers);
      setPolicies(policyRes.data.policies);

      const payment = paymentRes.data.payment;

      setFormData({
        customer: payment.customer?._id || "",
        policy: payment.policy?._id || "",
        amount: payment.amount || "",
        paymentMethod: payment.paymentMethod || "UPI",
        paymentStatus: payment.paymentStatus || "Pending",
        transactionId: payment.transactionId || "",
        dueDate: payment.dueDate
          ? payment.dueDate.substring(0, 10)
          : "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load payment details"
      );
    } finally {
      setLoading(false);
    }
  };

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
  // Update Payment
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      await API.put(`/payments/${id}`, formData);

      toast.success("Payment updated successfully");

      setTimeout(() => {
        navigate("/payments");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update payment"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Payment...</h2>
      </div>
    );
  }

  return (
    <div className="edit-payment-container">
      <h1>Edit Payment</h1>

      <form
        className="edit-payment-card"
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
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
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
          className="update-payment-btn"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Payment"}
        </button>
      </form>
    </div>
  );
}

export default EditPayment;