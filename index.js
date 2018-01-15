var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
   console.log('user disconnected')
  });
  
  socket.on('change color', (color) => {
    io.sockets.emit('change color', color)
  })
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});
