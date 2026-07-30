import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import "./Layout.css";


function Layout() {


const [sidebarOpen, setSidebarOpen] = useState(false);



return (

<div className="admin-layout">


<Sidebar open={sidebarOpen}/>



<div className="main-section">


<Navbar 
toggleSidebar={() => 
setSidebarOpen(!sidebarOpen)
}
/>



<main className="main-content">

<Outlet />

</main>


</div>


</div>

);

}


export default Layout;