import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import "./EditDocument.css";

function EditDocument() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    customer: "",
    policy: "",
    documentType: "Aadhaar",
    document: null,
  });

  useEffect(() => {
    fetchCustomers();
    fetchPolicies();
    fetchDocument();
  }, []);

  // ==========================
  // Fetch Customers
  // ==========================

  const fetchCustomers = async () => {
    try {
      const { data } = await API.get("/customers");
      setCustomers(data.customers || []);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  // ==========================
  // Fetch Document Details
  // ==========================

  const fetchDocument = async () => {
    try {
      const { data } = await API.get(`/documents/${id}`);

      setFormData({
        customer: data.document.customer?._id || "",
        policy: data.document.policy?._id || "",
        documentType: data.document.documentType || "Aadhaar",
        document: null,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load document."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Handle Change
  // ==========================

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "document") {
      setFormData({
        ...formData,
        document: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // ==========================
  // Update Document
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = new FormData();

      updatedData.append(
        "customer",
        formData.customer
      );

      updatedData.append(
        "policy",
        formData.policy
      );

      updatedData.append(
        "documentType",
        formData.documentType
      );

      if (formData.document) {
        updatedData.append(
          "document",
          formData.document
        );
      }

      await API.put(
        `/documents/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Document updated successfully."
      );

      navigate("/documents");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update document."
      );
    }
  };

  if (loading) {
    return (
      <h2 className="loading">
        Loading Document...
      </h2>
    );
  }

  return (
    <div className="edit-document-container">
      <h1>Edit Document</h1>

      <form
        className="edit-document-card"
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
            <option value="">
              Select Customer
            </option>

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
          >
            <option value="">
              Select Policy
            </option>

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
          <label>Document Type</label>

          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            required
          >
            <option value="Aadhaar">
              Aadhaar
            </option>

            <option value="PAN">
              PAN
            </option>

            <option value="Driving License">
              Driving License
            </option>

            <option value="Passport">
              Passport
            </option>

            <option value="Policy Document">
              Policy Document
            </option>

            <option value="Claim Document">
              Claim Document
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Upload New File (Optional)
          </label>

          <input
            type="file"
            name="document"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="update-document-btn"
        >
          Update Document
        </button>
      </form>
    </div>
  );
}

export default EditDocument;