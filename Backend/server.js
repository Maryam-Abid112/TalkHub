const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB= require("./config/db");
const dotenv = require("dotenv");
const userroute=require("./routes/Userroutes");

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// defining routes for the api
app.use("/api/Users",userroute);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});




server.listen(5001, () => {
  console.log("Server running on port 5001");
});