import React, { useState } from "react";
import axios from "axios"; 
import "./signup.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    try{
      const  res=await axios.post("http://localhost:5001/api/Users/login",{
        email:email,
        password:password
      });
      // saves the token to localstorage for further use
      localStorage.setItem("Token",JSON.stringify(res.data.token));
      console.log("response",res.data);

    }catch(error){
        console.log("error log in ", error);

    }
    

  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="heading">Sign In</h2>

        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};


export default SignIn;