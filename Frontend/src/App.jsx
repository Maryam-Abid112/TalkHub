import { useState ,useEffect,useRef} from "react";
import { io } from "socket.io-client";





function App() {

   const [search,setsearch]=useState("");
  
  
   const searching= async(req,res)=>{
      

   }
  
  
    return (
      <>
       <div >
        <input type="text"  />
        <button>search</button>
       </div>
      </>
    );
 
}

export default App;