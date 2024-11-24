
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
// var messages = []
module.exports.ids = ids
io.on('connection', (socket) => {
  socket.on("sendID", (data) => {
    ids.push(data.text)
    console.log("Message from client:", ids); 
    io.emit('displayUserIds', ids); //send ids back to client for display
    //io.to(ids[0]).emit('private', 'your secret code is');

  });

  var idtouse = "default"
  socket.on("getID", (data) => {
    idtouse = data.text
    //console.log("ITS COMING HERE")
    // io.to(impID).emit('private', data.text);
  });
  
  socket.on("sendMessage", (data) => { //send message from server to client 
    // console.log(idtouse + "HEREEEE")
    io.to(idtouse).emit('private', data.text) //send message back to client;
  });
  
  socket.userData = { email: null };
  
  socket.on("sendEmail", (data) => { //receive email from client  
    console.log("Hello from SendEmail")
    console.log(data.text)
    socket.userData.email = data.text;


  });

  socket.on("getCustomData", () => {
    console.log("UserData requested by client:", socket.userData);
    socket.emit("customDataResponse", socket.userData);
  });





});






const PORT = process.env.PORT || 3001
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


