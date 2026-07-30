import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Policies.css";

function Policies() {
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);

  // Fetch Policies
  const fetchPolicies = async () => {
    try {
      const res = await API.get("/policies");
      setPolicies(res.data.policies);
    } catch (error) {
      console.log("Fetch Policies Error:", error);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // Delete Policy
  const deletePolicy = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this policy?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/policies/${id}`);

      alert("Policy Deleted Successfully");

      fetchPolicies();
    } catch (error) {
      console.log("Delete Error:", error);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="policies-container">

      <div className="policies-header">
        <h1>Insurance Policies</h1>

        <button
          className="add-policy-btn"
          onClick={() => navigate("/add-policy")}
        >
          + Add Policy
        </button>
      </div>

      <table className="policies-table">

        <thead>
          <tr>
            <th>Policy ID</th>
            <th>Policy Number</th>
            <th>Customer</th>
            <th>Policy Type</th>
            <th>Premium</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {policies.length > 0 ? (
            policies.map((policy) => (
              <tr key={policy._id}>

                <td>{policy._id.slice(-6)}</td>

                <td>{policy.policyNumber}</td>

                <td>
                  {policy.customer?.user?.name || "N/A"}
                </td>

                <td>{policy.policyType}</td>

                <td>₹ {policy.premiumAmount}</td>

                <td>
                  <span
                    className={`status-badge ${policy.status.toLowerCase()}`}
                  >
                    {policy.status}
                  </span>
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/edit-policy/${policy._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deletePolicy(policy._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">
                No Policies Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Policies;