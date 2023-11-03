const http = require("http");
const getUsers = require("./modules/users");
require("dotenv").config();
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  if (request.url === "/?users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "ContentType: application/json";
    response.write(getUsers());
    response.end();

    return;
  }

  if (request.url === "/?hello" && !Boolean(url.searchParams.get("hello"))) {
    response.statusCode = 400;
    response.statusMessage = "Bad Request";
    response.header = "ContentType: text/plain";
    response.write(`Enter a name`);
    response.end();

    return;
  }
  if ( Boolean(url.searchParams.get("hello"))) {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "ContentType: text/plain";
    response.write(`Hello, ${url.searchParams.get("hello")}!`);
    response.end();

    return;
  }
  response.statusCode = 500;
  response.statusMessage = "Internal Server Error";
  response.end();

  return;
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Сервер запушен по адресу http://127.0.0.1:${process.env.SERVER_PORT}`
  );
});
