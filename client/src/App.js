import { useState, Fragment } from "react";
import "./App.css";
import axios from "axios";
import styled from "styled-components";

const Title = styled.h1`
  margin-left: 200px;
  margin-bottom: 20px;
  color: black;
`;

const TestBackend = styled.div`
  margin-left: 200px;
  color: black;
`;

const Spacer50 = styled.div`
  margin-bottom: 50px;
`;

const Row = styled.div`
  display: flex;
  padding: 5px;
  margin-left: 200px;
  width: 310px;
  background-color: #cccccc;
`;

const COL1 = styled.div`
  width: 100px;
  justify-content: flex-start;
`;

const COL2 = styled.div`
  width: 200px;
  justify-content: flex-start;
`;

const RowItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
  margin-left: 200px;
  width: 410px;
  background-color: #cccccc;
  border-bottom: 1px solid black;
`;
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
      <Title>Dockerized Fullstack React Application</Title>
      <TestBackend>
        <input type="button" value="Test Backend" onClick={test} />
      </TestBackend>
      <Spacer50 />
      <form onSubmit={handleSubmit}>
        <Row>
          <COL1>
            <label htmlFor="book">Book tile:</label>
          </COL1>
          <COL2>
            <input
              name="book"
              type="text"
              value={book}
              onChange={(e) => setBook(e.target.value)}
            />
          </COL2>
        </Row>
        <Row>
          <COL1>
            <label htmlFor="review">Review:</label>
          </COL1>
          <COL2>
            <input
              name="review"
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </COL2>
        </Row>
        <Row>
          <COL1></COL1>
          <COL2>
            <input type="submit" />
          </COL2>
        </Row>
        <Spacer50 />

        <RowItems>
          <input
            type="button"
            style={{ width: "150px" }}
            value="Get all books"
            onClick={getBooks}
          />
        </RowItems>

        {allBooks &&
          allBooks.map((val, index) => (
            <RowItems key={index}>
              <div>
                <strong>Title:</strong> {val.book_review}
              </div>
              <div>
                <strong>Review:</strong> {val.book_name}
              </div>
            </RowItems>
          ))}
      </form>
    </div>
  );
};

export default App;
