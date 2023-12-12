import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
const Home = ({ user, setUser,sessions }) => {
  const [username, setUsername] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
       localStorage.setItem("userName", username);
      setUser(localStorage.getItem("userName"));

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3001/api/users",
        { username },
        config
      );

      sessionStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.log(error);
     
    }
  };

  return (
    <div>
      {(!localStorage.getItem("userName")) ? (
        <div className="user-form">
          <form>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              onClick={(e) => {
                submitHandler(e);
              }}
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <Dashboard sessions={sessions}/>
      )}
    </div>
  );
};

export default Home;
