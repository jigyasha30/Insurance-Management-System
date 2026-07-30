const Customer = require("../models/Customer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// ==========================
// Add Customer
// ==========================
const addCustomer = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      pincode,
      aadhaarNumber,
      status,
    } = req.body;


    const existingUser = await User.findOne({ email });


    if (existingUser) {

      return res.status(400).json({

        success:false,

        message:"Email already exists"

      });

    }



    const hashedPassword = await bcrypt.hash(password,10);



    const user = await User.create({

      name,

      email,

      password:hashedPassword,

      role:"customer"

    });




    const customer = await Customer.create({

      user:user._id,

      phone,

      dob,

      gender,

      address,

      city,

      state,

      pincode,

      aadhaarNumber,

      status

    });



    res.status(201).json({

      success:true,

      message:"Customer added successfully",

      customer

    });



  } catch(error) {


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};





// ==========================
// Get All Customers
// ==========================
const getAllCustomers = async (req,res)=>{

  try{


    const customers = await Customer.find()
      .populate(
        "user",
        "name email role"
      );



    res.status(200).json({

      success:true,

      count:customers.length,

      customers

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};





// ==========================
// Get Customer By ID
// ==========================
const getCustomerById = async(req,res)=>{


  try{


    const customer = await Customer.findById(req.params.id)
      .populate(
        "user",
        "name email role"
      );



    if(!customer){

      return res.status(404).json({

        success:false,

        message:"Customer not found"

      });

    }



    res.status(200).json({

      success:true,

      customer

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};






// ==========================
// Update Customer
// ==========================
const updateCustomer = async(req,res)=>{


  try{


    const customer = await Customer.findById(req.params.id);



    if(!customer){

      return res.status(404).json({

        success:false,

        message:"Customer not found"

      });

    }




    const {

      name,

      email,

      phone,

      dob,

      gender,

      address,

      city,

      state,

      pincode,

      aadhaarNumber,

      status


    } = req.body;





    // Update User Data

    await User.findByIdAndUpdate(

      customer.user,

      {

        name,

        email

      },

      {

        new:true

      }

    );






    // Update Customer Data


    customer.phone = phone || customer.phone;

    customer.dob = dob || customer.dob;

    customer.gender = gender || customer.gender;

    customer.address = address || customer.address;

    customer.city = city || customer.city;

    customer.state = state || customer.state;

    customer.pincode = pincode || customer.pincode;

    customer.aadhaarNumber =
      aadhaarNumber || customer.aadhaarNumber;

    customer.status =
      status || customer.status;




    await customer.save();





    res.status(200).json({

      success:true,

      message:"Customer updated successfully",

      customer

    });





  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};






// ==========================
// Delete Customer
// ==========================
const deleteCustomer = async(req,res)=>{


  try{


    const customer = await Customer.findById(req.params.id);



    if(!customer){

      return res.status(404).json({

        success:false,

        message:"Customer not found"

      });

    }



    await User.findByIdAndDelete(customer.user);


    await customer.deleteOne();




    res.status(200).json({

      success:true,

      message:"Customer deleted successfully"

    });




  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};






module.exports = {

  addCustomer,

  getAllCustomers,

  getCustomerById,

  updateCustomer,

  deleteCustomer

};