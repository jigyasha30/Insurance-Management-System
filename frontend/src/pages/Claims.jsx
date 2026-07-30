import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import API from "../services/api";
import "./Claims.css";


function Claims() {

  const navigate = useNavigate();

  const [claims, setClaims] = useState([]);

  const [loading, setLoading] = useState(true);



  // ==========================
  // Fetch Claims
  // ==========================

  const fetchClaims = async () => {

    try {

      setLoading(true);

      const { data } = await API.get("/claims");

      setClaims(data.claims || []);


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to load claims"
      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchClaims();

  }, []);





  // ==========================
  // Delete Claim
  // ==========================

  const deleteClaim = async (id) => {


    const result = await Swal.fire({

      title: "Delete Claim?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#6b7280",

      confirmButtonText: "Delete"

    });



    if (!result.isConfirmed) return;



    try {


      await API.delete(
        `/claims/${id}`
      );


      toast.success(
        "Claim deleted successfully"
      );


      fetchClaims();



    } catch (error) {


      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );


    }


  };





  if (loading) {

    return (

      <h2 className="loading">

        Loading Claims...

      </h2>

    );

  }





  return (

    <div className="claims-container">



      {/* Header */}

      <div className="claims-header">


        <h1>
          Insurance Claims
        </h1>



        <button

          className="add-claim-btn"

          onClick={() =>
            navigate("/add-claim")
          }

        >

          + New Claim

        </button>



      </div>







      {/* Table */}

      <table className="claims-table">


        <thead>

          <tr>

            <th>
              Claim ID
            </th>


            <th>
              Customer
            </th>


            <th>
              Policy No.
            </th>


            <th>
              Claim Amount
            </th>


            <th>
              Status
            </th>


            <th>
              Actions
            </th>


          </tr>


        </thead>






        <tbody>


          {

            claims.length > 0 ?


            (

              claims.map((claim)=>(


                <tr key={claim._id}>


                  <td>

                    {claim._id.slice(-6)}

                  </td>




                  <td>

                    {
                      claim.customer?.user?.name ||
                      "N/A"
                    }

                  </td>




                  <td>

                    {
                      claim.policy?.policyNumber ||
                      "N/A"
                    }

                  </td>




                  <td>

                    ₹ {claim.claimAmount || 0}

                  </td>




                  <td>


                    <span

                      className={`status-badge ${
                        claim.status?.toLowerCase() || ""
                      }`}

                    >

                      {
                        claim.status ||
                        "Pending"
                      }


                    </span>


                  </td>





                  <td>


                    <div className="action-buttons">


                      <button

                        className="edit-btn"

                        onClick={() =>
                          navigate(
                            `/edit-claim/${claim._id}`
                          )
                        }

                      >

                        Edit

                      </button>





                      <button

                        className="delete-btn"

                        onClick={() =>
                          deleteClaim(
                            claim._id
                          )
                        }

                      >

                        Delete

                      </button>


                    </div>



                  </td>



                </tr>



              ))

            )

            :

            (

              <tr>


                <td

                  colSpan="6"

                  className="empty-state"

                >

                  No Claims Found


                </td>


              </tr>


            )


          }



        </tbody>


      </table>



    </div>


  );

}


export default Claims;