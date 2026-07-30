import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import "./AddCustomer.css";

function AddCustomer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/customers", formData);

      toast.success(
        res.data.message || "Customer added successfully!"
      );

      // Wait so the user can see the toast
      setTimeout(() => {
        navigate("/customers");
      }, 1200);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="add-customer-container">
      <div className="customer-form">
        <h2>Add New Customer</h2>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={changeHandler}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={changeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeHandler}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={changeHandler}
            required
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={changeHandler}
            required
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
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={changeHandler}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={changeHandler}
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={changeHandler}
            required
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
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;