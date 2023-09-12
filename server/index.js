const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "mysql_db", // the host name MYSQL_DATABASE: node_mysql
  user: "MYSQL_USER", // database user MYSQL_USER: MYSQL_USER
  password: "MYSQL_PASSWORD", // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: "books", // database name MYSQL_HOST_IP: mysql_db
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.get("/test", (req, res) => {
  res.send(`Backend Alive! ${new Date().toLocaleTimeString()}`);
});

//get all of the books in the database
app.get("/get", (req, res) => {
  const SelectQuery = " SELECT * FROM books_reviews";
  db.query(SelectQuery, (err, result) => {
    res.send(result);
  });
});

// add a book to the database
app.post("/insert", (req, res) => {
  const bookName = req.body.name;
  const bookReview = req.body.review;
  const InsertQuery =
    "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
  db.query(InsertQuery, [bookName, bookReview], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(result);
  });
});

app.listen("3001", () => {});
