var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('nickListItem', function(myNick){
    io.emit('nickListItem', myNick);
  })
  socket.on('direct message', function(msg){
    io.emit('direct message with' + ' ' + msg._nick, msg);
  });
  socket.on('channel message', function(msg){
    io.emit('channel message', msg);
  });
});

http.listen(3003, function(){
  console.log('listening on *:3003');
});
