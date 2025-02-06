import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../index.css";

function SingleBook() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

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

  const checkoutBook = async () => {
    if (!token) {
      setMessage("You must be logged in to check out a book.");
      return;
    }

    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ available: false }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Book successfully checked out!");
        setBook((prevBook) => ({ ...prevBook, available: false }));
      } else {
        setMessage(data.message || "Failed to check out book.");
      }
    } catch (error) {
      setMessage("Error checking out the book.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="single-book-container">
      <h1>{book.title}</h1>
      <img src={book.coverimage} alt={book.title} className="book-cover" />
      <h3>Author: {book.author}</h3>
      <p>{book.description}</p>
      {message && <p className="checkout-message">{message}</p>}
      {token && book.available && (
        <button onClick={checkoutBook} className="checkout-button">
          Check Out
        </button>
      )}
    </div>
  );
}

export default SingleBook;
