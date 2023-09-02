import { useState } from "react";
import { useSelector } from "react-redux";
import { apiUrl, dateParser } from "../../Utils/Utils";
import { BiCommentDetail } from "react-icons/bi";
import LikeButton from "./LikeButton";
import PostCommentReply from "./PostCommentReply";
import PropTypes from "prop-types";

const Post = ({ post }) => {
  const usersData = useSelector((state) => state.Allusers);
  const [showComments, setShowComments] = useState(false);

  if (!usersData || !post) {
    return <div className="text-white p-2">Chargement en cours...</div>;
  }

  return (
    <li
      key={post._id}
      className="my-2 border border-px border-grey bg-blackHover "
    >
      <div className="w-full flex flex-col my-1">
        <div className="flex items-center mx-3 my-3">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={`${apiUrl}/${
              usersData.find((user) => user._id === post?.posterId)?.picture ||
              ""
            }`}
            alt=""
          />
          <h3 className="ms-4">
            {usersData.find((user) => user._id === post?.posterId)?.pseudo ||
              ""}
          </h3>
        </div>
        <div className="mb-4 w-full">
          {post.picture && (
            <img
              className="w-full aspect-square object-cover"
              src={`${apiUrl}/${post.picture}`}
              alt=""
            />
          )}
          {post.video && (
            <iframe
              width="500"
              height="300"
              src={post.video}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={post._id}
            ></iframe>
          )}
          <p className="mx-3 mt-2">{post.message}</p>
        </div>
        <div className="w-full flex items-center text-lg mx-3 mb-2">
          <LikeButton item={post} type="card" />
          <div
            className="flex items-center mx-3 "
            onClick={() => setShowComments(!showComments)}
          >
            <BiCommentDetail className="w-4 cursor-pointer" />
            <span className="cursor-pointer ms-2 text-sm">
              {post.comments.length}
            </span>
          </div>
        </div>

        {showComments && <PostCommentReply post={post} type="thread" />}
        <span className="text-xs mx-3 my-4">{dateParser(post.createdAt)}</span>
      </div>
    </li>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
