import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "./EditPolicy.css";


function EditPolicy() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    policyNumber: "",
    policyType: "",
    premiumAmount: "",
    coverageAmount: "",
    startDate: "",
    endDate: "",
    status: "Active",
    description: ""

  });



  // Fetch Policy Data

  const fetchPolicy = async () => {

    try {

      const res = await API.get(
        `/policies/${id}`
      );


      const policy = res.data.policy;


      setFormData({

        policyNumber: policy.policyNumber,

        policyType: policy.policyType,

        premiumAmount: policy.premiumAmount,

        coverageAmount: policy.coverageAmount,

        startDate: policy.startDate
          ?.split("T")[0],

        endDate: policy.endDate
          ?.split("T")[0],

        status: policy.status,

        description: policy.description || ""

      });


    } catch(error) {

      console.log(
        "Fetch Policy Error:",
        error
      );

    }

  };




  useEffect(() => {

    fetchPolicy();

  }, []);




  // Input Change

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };





  // Update Policy

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      await API.put(

        `/policies/${id}`,

        formData

      );


      alert(
        "Policy Updated Successfully"
      );


      navigate("/policies");


    } catch(error) {


      console.log(
        "Update Policy Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Update Failed"
      );


    }


  };





  return (

    <div className="edit-policy-container">


      <h1>
        Edit Policy
      </h1>




      <form

        className="edit-policy-card"

        onSubmit={handleSubmit}

      >



        <div className="form-group">

          <label>
            Policy Number
          </label>


          <input

            type="text"

            name="policyNumber"

            value={formData.policyNumber}

            onChange={handleChange}

            required

          />


        </div>





        <div className="form-group">

          <label>
            Policy Type
          </label>


          <select

            name="policyType"

            value={formData.policyType}

            onChange={handleChange}

            required

          >

            <option value="Health">
              Health
            </option>

            <option value="Life">
              Life
            </option>

            <option value="Vehicle">
              Vehicle
            </option>

            <option value="Home">
              Home
            </option>

            <option value="Travel">
              Travel
            </option>


          </select>


        </div>





        <div className="form-group">

          <label>
            Premium Amount
          </label>


          <input

            type="number"

            name="premiumAmount"

            value={formData.premiumAmount}

            onChange={handleChange}

            required

          />


        </div>





        <div className="form-group">

          <label>
            Coverage Amount
          </label>


          <input

            type="number"

            name="coverageAmount"

            value={formData.coverageAmount}

            onChange={handleChange}

            required

          />


        </div>





        <div className="form-group">

          <label>
            Start Date
          </label>


          <input

            type="date"

            name="startDate"

            value={formData.startDate}

            onChange={handleChange}

            required

          />


        </div>





        <div className="form-group">

          <label>
            End Date
          </label>


          <input

            type="date"

            name="endDate"

            value={formData.endDate}

            onChange={handleChange}

            required

          />


        </div>





        <div className="form-group">

          <label>
            Status
          </label>


          <select

            name="status"

            value={formData.status}

            onChange={handleChange}

          >

            <option value="Active">
              Active
            </option>

            <option value="Expired">
              Expired
            </option>

            <option value="Cancelled">
              Cancelled
            </option>


          </select>


        </div>





        <div className="form-group">

          <label>
            Description
          </label>


          <textarea

            name="description"

            value={formData.description}

            onChange={handleChange}

          />


        </div>





        <button

          type="submit"

          className="add-policy-submit"

        >

          Update Policy

        </button>



      </form>


    </div>

  );

}


export default EditPolicy;