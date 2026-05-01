const message = require("../models/Messages");


// object for the online users 
const onlineUsers = {};




const socketHandler = (io) => {


   io.on("connection", (socket) => {

      onlineUsers[socket.userId] = socket.id;

      console.log("User connected");

      // now sending the messages

      socket.on("send messages", async ({ recieverid, messages }) => {

         //checking whether it is online or not 
         const recieversoketid = onlineUsers[recieverid];

         // store the message in database
         const newmessage = await message.create({
            sender: socket.userId,
            recieverid,
            text: message
         })



         // if user online then send message
         if (recieversoketid) {
            io.to(recieversoketid).emit("recieve message", {
               senderid: socket.userId,
               message

            });

         }

      })


      // disconnecting the user
      socket.on("disconnect", () => {
         delete onlineUsers[socket.userId];
      });

   });





};

module.exports = socketHandler;