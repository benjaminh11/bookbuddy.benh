import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../index.css";

function SingleBook() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`
        );
        const data = await response.json();

        if (response.ok) {
          setBook(data.book);
          setLoading(false);
        } else {
          setError(data.message || "Failed to fetch book.");
          setLoading(false);
        }
      } catch (error) {
        setError("Error fetching the book data.");
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="single-book-container">
      <h1>{book.title}</h1>
      <img src={book.coverimage} alt={book.title} className="book-cover" />
      <h3>Author: {book.author}</h3>
      <p>{book.description}</p>
    </div>
  );
}

export default SingleBook;
