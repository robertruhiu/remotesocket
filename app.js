let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('Hello World jbjsjs!')
})


io.on("connection", socket => {

    socket.emit('connections', Object.keys(io.sockets.connected).length);

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data));
    });
    socket.on('project-data', (data) => {
        socket.broadcast.emit('project-data', (data));
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data));
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });

    socket.on('joined', (data) => {
        socket.broadcast.emit('joined', (data));
    });
    socket.on('joined_meeting', (data) => {
        socket.broadcast.emit('joined_meeting', (data));

    });

    socket.on('leave', (data) => {
        socket.broadcast.emit('leave', (data));
    });
});

http.listen(3000, () => {
  console.log('Listening on port *: 3000');
});
