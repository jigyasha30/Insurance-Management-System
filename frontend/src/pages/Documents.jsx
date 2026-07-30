import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import API from "../services/api";
import "./Documents.css";


function Documents() {

  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState("All");



  // ==========================
  // Fetch Documents
  // ==========================

  const fetchDocuments = async () => {

    try {

      setLoading(true);

      const { data } = await API.get("/documents");

      setDocuments(data.documents || []);


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to load documents"
      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchDocuments();

  }, []);




  // ==========================
  // Delete Document
  // ==========================

  const deleteDocument = async (id) => {


    const result = await Swal.fire({

      title: "Delete Document?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#6b7280",

      confirmButtonText: "Delete",

    });



    if (!result.isConfirmed) return;



    try {


      await API.delete(`/documents/${id}`);


      toast.success(
        "Document deleted successfully"
      );


      fetchDocuments();



    } catch (error) {


      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );


    }


  };





  // ==========================
  // Filter Documents
  // ==========================

  const filteredDocuments = documents.filter((doc) => {


    const customerName =
      doc.customer?.user?.name || "";


    const fileName =
      doc.fileName || "";



    const searchMatch =

      customerName
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      fileName
        .toLowerCase()
        .includes(search.toLowerCase());




    const typeMatch =

      typeFilter === "All"

      ||

      doc.documentType === typeFilter;



    return searchMatch && typeMatch;


  });





  if (loading) {

    return (

      <h2 className="loading">

        Loading Documents...

      </h2>

    );

  }




  return (

    <div className="documents-container">


      {/* Header */}

      <div className="documents-header">


        <h1>
          Documents
        </h1>



        <Link to="/upload-document">

          <button className="upload-btn">

            + Upload Document

          </button>


        </Link>


      </div>





      {/* Search Filter */}


      <div className="filter-section">


        <input

          type="text"

          placeholder="Search Customer or File..."

          className="search-input"

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

        />




        <select

          className="filter-select"

          value={typeFilter}

          onChange={(e)=>
            setTypeFilter(e.target.value)
          }

        >

          <option value="All">
            All Types
          </option>

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






      {/* Table */}


      <table className="documents-table">


        <thead>


          <tr>

            <th>
              Customer
            </th>

            <th>
              Document Type
            </th>

            <th>
              File Name
            </th>

            <th>
              Size
            </th>

            <th>
              Uploaded Date
            </th>

            <th>
              Actions
            </th>


          </tr>


        </thead>





        <tbody>


        {

          filteredDocuments.length > 0 ?


          (

            filteredDocuments.map((doc)=>(


              <tr key={doc._id}>


                <td>

                  {
                    doc.customer?.user?.name ||
                    "N/A"
                  }

                </td>



                <td>

                  {
                    doc.documentType
                  }

                </td>



                <td>

                  {
                    doc.fileName
                  }

                </td>




                <td>

                  {
                    doc.fileSize

                    ?

                    `${(
                      doc.fileSize / 1024
                    ).toFixed(2)} KB`

                    :

                    "-"
                  }


                </td>




                <td>

                  {
                    new Date(
                      doc.createdAt
                    ).toLocaleDateString()
                  }


                </td>





                <td className="action-buttons">



                  {/* View */}

                  <a

                    href={
                      `${API.defaults.baseURL.replace(
                        "/api",
                        ""
                      )}/${doc.filePath.replace(
                        /\\/g,
                        "/"
                      )}`
                    }

                    target="_blank"

                    rel="noreferrer"

                  >

                    <button className="view-btn">

                      View

                    </button>


                  </a>






                  {/* Download */}


                  <a

                    href={
                      `${API.defaults.baseURL}/documents/download/${doc._id}`
                    }

                  >

                    <button className="download-btn">

                      Download

                    </button>


                  </a>







                  {/* Edit */}


                  <button

                    className="edit-btn"

                    onClick={() =>
                      navigate(
                        `/edit-document/${doc._id}`
                      )
                    }

                  >

                    Edit

                  </button>







                  {/* Delete */}


                  <button

                    className="delete-btn"

                    onClick={() =>
                      deleteDocument(doc._id)
                    }

                  >

                    Delete

                  </button>



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

                📂 No Documents Found

              </td>


            </tr>


          )


        }


        </tbody>


      </table>



    </div>

  );

}


export default Documents;