const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;
const DB = {
  books: [
    {
      id: 1,
      name: "game",
      price: 111,
    },
    {
      id: 2,
      name: "game",
      price: 151,
    },
  ],
  users: [],
};
const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("your path is /");
    return;
  } else if (req.url === "/api/books" || req.url === "/api/books/") {
    res.statusCode = 200;
    if (req.method === "GET") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(DB["books"]));

      return;
    } else if (req.method === "POST") {
      const buffers = [];

      for await (chunk of req) {
        buffers.push(chunk);
      }

      const dataString = Buffer.concat(buffers).toString();
      const data = JSON.parse(dataString);

      const books = addToDataBase("books", {
        name: data.name,
        price: data.price,
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          id: books.id,
        })
      );

      return;
    }
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end(`Error ${res.statusCode}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function addToDataBase(tableName, data) {
  const dataBase = DB[tableName];
  data.id = dataBase.length + 1;
  dataBase.push(data);

  return data;
}
