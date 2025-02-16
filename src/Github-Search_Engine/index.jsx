import React, { useEffect, useState } from "react";
import User from "./user";

const GithubProfileFinder = () => {
    // for the input value
  const [userName, setUserName] = useState("Aghahowa22");
  //   for the api link
  const [userData, setUserData] = useState(null);

   //   for loading the api
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    fetchGithubUserData();
  };

  async function fetchGithubUserData() {
    setLoading(true);
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();
    console.log(data);
    if (data) {
      setUserData(data);
      setLoading(false);
      setUserName("");
    }
  }

  useEffect(() => {
    fetchGithubUserData();
  }, []);

  if (loading) {
    return <h3>Loading data please wait...</h3>;
  }

  return (
    <div className="github-profile-container">
        <h1>Github Users Search Engine.</h1>
        <p>Search all users on Github</p>
        
      <div className="input-wrapper">
        <input
          name="search-by-username"
          type="text"
          placeholder="Enter Username..."
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>

      {userData !== null ? <User userBio={userData} /> : null}
    </div>
  );
};

export default GithubProfileFinder;
