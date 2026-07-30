import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaBars, 
  FaSignOutAlt, 
  FaUserCircle 
} from "react-icons/fa";

import "./Navbar.css";


function Navbar({ toggleSidebar }) {


  const navigate = useNavigate();
  const location = useLocation();


  const user = JSON.parse(localStorage.getItem("user"));



  // Hide Navbar on Login & Register Pages

  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {

    return null;

  }



  const logoutHandler = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };



  return (

    <nav className="navbar">


      {/* Left Section */}

      <div className="navbar-left">


        <button
          className="menu-btn"
          onClick={toggleSidebar}
        >

          <FaBars />

        </button>



        <h2 className="navbar-title">
          Insurance Management System
        </h2>


      </div>





      {/* Right Section */}

      <div className="navbar-right">


        <div className="user-profile">


          <FaUserCircle className="user-icon" />


          <span>

            {user?.name || "User"}

          </span>


        </div>





        <button
          className="logout-btn"
          onClick={logoutHandler}
        >

          <FaSignOutAlt />

          Logout

        </button>



      </div>



    </nav>

  );

}


export default Navbar;