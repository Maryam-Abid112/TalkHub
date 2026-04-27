import { useState ,useEffect,useRef} from "react";
import { io } from "socket.io-client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignIn from "./pages/Signin"
import SignUp from  "./pages/signup"
import Home from "./pages/Home"
import Dash from  "./pages/Dashboard"



function App() {
    return (
         <BrowserRouter>
     <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<SignIn />} />
           <Route path="/signup" element={<SignUp />} />
           <Route path="/Dashboard" element={<Dash />} />
         </Routes>
         </BrowserRouter>
    );
 
}

export default App;