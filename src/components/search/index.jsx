import { useEffect, useState } from "react";
import User from "./user";
import "./index.css";

export default function GitHubProfileFinder() {
  const [userName, setUserName] = useState();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {
    setLoading(true);
    async function fetchGithubUserData() {
      try {
        const res = await fetch(`https://api.github.com/users/${userName}`);
        const data = await res.json();
        if (data) {
          setUserData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching GitHub user data:", error);
        setLoading(false);
      }
    }

    if (userName) {
      fetchGithubUserData();
    } else {
      setLoading(false);
    }
  }, [userName]); 

  function handleSubmit() {
    setLoading(true);
  }

  return (
    <div className="github-prfile-finder">
      <div className="input-wrapper">
        <input
          name="search-by-username"
          type="text"
          placeholder="search github"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        ></input>
        <button onClick={handleSubmit}>search</button>
      </div>
      {loading ? <h1>Loading data! Please wait...</h1> : null}

      {userData !== null ? <User user={userData}></User> : null}
    </div>
  );
}
