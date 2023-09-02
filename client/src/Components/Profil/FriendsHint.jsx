import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiUrl, isEmpty } from "../../Utils/Utils";
import FollowHandler from "./FollowHandler";
import PropTypes from "prop-types";

const FriendsHint = ({ type }) => {
  const usersData = useSelector((state) => state.Allusers);
  const userData = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);

  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      usersData?.forEach((user) => {
        if (
          user._id !== userData._id &&
          !user.followers.includes(userData._id)
        ) {
          array.push(user._id);
        }
      });
      array.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 4;
      } else if (window.innerHeight > 615) {
        array.length = 3;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else {
        array.length = 0;
      }

      setFriendsHint(array);
    };

    if (playOnce && !isEmpty(usersData) && !isEmpty(userData?._id)) {
      notFriendList();
      setLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  if (friendsHint.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">loading</div>
      ) : (
        <ul className="flex flex-col w-96 mt-4 border border-grey border-px p-4 rounded-lg">
          {friendsHint.map((user) => {
            const userData = usersData.find((item) => item._id === user);

            if (userData) {
              return (
                <li
                  className="w-full flex items-center justify-between my-2"
                  key={user}
                >
                  <div className="flex items-center">
                    {type === "home" && (
                      <img
                        className="h-16 w-16 object-cover rounded-full"
                        src={`${apiUrl}/${userData.picture}`}
                        alt="user-pic"
                      />
                    )}
                    {type === "userprofil" && (
                      <img
                        className="h-16 w-16 object-cover rounded-full"
                        src={`${apiUrl}/${userData.picture}`}
                        alt="user-pic"
                      />
                    )}
                    {type === "message" && (
                      <img
                        className="h-16 w-16 object-cover rounded-full"
                        src={`${apiUrl}/${userData.picture}`}
                        alt="user-pic"
                      />
                    )}

                    <p className="ms-6">{userData.pseudo}</p>
                  </div>
                  <FollowHandler
                    idToFollow={userData._id}
                    type={"suggestion"}
                  />
                </li>
              );
            }

            return null;
          })}
        </ul>
      )}
    </div>
  );
};

FriendsHint.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FriendsHint;
