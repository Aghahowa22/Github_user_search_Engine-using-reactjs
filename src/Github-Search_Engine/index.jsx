import { useCallback, useEffect, useState } from "react";
import User from "./user";

const GithubProfileFinder = () => {
  const [userName, setUserName] = useState("Aghahowa22");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGithubUserData = useCallback(
    async (usernameToFetch, shouldClearInput = true) => {
      const normalizedUser = usernameToFetch?.trim();

      if (!normalizedUser) {
        setError("Please enter a username.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://api.github.com/users/${normalizedUser}`,
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "GitHub user not found.");
        }

        setUserData(data);
        if (shouldClearInput) {
          setUserName("");
        }
      } catch (err) {
        setUserData(null);
        setError(err.message || "Unable to fetch GitHub user data.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleSubmit = () => {
    if (userName.trim() === "") {
      setError("Please enter a username.");
      return;
    }

    fetchGithubUserData(userName);
  };

  useEffect(() => {
    fetchGithubUserData("Aghahowa22", false);
  }, [fetchGithubUserData]);

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
          required
        />
        <button onClick={handleSubmit}>Search</button>
      </div>

      {error ? <p className="error-message">{error}</p> : null}
      {userData ? <User userBio={userData} /> : null}
    </div>
  );
};

export default GithubProfileFinder;
