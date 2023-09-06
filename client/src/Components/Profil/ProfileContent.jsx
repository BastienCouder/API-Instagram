import UsersInfosPFF from "./UsersInfosPFF";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileContent = ({
  uid,
  item,
  userPosts,
  followButton,
  messageLink,
  imageRefs,
}) => {
  return (
    <>
      {item && (
        <>
          <section className="flex w-full h-40 sm:h-44">
            <div className="w-2/5 sm:1/2 flex justify-center items-center ">
              <img
                className="p-2 h-28 object-cover w-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36  rounded-full border border-white border-2"
                src={`/${item.picture}`}
                alt=""
              />
            </div>
            <div className="w-3/5 flex flex-col justify-around py-6 px-5 sm:1/2">
              <h1 className="font-bold text-2xl">
                {item.pseudo ? item.pseudo : "loading"}
              </h1>
              <div className="hidden sm:flex flex-row w-full h-16 pe-7 text-sm">
                <UsersInfosPFF userData={item} userPosts={userPosts} />
              </div>
              <div className="flex">
                {uid ? (
                  <button className="w-40 cursor-pointer py-2 px-4 bg-blackHover rounded-md">
                    <Link to="/profil/edit">Modifier le profil</Link>
                  </button>
                ) : (
                  <>
                    {followButton}
                    {messageLink}
                  </>
                )}
              </div>
            </div>
          </section>
          <div className="flex flex-col w-3/4 h-auto pb-4 px-4">
            <p className="font-regular text-md w-full  sm:w-5/6 md:line-clamp-3 pe-5 ">
              {item.bio && item.bio}
            </p>
          </div>
          <hr className="w-screen border-grey absolute left-0  sm:relative sm:w-full sm:ms-4" />
          <div className="relative sm:hidden flex flex-row justify-between w-full h-20 py-4 px-10">
            <hr className="w-screen border-grey absolute left-0 top-0  sm:relative sm:w-full sm:ms-4" />
            <UsersInfosPFF userData={item} userPosts={userPosts} />
            <hr className="w-screen border-grey absolute left-0 bottom-0 sm:hidden" />
          </div>

          {imageRefs && (
            <div className="overflow-y-auto sm:h-[30rem] ">
              <div className="grid grid-cols-3 gap-1 sm:m-4 sm:gap-2">
                {userPosts &&
                  userPosts.map((post, index) => (
                    <div
                      key={post._id}
                      ref={(element) => (imageRefs.current[index] = element)}
                      className="aspect-w-1 aspect-h-1 overflow-hidden"
                    >
                      <Link to={`/post/${item._id}/${post._id}`}>
                        <img
                          className="max-w-full w-full aspect-square object-cover"
                          src={`/${post.picture}`}
                          alt={`Post ${post._id}`}
                        />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

ProfileContent.propTypes = {
  uid: PropTypes.string,
  item: PropTypes.object,
  userPosts: PropTypes.array.isRequired,
  followButton: PropTypes.element.isRequired,
  messageLink: PropTypes.element.isRequired,
  imageRefs: PropTypes.object.isRequired,
};

export default ProfileContent;
