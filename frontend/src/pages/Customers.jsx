import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import API from "../services/api";
import "./Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch Customers
  const fetchCustomers = async () => {
    try {
      const { data } = await API.get("/customers");
      setCustomers(data.customers || data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Delete Customer
  const deleteCustomer = async (id) => {
    const result = await Swal.fire({
      title: "Delete Customer?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete(`/customers/${id}`);

      toast.success("Customer deleted successfully!");

      fetchCustomers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete customer."
      );
    }
  };

  // Search & Filter Logic
  const filteredCustomers = customers.filter((customer) => {
    const name = customer.user?.name || "";
    const email = customer.user?.email || "";

    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="customers-container">
      {/* Header */}
      <div className="customers-header">
        <h1>Customer Management</h1>

        <Link to="/add-customer">
          <button className="add-btn">
            + Add Customer
          </button>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="🔍 Search by Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Customer Table */}
      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.user?.name}</td>

                <td>{customer.user?.email}</td>

                <td>{customer.phone}</td>

                <td>{customer.city}</td>

                <td>
                  <span
                    className={
                      customer.status === "Active"
                        ? "active"
                        : "inactive"
                    }
                  >
                    {customer.status}
                  </span>
                </td>

                <td>
                  <Link to={`/edit-customer/${customer._id}`}>
                    <button className="edit-btn">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteCustomer(customer._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Customers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;