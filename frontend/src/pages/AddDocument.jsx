import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import "./AddDocument.css";

function AddDocument() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer: "",
    policy: "",
    documentType: "Aadhaar",
  });

  const [documentFile, setDocumentFile] = useState(null);

  // ==========================
  // Fetch Customers
  // ==========================

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data.customers || []);
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
      setPolicies(res.data.policies || []);
    } catch (error) {
      toast.error("Failed to load policies");
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchPolicies();
  }, []);

  // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Handle File
  // ==========================

  const handleFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documentFile) {
      toast.warning("Please select a document");
      return;
    }

    try {
      setLoading(true);

      const uploadData = new FormData();

      uploadData.append("customer", formData.customer);
      uploadData.append("policy", formData.policy);
      uploadData.append(
        "documentType",
        formData.documentType
      );
      uploadData.append(
        "document",
        documentFile
      );

      await API.post(
        "/documents",
        uploadData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Document uploaded successfully"
      );

      navigate("/documents");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-document-container">

      <h1>Upload Document</h1>

      <form
        className="add-document-card"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>
            Customer
          </label>

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

          <label>
            Policy
          </label>

          <select
            name="policy"
            value={formData.policy}
            onChange={handleChange}
          >
            <option value="">
              Select Policy (Optional)
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

          <label>
            Document Type
          </label>

          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
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
            Upload File
          </label>

          <input
            type="file"
            onChange={handleFileChange}
            required
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />

        </div>

        <button
          type="submit"
          className="upload-document-btn"
          disabled={loading}
        >
          {loading
            ? "Uploading..."
            : "Upload Document"}
        </button>

      </form>

    </div>
  );
}

export default AddDocument;