import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { location } from "../../Utils/Utils";
import { deleteUser } from "../../Store/actions/user.actions";

const DeleteProfil = ({ id }) => {
  const dispatch = useDispatch();
  const deleteQuote = () => {
    dispatch(deleteUser(id));
    location("/");
  };

  return (
    <button
      onClick={() => {
        if (window.confirm("Voulez-vous vraiment supprimer votre profil ?")) {
          deleteQuote();
        }
      }}
      className="bg-red py-2 px-4 rounded-md"
    >
      Supprimer le profil
    </button>
  );
};

DeleteProfil.propTypes = {
  id: PropTypes.string.isRequired,
  navigateToProfile: PropTypes.func.isRequired,
};

export default DeleteProfil;
