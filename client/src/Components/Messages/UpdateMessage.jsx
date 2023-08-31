import { useState } from "react";
import { useDispatch } from "react-redux";
import { editMessage } from "../../Store/actions/message.actions";
import PropTypes from "prop-types";

const UpdateMessage = ({ messageId, handleCancelEdit }) => {
  const dispatch = useDispatch();

  const [updatedMessage, setUpdatedMessage] = useState("");

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const editedMessage = {
      message: updatedMessage,
    };
    dispatch(editMessage(messageId, editedMessage));
    setUpdatedMessage("");
    handleCancelEdit();
  };

  return (
    <form onSubmit={handleUpdateSubmit} className="ms-2 my-2 ">
      <textarea
        value={updatedMessage}
        onChange={(e) => setUpdatedMessage(e.target.value)}
        rows={4}
        cols={50}
        className=" rounded-lg resize-none bg-black border-2 border-grey px-2 py-1 mb-2 outline-none"
      />
      <button type="submit">Mettre à jour</button>
      <button type="button" onClick={handleCancelEdit} className="ms-4">
        Annuler
      </button>
    </form>
  );
};

UpdateMessage.propTypes = {
  messageId: PropTypes.string.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
};

export default UpdateMessage;
