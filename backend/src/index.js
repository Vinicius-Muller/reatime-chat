const Service = require("./ws/index.js");

const wss = new Service();
wss.setWs();
wss.connection();