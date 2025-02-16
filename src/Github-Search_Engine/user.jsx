import React from "react";

const User = ({ userBio }) => {
  const {
    avatar_url,
    followers,
    following,
    public_repos,
    name,
    login,
    created_at,
  } = userBio;

  const createdDate = new Date(created_at);

  return (
    <div className="user">
      <div>
        <img src={avatar_url} className="avatar" alt="user" />
      </div>

      <div>
        <a href={`https://github.com/${login}`}>{name || login}</a>
        <p>
          User Joined on {""}
          {`${createdDate.getDate()} ${createdDate.toLocaleString("en-us", {
            month: "short",
          })} ${createdDate.getFullYear()}`}{" "}
          {""}
        </p>
      </div>
      <div>
        <h4>Public Repos</h4>
        <p>{public_repos}</p>
      </div>
      <div>
        <h4>Followers</h4>
        <p>{followers}</p>
      </div>
      <div>
        <h4>Following</h4>
        <p>{following}</p>
      </div>
    </div>
  );
};

export default User;
