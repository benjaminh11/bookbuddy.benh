/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React, { useEffect, useState } from "react";
import "../index.css";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setBooks(json.books);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Book List</h1>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={book.coverimage}
              alt={book.title}
              className="book-image"
            />
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
