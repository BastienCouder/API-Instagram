import { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import FollowHandler from "../component/profil/FollowHandler";
import { BsFillSendFill } from "react-icons/bs";
import UidContext from "../Services/AppContext";
import FriendsHint from "../component/Profil/FriendsHint";
import ProfileContent from "../component/Profil/ProfileContent";
import MainLayout from "../Layouts";

const ProfilePage = () => {
  const uid = useContext(UidContext);
  const { userId } = useParams();
  const usersData = useSelector((state) => state.Allusers);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const userData = usersData?.find((user) => user._id === userId);
  const userDataPosts = posts?.filter(
    (post) => post.posterId === userData?._id
  );
  const userPosts = posts?.filter((post) => post.posterId === user?._id);

  const imageRefs = useRef([]);

  const adjustSquareImages = () => {
    imageRefs.current.forEach((img) => {
      if (img && img.clientHeight !== img.clientWidth) {
        img.classList.add("aspect-w-1", "aspect-h-1", "object-cover");
      }
    });
  };

  useEffect(() => {
    adjustSquareImages();
  }, [userPosts]);

  const followButton = uid ? (
    <FollowHandler idToFollow={userData?._id} type={"profil"} />
  ) : null;

  const messageLink = uid ? (
    <Link
      to={`/message/${userData?._id}`}
      className="cursor-pointer py-3 px-4 bg-blackHover rounded-md"
    >
      <BsFillSendFill />
    </Link>
  ) : (
    <Link
      to={"/profil"}
      className="cursor-pointer py-3 px-4 bg-blackHover rounded-md"
    >
      <BsFillSendFill />
    </Link>
  );

  return (
    <MainLayout>
      <section className="flex flex-col sm:flex-row h-screen overflow-y-auto bg-black w-screen text-white">
        <div className="h-auto w-full sm:w-2/3 lg:w-1/2 xl:w-2/5 pt-2 sm:5">
          {!userId || userId === user?._id ? (
            <ProfileContent
              uid={uid}
              item={user}
              userPosts={userPosts}
              followButton={followButton}
              messageLink={messageLink}
              imageRefs={imageRefs}
            />
          ) : (
            <ProfileContent
              item={userData}
              userPosts={userDataPosts}
              followButton={followButton}
              messageLink={messageLink}
              imageRefs={imageRefs}
            />
          )}
        </div>
        <div className="hidden xl:flex w-1/2 px-20 py-8">
          {uid && <FriendsHint type={"userprofil"} />}
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
