// object for the online users 
const onlineUsers = {};


const socketHandler = (io) => {


   io.on("connection", (socket) => {

      onlineUsers[socket.userId] = socket.id;

      console.log("User connected");
 

 // disconnecting the user
      socket.on("disconnect", () => {
         delete onlineUsers[socket.userId];
      });

   });

};

module.exports = socketHandler;