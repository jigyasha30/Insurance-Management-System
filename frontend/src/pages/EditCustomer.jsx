import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import "./EditCustomer.css";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    address: "",
    city: "",
    state: "",
    pincode: "",
    aadhaarNumber: "",
    status: "Active",
  });

  // Get Customer Data
  const getCustomer = async () => {
    try {
      const { data } = await API.get(`/customers/${id}`);

      const customer = data.customer;

      setFormData({
        name: customer.user?.name || "",
        email: customer.user?.email || "",
        phone: customer.phone || "",
        dob: customer.dob ? customer.dob.substring(0, 10) : "",
        gender: customer.gender || "Male",
        address: customer.address || "",
        city: customer.city || "",
        state: customer.state || "",
        pincode: customer.pincode || "",
        aadhaarNumber: customer.aadhaarNumber || "",
        status: customer.status || "Active",
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to load customer details.");
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update Customer
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/customers/${id}`, formData);

      toast.success("Customer updated successfully!");

      setTimeout(() => {
        navigate("/customers");
      }, 1200);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed."
      );
    }
  };

  return (
    <div className="edit-customer-container">
      <div className="edit-customer-form">
        <h2>Edit Customer</h2>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={changeHandler}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={changeHandler}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={changeHandler}
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={changeHandler}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={changeHandler}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={changeHandler}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={changeHandler}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={changeHandler}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={changeHandler}
          />

          <input
            type="text"
            name="aadhaarNumber"
            placeholder="Aadhaar Number"
            value={formData.aadhaarNumber}
            onChange={changeHandler}
          />

          <select
            name="status"
            value={formData.status}
            onChange={changeHandler}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit">
            Update Customer
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;