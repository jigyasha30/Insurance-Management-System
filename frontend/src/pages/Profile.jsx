import { useEffect, useState } from "react";
import API from "../services/api";
import "./Profile.css";

function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: ""
  });

  const [editMode, setEditMode] = useState(false);


  const fetchProfile = async () => {

    try {

      const res = await API.get("/auth/profile");

      setUser(res.data.user);

    } catch (error) {

      console.log("Profile Error:", error);

    }

  };


  useEffect(() => {
    fetchProfile();
  }, []);



  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };



  const handleUpdate = async () => {

    try {

      const res = await API.put(
        "/auth/profile",
        {
          name: user.name,
          email: user.email
        }
      );


      setUser(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );


      setEditMode(false);

      alert("Profile Updated Successfully");


    } catch (error) {

      console.log("Update Error:", error);

      alert("Profile Update Failed");

    }

  };



  return (

    <div className="profile-container">

      <h1>My Profile</h1>


      <div className="profile-card">


        <div className="profile-info">

          <label>Full Name</label>

          <input
            type="text"
            name="name"
            value={user.name}
            readOnly={!editMode}
            onChange={handleChange}
          />

        </div>



        <div className="profile-info">

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={user.email}
            readOnly={!editMode}
            onChange={handleChange}
          />

        </div>



        <div className="profile-info">

          <label>Role</label>

          <input
            type="text"
            value={user.role}
            readOnly
          />

        </div>



        {
          editMode ? (

            <button
              className="edit-profile-btn"
              onClick={handleUpdate}
            >
              Save Profile
            </button>


          ) : (

            <button
              className="edit-profile-btn"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>

          )
        }


      </div>


    </div>

  );

}

export default Profile;