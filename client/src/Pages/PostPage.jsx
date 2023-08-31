import { useState } from "react";
import { IoMdReturnLeft } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { dateParser } from "../Utils/Utils";
import { BiCommentDetail } from "react-icons/bi";
import Delete from "../component/Post/Delete";
import PostCommentReply from "../component/Post/PostCommentReply";
import LikeButton from "../component/Post/LikeButton";
import MainLayout from "../Layouts";

const PostPage = () => {
  const { userId, postId } = useParams();
  const posts = useSelector((state) => state.posts);
  const usersData = useSelector((state) => state.Allusers);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);

  if (!usersData || !posts) {
    return <div>Chargement en cours...</div>;
  }

  const currentUser = usersData?.find((user) => user._id === userId);
  const userPost = posts?.find((post) => post._id === postId);

  if (!userData || !userPost) {
    return <div>Utilisateur ou post introuvable.</div>;
  }

  const handleProfileLinkClick = () => {
    if (userData._id === currentUser._id) {
      navigate("/profil");
    } else {
      navigate(`/profil/${userId}`);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex bg-black h-auto w-screen overflow-y-auto items-start text-white">
        <IoMdReturnLeft
          onClick={handleProfileLinkClick}
          className="cursor-pointer absolute sm:text-lg right-5 top-7"
        />

        <div className="max-w-11 sm:h-screen overflow-y-auto overflow-hidden sm:w-1/2 mb-20 sm:mb-0 flex flex-col sm:bg-blackHover lg:w-1/3 xl:w-1/3">
          <div className="flex items-center mx-3 my-3">
            <img
              className="w-12 h-12 object-cover rounded-full"
              src={`../.${
                usersData.find((user) => user._id === userPost.posterId)
                  ?.picture || ""
              }`}
              alt=""
            />
            <h3 className="ms-4">
              {usersData.find((user) => user._id === userPost.posterId)
                ?.pseudo || ""}
            </h3>
          </div>
          <div className="mb-4 ">
            {userPost.picture && (
              <img
                className="w-full aspect-square object-cover "
                src={userPost.picture}
                alt=""
              />
            )}
            {userPost.video && (
              <iframe
                width="500"
                height="300"
                src={userPost.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={userPost._id}
              ></iframe>
            )}
            <p className="mx-3 mt-2">{userPost.message}</p>
          </div>
          <div className="w-full flex items-center text-lg px-3 mb-2">
            <LikeButton item={userPost} type="post" />

            <div className="flex items-center mx-3 ">
              <BiCommentDetail
                onClick={() => setShowComments(!showComments)}
                className="w-4 cursor-pointer"
              />
              <span className="cursor-pointer ms-2 text-sm">
                {userPost.comments.length}
              </span>
            </div>
            {currentUser._id === userData._id && (
              <Delete
                id={userPost._id}
                navigateToProfile={() => navigate(`/profil`)}
              />
            )}
          </div>
          {showComments && <PostCommentReply post={userPost} type="post" />}
          <span className="text-xs mx-3 my-4">
            {dateParser(userPost.createdAt)}
          </span>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostPage;
