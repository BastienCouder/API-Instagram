import { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import UidContext from "../../Services/AppContext";

const UsersInfosPFF = ({ userData, userPosts }) => {
  const uid = useContext(UidContext);

  if (!userData || !userPosts) {
    return <div className="text-white p-2">Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-evenly items-center py-2 sm:flex-row sm:me-4">
        <p className="font-bold  sm:me-2">
          {" "}
          {userPosts ? userPosts.length : ""}
        </p>
        <p className="lowercase">
          Post
          {userPosts && userPosts.length < 1 ? "" : "s"}
        </p>
      </div>

      {uid ? (
        <Link
          to={`/profil/followers/${userData?._id}`}
          className="flex flex-col justify-evenly items-center py-2 sm:flex-row sm:me-4"
        >
          {" "}
          <p className="font-bold sm:me-2">
            {userData.followers ? userData.followers.length : ""}
          </p>
          <p className="lowercase">
            Follower
            {userData.followers && userData.followers.length < 1 ? "" : "s"}
          </p>
        </Link>
      ) : (
        <Link
          to={`/profil`}
          className="flex flex-col justify-evenly items-center py-2 sm:flex-row sm:me-4"
        >
          <p className="font-bold sm:me-2">
            {userData.followers ? userData.followers.length : ""}
          </p>
          <p className="lowercase">
            Follower
            {userData.followers && userData.followers.length < 1 ? "" : "s"}
          </p>
        </Link>
      )}
      {uid ? (
        <Link
          to={`/profil/following/${userData?._id}`}
          className="flex flex-col justify-evenly items-center py-2 sm:flex-row sm:me-4"
        >
          <p className="font-bold sm:me-2">
            {userData.following ? userData.following.length : ""}
          </p>
          <p className="lowercase">
            Suivi
            {userData.following && userData.following.length < 1 ? "" : "s"}
          </p>
        </Link>
      ) : (
        <Link
          to={`/profil`}
          className="flex flex-col justify-evenly items-center py-2 sm:flex-row sm:me-4"
        >
          <p className="font-bold sm:me-2">
            {userData.following ? userData.following.length : ""}
          </p>
          <p className="lowercase">
            Suivi
            {userData.following && userData.following.length < 1 ? "" : "s"}
          </p>
        </Link>
      )}
    </>
  );
};

UsersInfosPFF.propTypes = {
  userData: PropTypes.object,
  userPosts: PropTypes.array,
  length: PropTypes.number,
};

export default UsersInfosPFF;
