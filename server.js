const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const { ExpressPeerServer } = require("peer");
const PORT = process.env.PORT || "8001";


const peerServer = ExpressPeerServer(server, {
  proxied: true,
  debug: true,
  path: "/myapp",
  ssl: {},
});

app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

server.listen(PORT);
console.log(`Listening on: ${PORT}`);
