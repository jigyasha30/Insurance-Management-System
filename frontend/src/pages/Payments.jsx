import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import API from "../services/api";
import "./Payments.css";

function Payments() {

  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);

  const [filteredPayments, setFilteredPayments] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);



  // ==========================
  // Fetch Payments
  // ==========================

  const fetchPayments = async () => {

    try {

      setLoading(true);

      const { data } = await API.get("/payments");

      setPayments(data.payments || []);

      setFilteredPayments(data.payments || []);

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to load payments"

      );

    } finally {

      setLoading(false);

    }

  };





  useEffect(() => {

    fetchPayments();

  }, []);






  // ==========================
  // Search Filter
  // ==========================

  useEffect(() => {

    const keyword = search.toLowerCase();

    const filtered = payments.filter((payment) => {

      return (

        payment.customer?.user?.name
          ?.toLowerCase()
          .includes(keyword)

        ||

        payment.policy?.policyNumber
          ?.toLowerCase()
          .includes(keyword)

        ||

        payment.paymentStatus
          ?.toLowerCase()
          .includes(keyword)

        ||

        payment.transactionId
          ?.toLowerCase()
          .includes(keyword)

      );

    });

    setFilteredPayments(filtered);

  }, [payments, search]);







  // ==========================
  // Delete Payment
  // ==========================

  const deletePayment = async (id) => {

    const result = await Swal.fire({

      title: "Delete Payment?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#6b7280",

      confirmButtonText: "Delete",

    });

    if (!result.isConfirmed) return;

    try {

      await API.delete(`/payments/${id}`);

      toast.success(
        "Payment deleted successfully"
      );

      fetchPayments();

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to delete payment"

      );

    }

  };






  if (loading) {

    return (

      <div className="loading">

        <h2>
          Loading Payments...
        </h2>

      </div>

    );

  }







  return (

    <div className="payments-container">

      {/* Header */}

      <div className="payments-header">

        <h1>
          Payments
        </h1>

        <div className="payments-actions">

          <input

            type="text"

            className="search-box"

            placeholder="Search by customer, policy, status..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

          />



          <button

            className="refresh-btn"

            onClick={fetchPayments}

          >

            Refresh

          </button>



          <button

            className="add-payment-btn"

            onClick={() =>
              navigate("/add-payment")
            }

          >

            + Add Payment

          </button>

        </div>

      </div>





      {/* Payments Table */}

      <table className="payments-table">

        <thead>

          <tr>

            <th>Customer</th>

            <th>Policy No.</th>

            <th>Amount</th>

            <th>Method</th>

            <th>Status</th>

            <th>Transaction ID</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>          {

            filteredPayments.length > 0

            ? (

              filteredPayments.map((payment) => (

                <tr key={payment._id}>

                  <td>

                    {
                      payment.customer?.user?.name || "N/A"
                    }

                  </td>



                  <td>

                    {
                      payment.policy?.policyNumber || "N/A"
                    }

                  </td>



                  <td>

                    ₹ {payment.amount}

                  </td>



                  <td>

                    {
                      payment.paymentMethod
                    }

                  </td>



                  <td>

                    <span
                      className={`status-badge ${payment.paymentStatus.toLowerCase()}`}
                    >

                      {payment.paymentStatus}

                    </span>

                  </td>



                  <td>

                    {
                      payment.transactionId || "-"
                    }

                  </td>



                  <td className="action-buttons">

                    <button

                      className="edit-btn"

                      onClick={() =>
                        navigate(
                          `/edit-payment/${payment._id}`
                        )
                      }

                    >

                      Edit

                    </button>



                    <button

                      className="delete-btn"

                      onClick={() =>
                        deletePayment(payment._id)
                      }

                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))

            )

            : (

              <tr>

                <td
                  colSpan="7"
                  className="empty-state"
                >

                  💳 No Payments Found

                </td>

              </tr>

            )

          }

        </tbody>

      </table>

    </div>

  );

}

export default Payments;