import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setError("You must be logged in to view your account.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setUser(data);
        } else {
          setError(data.message || "Failed to fetch account details.");
        }
      } catch (error) {
        setError("Error fetching account details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleReturn = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to return a book.");
      return;
    }
    console.log(user);

    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Book returned successfully!");
        setUser((prevUser) => ({
          ...prevUser,
          books: prevUser.books.filter((book) => book.id !== bookId),
        }));
      } else {
        alert(`Return failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Return error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="account-container">
      {user ? (
        <div>
          <h2>Account Details</h2>
          <div>
            <p>First Name:</p> {user.firstname}
          </div>
          <div>
            <p>Last Name:</p> {user.lastname}
          </div>
          <div>
            <p>Email:</p> {user.email}
          </div>
          <p>Your Books:</p>
          <ul>
            {user.books.length > 0 ? (
              user.books.map((book) => (
                <li key={book.id}>
                  {book.title}
                  <button onClick={() => handleReturn(book.id)}>Return</button>
                </li>
              ))
            ) : (
              <li>You have not checked out any books.</li>
            )}
          </ul>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2>Please log in to see your account details</h2>
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      )}
    </div>
  );
}

export default Account;
