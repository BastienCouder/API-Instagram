import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deletePost } from "../../Store/actions/post.actions";
import PropTypes from "prop-types";

const Delete = ({ id, navigateToProfile }) => {
  const dispatch = useDispatch();
  const deleteQuote = () => {
    dispatch(deletePost(id));
    navigateToProfile();
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous vraiment supprimer ?")) {
          deleteQuote();
        }
      }}
    >
      <AiFillDelete className="cursor-pointer" />
    </div>
  );
};

Delete.propTypes = {
  id: PropTypes.string.isRequired,
  navigateToProfile: PropTypes.func.isRequired,
};

export default Delete;
