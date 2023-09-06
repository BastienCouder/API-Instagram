import { useContext, useState } from "react";
import DeleteCommentReply from "./DeleteCommentReply";
import { useDispatch, useSelector } from "react-redux";
import { addReply, getPosts } from "../../Store/actions/post.actions";
import { BsFillSendFill } from "react-icons/bs";
import PostReply from "./PostReply";
import UidContext from "../../Services/AppContext";
import PropTypes from "prop-types";

const CardComments = ({ post, type }) => {
  const uid = useContext(UidContext);
  const [Comment, setComment] = useState(null);
  const [text, setText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const usersData = useSelector((state) => state.Allusers);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleReply = (comment) => {
    setShowReplyInput(true);
    setComment(comment);
  };

  const handleHideReplyInput = () => {
    setShowReplyInput(false);
    setComment(null);
  };

  const handleToggleReply = (comment) => {
    if (Comment === comment) {
      setShowReply(!showReply);
    } else {
      setShowReply(true);
    }
    setComment(comment);
    setText("");
  };

  const handleReplySubmit = async (e, comment) => {
    e.preventDefault();

    if (text) {
      await dispatch(
        addReply(comment._id, userData._id, text, userData.pseudo)
      );
      setShowReplyInput(false);
      await dispatch(getPosts());

      setText("");
    }
  };

  return (
    <>
      {post?.comments?.length > 0 && (
        <div className="mt-2">
          <h3 className="text-lg font-semibold ">Commentaires :</h3>
          {post?.comments.map((comment) => (
            <div key={comment._id}>
              <div className="flex items-center">
                {type === "thread" && (
                  <img
                    src={`/${
                      usersData.find((user) => user._id === comment.commenterId)
                        ?.picture
                    }`}
                    alt="commenter-pic"
                    className="h-7 w-7 object-cover rounded-full me-3 mt-3 text-sm"
                  />
                )}
                {type === "post" && (
                  <img
                    src={`/${
                      usersData.find((user) => user._id === comment.commenterId)
                        ?.picture
                    }`}
                    alt="commenter-pic"
                    className="h-7 w-7 object-cover rounded-full me-3 mt-3 text-sm"
                  />
                )}

                <p className="text-sm text-grey2">{comment.commenterPseudo}</p>
              </div>
              <div className="flex items-center" style={{ maxWidth: "80%" }}>
                <p>{comment.text}</p>{" "}
                {comment.commenterId === userData._id && (
                  <DeleteCommentReply
                    commentid={comment._id}
                    post={post}
                    type={"comment"}
                  />
                )}
              </div>
              {!showReplyInput && !uid && (
                <button
                  onClick={() => handleReply(comment)}
                  className="text-sm text-grey cursor-pointer me-3"
                >
                  Répondre
                </button>
              )}

              {showReplyInput && Comment === comment && (
                <form
                  onSubmit={(e) => handleReplySubmit(e, comment)}
                  className="w-full flex items-center text-grey2 mb-2"
                >
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`Répondre à ${comment.commenterPseudo}`}
                    className="border-b bg-transparent outline-none pt-2 text-sm w-3/5 mb-1"
                  />
                  <button type="submit" className="ms-4 mt-2">
                    <BsFillSendFill />
                  </button>
                  <button
                    type="button"
                    onClick={handleHideReplyInput}
                    className="text-sm text-red-500 cursor-pointer ms-2 mt-2"
                  >
                    Annuler
                  </button>
                </form>
              )}
              {comment.replies.length > 0 && (
                <button
                  onClick={() => handleToggleReply(comment)}
                  className="text-sm text-grey cursor-pointer "
                >
                  {showReply && Comment === comment
                    ? "Masquer les réponses"
                    : comment.replies.length > 1
                    ? "Voir les réponses"
                    : "Voir la réponse"}
                </button>
              )}
              <PostReply
                comment={comment}
                type={type}
                usersData={usersData}
                showReply={showReply}
                replyComment={Comment}
                setShowReplyInput={setShowReplyInput}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

CardComments.propTypes = {
  post: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardComments;
