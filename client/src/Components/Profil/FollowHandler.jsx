import { useEffect, useState } from "react";
import { isEmpty } from "../../Utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { UnFollowUser, followUser } from "../../Store/actions/user.actions";
import { getUsers } from "../../Store/actions/users.actions";
import PropTypes from "prop-types";

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.user);
  const [isFollowed, setFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setFollowed(true);
  };

  const handleUnFollow = () => {
    dispatch(UnFollowUser(userData._id, idToFollow));
    setFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData?.following)) {
      if (userData?.following?.includes(idToFollow)) {
        setFollowed(true);
        dispatch(getUsers());
      } else {
        setFollowed(false);
        dispatch(getUsers());
      }
    }
  }, [userData, idToFollow, dispatch]);

  return (
    <>
      {isFollowed && userData && (
        <span onClick={handleUnFollow}>
          {type === "following" && (
            <button className="cursor-pointer ">abonné</button>
          )}
          {type === "profil" && (
            <button className="cursor-pointer text-start cursor-pointer py-2 px-4 pe-10 me-4  bg-blackHover rounded-md">
              abonné
            </button>
          )}
          {type === "search" && (
            <button className="cursor-pointer">abonné</button>
          )}
          {type === "suggestion" && (
            <button className="cursor-pointer text-start cursor-pointer py-2 px-4 me-8 bg-blackHover rounded-md">
              abonné
            </button>
          )}
        </span>
      )}{" "}
      {isFollowed === false && userData && (
        <span onClick={handleFollow}>
          {type === "following" && (
            <button className="cursor-pointer">suivre</button>
          )}
          {type === "profil" && (
            <button className="cursor-pointer text-start cursor-pointer py-2 px-4 pe-10 me-4 bg-blackHover rounded-md">
              suivre
            </button>
          )}
          {type === "search" && (
            <button className="cursor-pointer">suivre</button>
          )}
          {type === "suggestion" && (
            <button className="cursor-pointer text-start cursor-pointer py-2 px-4 me-8  bg-blackHover rounded-md">
              suivre
            </button>
          )}
        </span>
      )}
    </>
  );
};

FollowHandler.propTypes = {
  idToFollow: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default FollowHandler;
