const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
  // Cleanup interval reference
  let interval;
  // Create websocket server
  const socketServer = new WebSocketServer({ noServer: true });

  // Handle upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    socketServer.handleUpgrade(request, socket, head, (socket) => {
      socketServer.emit('connection', socket, request);
    });
  });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    // Forward messages to everyone except the sender
    socket.on('message', function message(data) {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  interval = setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);

  // Cleanup on server close
  httpServer.on('close', () => {
    clearInterval(interval);
    socketServer.clients.forEach(client => client.terminate());
    socketServer.close();
  });

  return socketServer;
}

module.exports = { peerProxy };
