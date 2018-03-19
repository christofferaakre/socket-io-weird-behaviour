const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html')));

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('chat message', message => socket.broadcast.emit('chat message', message));
});

server.listen(PORT, () => console.log('Listening on port ', PORT));
