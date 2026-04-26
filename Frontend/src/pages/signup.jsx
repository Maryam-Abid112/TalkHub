import React, { useState } from "react";
import axios from "axios";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setname]=useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    try{
      const  res=await axios.post("http://localhost:5001/api/Users/register",{
        name:name ,
        email:email,
        password:password
      });
    
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
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />


        <input
          className="input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input"
          type="password"
          placeholder="Enter Password"
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