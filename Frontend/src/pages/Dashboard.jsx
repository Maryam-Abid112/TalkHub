import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


export default function Dash() {
  const navigate = useNavigate();
  // search bar data
  const [search, setsearch] = useState("");
  const [userlist, setuserlist] = useState([]);
  const [username, setusername] = useState("");
  const [userid, setuserid] = useState();
  const searchbar = async (e) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5001/api/Users/getalluser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setuserlist(res.data);
      const foundUser = res.data.find(
        (user) => user.name.toLowerCase() === search.toLowerCase()
      );

      if (foundUser) {
        setusername(foundUser.name);
        setuserid(foundUser._id);
      } else {
        setusername("Not Found");
        setuserid(null);
      }

    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.status == 401) {
        localStorage.removeItem("token");
        navigate("/login");


      }

    }

  }

  return (
    <>
      <div className="Dash">
        <div className="leftside">
          <input type="text"
            placeholder="Search People"
            onChange={(e) => { setsearch(e.target.value) }} />
          <button onClick={searchbar}>Search</button>

        </div>
        <div className="userslist">
          <div className="searchuser" key={userid}>
            <h3>{username}</h3>

          </div>

          <button onClick={() => {
            localStorage.removeItem("Token");
            navigate("/login");
          }}>
            logout
          </button>


        </div>



      </div>


    </>

  );

}