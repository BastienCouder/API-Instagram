import { useContext, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { addComment, getPosts } from "../../Store/actions/post.actions";
import { useDispatch, useSelector } from "react-redux";
import PostComment from "./PostComment";
import PropTypes from "prop-types";
import UidContext from "../../Services/AppContext";

const PostCommentsReply = ({ post, type }) => {
  const uid = useContext(UidContext);
  const [text, setText] = useState("");
  const [showInputComment, setShowInputComment] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleComment = async (e) => {
    e.preventDefault();

    if (text) {
      await dispatch(addComment(post._id, userData._id, text, userData.pseudo));
      await dispatch(getPosts());

      setText("");
    }
  };

  const handleShowInputComment = () => {
    setShowInputComment(true);
  };

  const handleHideInputComment = () => {
    setShowInputComment(false);
  };

  return (
    <div className="flex w-full px-4">
      {uid && (
        <>
          {!showInputComment && (
            <p
              onClick={handleShowInputComment}
              className="text-sm text-grey cursor-pointer"
            >
              Ajouter un commentaire...
            </p>
          )}

          {showInputComment && (
            <form
              onSubmit={handleComment}
              className="w-full flex items-center text-grey2"
            >
              <input
                type="text"
                name="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
                autoComplete="off"
                placeholder="Laisser un commentaire"
                className="border-b bg-transparent outline-none pt-2 pb-1 text-sm w-4/5"
              />

              <button type="submit" className="ms-4 mt-3">
                <BsFillSendFill />
              </button>

              <button
                type="button"
                onClick={handleHideInputComment}
                className="ms-2 mt-3 text-sm text-red-500 cursor-pointer"
              >
                Annuler
              </button>
            </form>
          )}

          <PostComment post={post} type={type} />
        </>
      )}
    </div>
  );
};

PostCommentsReply.propTypes = {
  post: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default PostCommentsReply;
