
const express = require('express');
const app = express();
const server = require('http').Server(app);
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
const io = require('socket.io')(server, {
cors: {
    origin: "*",
    methods: ["GET", "POST"],
    },
});
var ids = []
module.exports.ids = ids
io.on('connection', (socket) => {

  socket.userData = { email: null, id: null };

  socket.on("sendID", (data) => {
    ids.push(data.text)
    io.emit('displayUserIds', ids); //send ids back to client for display

  });

  var idtouse = "default"
  socket.on("getID", (data) => {
    socket.userData.id = data.text
    console.log(socket.userData.id)
    idtouse = data.text
  });
  socket.on("sendMessage", (data) => { //send message from server to client 
    io.to(idtouse).emit('private', data) //send message back to client;
  });
  socket.on("sendEmail", (data) => { //receive email from client  
    console.log("First")
    socket.userData.email = data.text;
    console.log(socket.userData.email)
    socket.emit("sendEmailToClient", { text: socket.userData.email })
  });

  socket.on("getCustomData", () => {
    socket.emit("customDataResponse", socket.userData.email);
  });





});






const PORT = process.env.PORT || 3001
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));