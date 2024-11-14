
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
  socket.on("sendID", (data) => {
    ids.push(data.text)
    console.log("Message from client:", ids); 
    io.emit('displayUserIds', ids); //send ids back to client for display
    //io.to(ids[0]).emit('private', 'your secret code is');

  });

  var idtouse = "default"
  socket.on("getID", (data) => {
    idtouse = data.text
    console.log("ITS COMING HERE")
    // io.to(impID).emit('private', data.text);
  });
  
  socket.on("sendMessage", (data) => {
    console.log(idtouse + "HEREEEE")
    console.log(data.text)
    io.to(idtouse).emit('private', data.text);
  });
  
  



});






const PORT = process.env.PORT || 3001
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


