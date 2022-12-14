const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;
const DB = {
  courses: [],
  books: [],
  users: [],
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    console.log("in /");

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("hello world");

    return;
  } else if (req.url === "/api/courses" || req.url === "/api/courses/") {
    if (req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(DB["courses"]));

      return;
    } else if (req.method === "POST") {
      const buffers = [];

      for await (const chunk of req) {
        buffers.push(chunk);
      }

      const dataString = Buffer.concat(buffers).toString();
      const data = JSON.parse(dataString); // name, description, hours, price

      const course = saveToDatabase("courses", {
        name: data.name,
        description: data.description,
        hours: data.hours,
        price: data.price,
        isPublic: 0,
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      res.end(
        JSON.stringify({
          id: course.id,
        })
      );

      return;
    }
  } else if (req.url === "/api/books" || req.url === "/api/books/") {
    if (req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(DB["books"]));

      return;
    } else if (req.method === "POST") {
      const buffers = [];

      for await (const chunk of req) {
        buffers.push(chunk);
      }

      const dataString = Buffer.concat(buffers).toString();
      const data = JSON.parse(dataString); // name, description, hours, price

      const book = saveToDatabase("books", {
        name: data.name,
        description: data.description,
        type: data.type,
        price: data.price,
        isPublic: 0,
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      res.end(
        JSON.stringify({
          id: book.id,
        })
      );

      return;
    }
  } else if (req.url === "/api/users" || req.url === "/api/users/") {
    if (req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(DB["users"]));

      return;
    } else if (req.method === "POST") {
      const buffers = [];

      for await (const chunk of req) {
        buffers.push(chunk);
      }

      const dataString = Buffer.concat(buffers).toString();
      const data = JSON.parse(dataString); // name, description, hours, price

      const user = saveToDatabase("users", {
        name: data.name,
        lname: data.lname,
        role: data.role,
        password: data.password,
        isPublic: 0,
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      res.end(
        JSON.stringify({
          id: user.id,
        })
      );

      return;
    }
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("not found");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function saveToDatabase(table, data) {
  const db = DB[table];
  data.id = db.length + 1;
  db.push(data);

  return data;
}
