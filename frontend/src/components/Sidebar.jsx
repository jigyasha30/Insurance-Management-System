import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaFileContract,
  FaClipboardCheck,
  FaMoneyBill,
  FaFileAlt,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";


function Sidebar({ open }) {


  const navigate = useNavigate();


  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />
    },

    {
      name: "Customers",
      path: "/customers",
      icon: <FaUsers />
    },

    {
      name: "Policies",
      path: "/policies",
      icon: <FaFileContract />
    },

    {
      name: "Claims",
      path: "/claims",
      icon: <FaClipboardCheck />
    },

    {
      name: "Payments",
      path: "/payments",
      icon: <FaMoneyBill />
    },

    {
      name: "Documents",
      path: "/documents",
      icon: <FaFileAlt />
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />
    }

  ];



  const logoutHandler = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };



  return (

    <aside className={`sidebar ${open ? "active" : ""}`}>


      <div className="sidebar-logo">

        <h2>
          Insurance Management System
        </h2>

        <p>
          Insurance Management System
        </p>

      </div>



      <ul>


        {
          menuItems.map((item, index) => (

            <li key={index}>

              <NavLink
                to={item.path}
                className={({isActive}) =>
                  isActive ? "active-link" : ""
                }
              >

                <span className="icon">

                  {item.icon}

                </span>


                <span>

                  {item.name}

                </span>


              </NavLink>


            </li>

          ))
        }



        <li>

          <button
            className="sidebar-logout"
            onClick={logoutHandler}
          >

            <FaSignOutAlt />

            Logout

          </button>

        </li>


      </ul>


    </aside>

  );

}


export default Sidebar;