const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Contadores para los votos
let votosOpcion1 = 0;
let votosOpcion2 = 0;
let totalVotos = 0;

app.use(express.static('public'));

// Al establecer una conexión de Socket.io
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Envía los datos iniciales al cliente que acaba de conectarse
  socket.emit('updateVotes', {
    votosOpcion1,
    votosOpcion2,
    totalVotos
  });

  // Escucha eventos de votación del cliente
  socket.on('vote', (data) => {
    if (data.option === 'option1') {
      votosOpcion1++;
    } else if (data.option === 'option2') {
      votosOpcion2++;
    }
    totalVotos++;

    // Envía los datos actualizados a todos los clientes conectados
    io.emit('updateVotes', {
      votosOpcion1,
      votosOpcion2,
      totalVotos
    });
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
