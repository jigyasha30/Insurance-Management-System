import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import "./EditClaim.css";

function EditClaim() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    customer: "",
    policy: "",
    claimAmount: "",
    reason: "",
    status: "Pending",
    remarks: "",
  });

  // ==========================
  // Fetch Data
  // ==========================

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [customerRes, policyRes, claimRes] = await Promise.all([
        API.get("/customers"),
        API.get("/policies"),
        API.get(`/claims/${id}`),
      ]);

      setCustomers(customerRes.data.customers || []);
      setPolicies(policyRes.data.policies || []);

      const claim = claimRes.data.claim;

      setFormData({
        customer: claim.customer?._id || "",
        policy: claim.policy?._id || "",
        claimAmount: claim.claimAmount || "",
        reason: claim.reason || "",
        status: claim.status || "Pending",
        remarks: claim.remarks || "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load claim details"
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
  // Update Claim
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      await API.put(`/claims/${id}`, formData);

      toast.success("Claim updated successfully");

      setTimeout(() => {
        navigate("/claims");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update claim"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Claim...</h2>
      </div>
    );
  }

  return (
    <div className="edit-claim-container">
      <h1>Edit Claim</h1>

      <form
        className="edit-claim-card"
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
          <label>Remarks</label>

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="update-claim-btn"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Claim"}
        </button>
      </form>
    </div>
  );
}

export default EditClaim;