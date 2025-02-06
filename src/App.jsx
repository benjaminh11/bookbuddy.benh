import React, { useEffect, useState } from "react";
import bookLogo from "./assets/books.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Navigations from "./components/Navigations";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    console.log("effect running...");
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  return (
    <>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
      <Router>
        <Navigations token={token} setToken={setToken} />
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<SingleBook />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/" element={<Books />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
