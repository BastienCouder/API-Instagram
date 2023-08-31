import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteMessage,
  getMessages,
} from "../../Store/actions/message.actions";

const DeleteMessage = ({ messageId, setIsPopupDeleteOpen }) => {
  const dispatch = useDispatch();
  const deleteQuote = () => {
    dispatch(deleteMessage(messageId));
    dispatch(getMessages());

    setIsPopupDeleteOpen(true);
    setTimeout(() => {
      setIsPopupDeleteOpen(false);
    }, 3000);
  };

  return (
    <>
      <div
        onClick={() => {
          if (window.confirm("Voulez-vous vraiment supprimer ce message ?")) {
            deleteQuote();
          }
        }}
      >
        <AiFillDelete className="cursor-pointer" />
      </div>
    </>
  );
};

DeleteMessage.propTypes = {
  messageId: PropTypes.string.isRequired,
  setIsPopupDeleteOpen: PropTypes.func.isRequired,
};

export default DeleteMessage;
