const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
cors:{
origin:"*"
}
});

io.on("connection",(socket)=>{

console.log("Usuario conectado:",socket.id);

socket.on("join-room",(roomId)=>{

socket.join(roomId);

socket.to(roomId).emit("user-connected",socket.id);

socket.on("offer",(data)=>{
socket.to(roomId).emit("offer",data);
});

socket.on("answer",(data)=>{
socket.to(roomId).emit("answer",data);
});

socket.on("ice-candidate",(data)=>{
socket.to(roomId).emit("ice-candidate",data);
});

});

socket.on("disconnect",()=>{
console.log("Usuario desconectado");
});

});

server.listen(3000,()=>{
console.log("Servidor de videollamada activo en puerto 3000");
});