import { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../Store/actions/post.actions"; // Assurez-vous d'importer les bonnes actions
import { useNavigate } from "react-router-dom";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import PropTypes from "prop-types";

const LikeButton = ({ item, type }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const like = () => {
    if (type === "post" || type === "card") dispatch(likePost(item?._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    if (type === "post" || type === "card")
      dispatch(unlikePost(item?._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (item.likers?.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, item.likers]);

  const redirectProfile = () => {
    if (!uid) {
      navigate("/profil");
    }
  };

  return (
    <div className="flex items-center">
      {uid === null && (
        <FcLikePlaceholder
          className="w-4 cursor-pointer"
          onClick={redirectProfile}
        />
      )}
      {uid && liked === false && (
        <FcLikePlaceholder className="w-4 cursor-pointer" onClick={like} />
      )}
      {uid && liked && (
        <FcLike className="w-4 cursor-pointer" onClick={unlike} />
      )}
      <span className="ms-2 text-sm">{item.likers.length}</span>
    </div>
  );
};

LikeButton.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default LikeButton;
