import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  deleteComment,
  deleteReply,
  getPosts,
} from "../../Store/actions/post.actions";
import PropTypes from "prop-types";

const DeleteCommentReply = ({
  commentid,
  post,
  type,
  replyid,
  setShowReplyInput,
}) => {
  const dispatch = useDispatch();

  const handleCommentDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer le commentaire ?")) {
      await dispatch(deleteComment(post._id, commentid));
      await dispatch(getPosts());
    }
  };
  const handleReplyDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer la réponse ?")) {
      await dispatch(deleteReply(commentid, replyid));
      setShowReplyInput(false);
      await dispatch(getPosts());
    }
  };

  return (
    <>
      {type === "comment" && (
        <div onClick={handleCommentDelete}>
          <AiFillDelete className="cursor-pointer ms-2 mt-0.5" />
        </div>
      )}

      {type === "reply" && (
        <div onClick={handleReplyDelete}>
          <AiFillDelete className="cursor-pointer ms-2 mt-0.5" />
        </div>
      )}
    </>
  );
};

DeleteCommentReply.propTypes = {
  commentid: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  replyid: PropTypes.object.isRequired,
  setShowReplyInput: PropTypes.object.isRequired,
};

export default DeleteCommentReply;
