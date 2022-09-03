const express = require("express");
const app = express();

const hostname = "127.0.0.1";
const port = 3000;
const DB = {
  courses: [],
  books: [],
  users: [],
};

app.use(express.json());

app.get("/", (req, res) => {
  res.end("hello world");
});

app.get("/api/courses", (req, res) => {
  res.end(JSON.stringify(DB["courses"]));
});

app.post("/api/courses", (req, res) => {
  const data = req.body;
  const course = saveToDatabase("courses", {
    name: data.name,
    description: data.description,
    hours: data.hours,
    price: data.price,
    isPublic: 0,
  });
  res.end(
    JSON.stringify({
      id: course.id,
    })
  );
});

app.get("/api/books", (req, res) => {
  res.end(JSON.stringify(DB["books"]));
});

app.post("/api/books", (req, res) => {
  const data = req.body;
  const book = saveToDatabase("books", {
    name: data.name,
    price: data.price,
    isPublic: 0,
  });
  res.end(
    JSON.stringify({
      id: book.id,
    })
  );
});

app.get("/api/users", (req, res) => {
  res.end(JSON.stringify(DB["users"]));
});

app.post("/api/users", (req, res) => {
  const data = req.body;
  const user = saveToDatabase("users", {
    name: data.name,
    password: data.password,
    email: data.email,
    isAdmin: 0,
  });
  res.end(
    JSON.stringify({
      id: user.id,
    })
  );
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function saveToDatabase(table, data) {
  const db = DB[table];
  data.id = db.length + 1;
  db.push(data);

  return data;
}
