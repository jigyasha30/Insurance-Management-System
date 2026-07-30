const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


// ==========================
// Register User
// ==========================
const registerUser = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;


    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });

    }


    const userExists = await User.findOne({ email });


    if (userExists) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    }



    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );



    const user = await User.create({

      name,
      email,
      password: hashedPassword,
      role: role || "customer",

    });



    res.status(201).json({

      success: true,

      message: "Registration successful",

      user: {

        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

      },


      token: generateToken(
        user._id,
        user.role
      ),

    });



  } catch (error) {


    res.status(500).json({

      success: false,
      message: error.message,

    });


  }

};





// ==========================
// Login User
// ==========================
const loginUser = async (req, res) => {


  try {


    const { email, password } = req.body;



    if (!email || !password) {


      return res.status(400).json({

        success: false,
        message: "Email and Password are required",

      });


    }




    const user = await User.findOne({ email });



    if (!user) {


      return res.status(401).json({

        success: false,
        message: "Invalid Email or Password",

      });


    }




    const isMatch = await bcrypt.compare(

      password,
      user.password

    );




    if (!isMatch) {


      return res.status(401).json({

        success: false,
        message: "Invalid Email or Password",

      });


    }





    res.status(200).json({

      success: true,

      message: "Login successful",


      user: {

        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

      },


      token: generateToken(
        user._id,
        user.role
      ),


    });




  } catch (error) {


    res.status(500).json({

      success: false,
      message: error.message,

    });


  }


};






// ==========================
// Get Logged-in User Profile
// ==========================
const getProfile = async (req, res) => {


  try {


    const user = await User.findById(
      req.user._id
    ).select("-password");




    if (!user) {


      return res.status(404).json({

        success: false,
        message: "User not found",

      });


    }





    res.status(200).json({

      success: true,

      user,

    });




  } catch (error) {


    res.status(500).json({

      success: false,
      message: error.message,

    });


  }


};








// ==========================
// Update User Profile
// ==========================
const updateProfile = async (req, res) => {


  try {


    const {
      name,
      email
    } = req.body;




    const user = await User.findById(
      req.user._id
    );




    if (!user) {


      return res.status(404).json({

        success: false,
        message: "User not found",

      });


    }




    user.name = name || user.name;

    user.email = email || user.email;



    const updatedUser = await user.save();




    res.status(200).json({

      success: true,

      message: "Profile updated successfully",


      user: {

        id: updatedUser._id,

        name: updatedUser.name,

        email: updatedUser.email,

        role: updatedUser.role,

      },


    });





  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }


};





module.exports = {

  registerUser,

  loginUser,

  getProfile,

  updateProfile,

};