import dotenv from "dotenv";
dotenv.config();

const { WebSocketServer } = require("ws");

class Service {
  #ws
  constructor() { }

  setWs() {
    this.#ws = new WebSocketServer({ port: process.env.PORT || 8080 });
  }

  connection() {
    this.#ws.on("connection", (ws) => {
      ws.on("error", console.error);

      ws.on("message", (data) => {
        this.#ws.clients.forEach((client) => client.send(data.toString()));
      });
    });
  }
}

export default Service;