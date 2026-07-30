import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./AddPolicy.css";


function AddPolicy() {

  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);


  const [formData, setFormData] = useState({

    customer: "",
    policyNumber: "",
    policyType: "",
    premiumAmount: "",
    coverageAmount: "",
    startDate: "",
    endDate: "",
    status: "Active",
    description: ""

  });



  // Fetch Customers
  const fetchCustomers = async () => {

    try {

      const res = await API.get("/customers");

      setCustomers(res.data.customers);

    } catch (error) {

      console.log(
        "Customer Fetch Error:",
        error
      );

    }

  };



  useEffect(() => {

    fetchCustomers();

  }, []);




  // Handle Input Change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };




  // Add Policy
  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      await API.post(
        "/policies",
        formData
      );


      alert(
        "Policy Added Successfully"
      );


      navigate("/policies");


    } catch (error) {


      console.log(
        "Policy Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Policy Add Failed"
      );


    }

  };




  return (

    <div className="add-policy-container">


      <h1>
        Add Policy
      </h1>



      <form
        className="add-policy-card"
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


            {
              customers.map((customer)=>(

                <option

                  key={customer._id}

                  value={customer._id}

                >

                  {customer.user?.name}

                </option>

              ))
            }


          </select>


        </div>





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

            <option value="">
              Select Type
            </option>


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

          Add Policy

        </button>



      </form>


    </div>

  );

}


export default AddPolicy;