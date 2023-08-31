import DeleteCommentReply from "./DeleteCommentReply";
import PropTypes from "prop-types";

const PostReply = ({
  comment,
  type,
  usersData,
  showReply,
  replyComment,
  setShowReplyInput,
}) => {
  return (
    <>
      {showReply && replyComment === comment && comment.replies.length > 0 && (
        <div className="ml-6 mt-2">
          {comment.replies.map((reply) => (
            <div key={reply._id} className="flex items-center mb-3">
              {type === "thread" && (
                <img
                  src={
                    usersData.find((user) => user._id === reply.replierId)
                      ?.picture
                  }
                  alt="commenter-pic"
                  className="h-8 w-8 object-cover rounded-full me-3 text-sm"
                />
              )}
              {type === "post" && (
                <img
                  src={`../.${
                    usersData.find((user) => user._id === reply.replierId)
                      ?.picture
                  }`}
                  alt="commenter-pic"
                  className="h-8 w-8 object-cover rounded-full me-3 text-sm"
                />
              )}
              <div>
                <p className="text-sm">{reply.text}</p>
                <DeleteCommentReply
                  commentid={comment._id}
                  type={"reply"}
                  replyid={reply._id}
                  setShowReplyInput={setShowReplyInput}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

PostReply.propTypes = {
  comment: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  usersData: PropTypes.object.isRequired,
  showReply: PropTypes.object.isRequired,
  replyComment: PropTypes.object.isRequired,
  setShowReplyInput: PropTypes.object.isRequired,
};

export default PostReply;
