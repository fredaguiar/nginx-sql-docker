import { useState, Fragment } from "react";
import "./App.css";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";

const App = () => {
  const [book, setBook] = useState("");
  const [review, setReview] = useState("");
  const [allBooks, setAllBooks] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/insert", { name: book, review: review })
      .then(() => {
        alert("success post");
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      });
  };

  const test = (event) => {
    axios
      .get("/api/test")
      .then((response) => {
        alert(response.data);
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      });
  };

  const getBooks = (event) => {
    axios
      .get("/api/get")
      .then((response) => {
        setAllBooks(response.data);
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      });
  };

  return (
    <div className="App">
      <h1>Dockerized Fullstack React Application</h1>
      <input type="button" value="Test Backend" onClick={test} />
      <form onSubmit={handleSubmit}>
        <div className="form">
          <input
            type="text"
            value={book}
            onChange={(e) => setBook(e.target.value)}
          />
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <input type="submit" />
        <Container>
          <Row>
            <Col>
              <input type="button" value="Get all books" onClick={getBooks} />
            </Col>
          </Row>
          {allBooks &&
            allBooks.map((val) => (
              <Row>
                <Col>{val.book_name}</Col>
              </Row>
            ))}
        </Container>
      </form>
    </div>
  );
};

export default App;
