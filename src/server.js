import http from "http";

const processID = process.pid;

const server = http.createServer((request, response) => {
  for (let index = 0; index < 1e7; index++);

  response.end(`Handled by pid: ${processID}`);
});

server.listen(3333).once("listening", () => {
  console.log("Server started in process ", processID);
});

process.on("SIGTERM", () => {
  console.log("Server ending", new Date().toISOString());
  server.close(() => process.exit());
});

// Simular que um erro aleatorio ocorreu
setTimeout(() => {
  process.exit(1);
}, Math.random() * 1e4);
