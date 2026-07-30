import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import "./UploadDocument.css";

function UploadDocument() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer: "",
    policy: "",
    documentType: "Aadhaar",
    document: null,
  });

  useEffect(() => {
    fetchCustomers();
    fetchPolicies();
  }, []);

  // Fetch Customers
  const fetchCustomers = async () => {
    try {
      const { data } = await API.get("/customers");
      setCustomers(data.customers || data);
    } catch (error) {
      toast.error("Unable to load customers.");
    }
  };

  // Fetch Policies
  const fetchPolicies = async () => {
    try {
      const { data } = await API.get("/policies");
      setPolicies(data.policies || data);
    } catch (error) {
      toast.error("Unable to load policies.");
    }
  };

  // Handle Input
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

  // Upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.document) {
      toast.error("Please choose a document.");
      return;
    }

    const uploadData = new FormData();

    uploadData.append("customer", formData.customer);
    uploadData.append("policy", formData.policy);
    uploadData.append("documentType", formData.documentType);
    uploadData.append("document", formData.document);

    try {
      setLoading(true);

      await API.post("/documents", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Document uploaded successfully!");

      navigate("/documents");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-document-container">

      <div className="upload-document-form">

        <h2>Upload Document</h2>

        <form onSubmit={handleSubmit}>

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

          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
          >
            <option>Aadhaar</option>
            <option>PAN</option>
            <option>Driving License</option>
            <option>Passport</option>
            <option>Policy Document</option>
            <option>Claim Document</option>
            <option>Other</option>
          </select>

          <input
            type="file"
            name="document"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Uploading..."
              : "Upload Document"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default UploadDocument;