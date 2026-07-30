import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import "./AddClaim.css";

function AddClaim() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer: "",
    policy: "",
    claimAmount: "",
    reason: "",
    status: "Pending",
    remarks: "",
  });

  // ==========================
  // Fetch Customers
  // ==========================

  const fetchCustomers = async () => {
    try {
      const { data } = await API.get("/customers");
      setCustomers(data.customers || []);
    } catch (error) {
      toast.error("Unable to load customers");
    }
  };

  // ==========================
  // Fetch Policies
  // ==========================

  const fetchPolicies = async () => {
    try {
      const { data } = await API.get("/policies");
      setPolicies(data.policies || []);
    } catch (error) {
      toast.error("Unable to load policies");
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
  // Submit Claim
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/claims", formData);

      toast.success("Claim submitted successfully");

      navigate("/claims");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit claim"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-claim-container">
      <h1>Add New Claim</h1>

      <form
        className="add-claim-card"
        onSubmit={handleSubmit}
      >
        {/* Customer */}

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
                {customer.user?.name || "Unknown"}
              </option>
            ))}
          </select>
        </div>

        {/* Policy */}

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

        {/* Claim Amount */}

        <div className="form-group">
          <label>Claim Amount</label>

          <input
            type="number"
            name="claimAmount"
            value={formData.claimAmount}
            onChange={handleChange}
            placeholder="Enter Claim Amount"
            required
          />
        </div>

        {/* Reason */}

        <div className="form-group">
          <label>Reason</label>

          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter claim reason"
            rows="4"
            required
          />
        </div>

        {/* Status */}

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Remarks */}

        <div className="form-group">
          <label>Remarks (Optional)</label>

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Enter remarks"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="add-claim-submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Claim"}
        </button>
      </form>
    </div>
  );
}

export default AddClaim;