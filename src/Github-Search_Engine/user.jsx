import PropTypes from "prop-types";

const User = ({ userBio }) => {
  if (!userBio || !userBio.login) {
    return null;
  }

  const {
    avatar_url,
    followers,
    following,
    public_repos,
    name,
    login,
    created_at,
  } = userBio;

  const createdDate = created_at ? new Date(created_at) : null;

  return (
    <div className="user">
      <div>
        <img src={avatar_url} className="avatar" alt="user" />
      </div>

      <div>
        <a href={`https://github.com/${login}`}>{name || login}</a>
        <p>
          {createdDate &&
          createdDate instanceof Date &&
          !Number.isNaN(createdDate)
            ? `User Joined on ${createdDate.getDate()} ${createdDate.toLocaleString(
                "en-us",
                {
                  month: "short",
                },
              )} ${createdDate.getFullYear()}`
            : "User joined date unavailable"}
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

User.propTypes = {
  userBio: PropTypes.shape({
    avatar_url: PropTypes.string,
    followers: PropTypes.number,
    following: PropTypes.number,
    public_repos: PropTypes.number,
    name: PropTypes.string,
    login: PropTypes.string.isRequired,
    created_at: PropTypes.string,
  }).isRequired,
};

export default User;
