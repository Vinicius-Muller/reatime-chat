const { WebSocketServer } = require("ws");

module.exports = function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).send("WebSocket server is ready!");
  }

  if (!global.wsServer) {
    const wsServer = new WebSocketServer({ noServer: true });
    global.wsServer = wsServer;
  }

  res.socket.server.on("upgrade", (request, socket, head) => {
    global.wsServer.handleUpgrade(request, socket, head, (ws) => {
      global.wsServer.emit("connection", ws, request);
    });
  });
};
