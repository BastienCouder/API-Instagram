import { useState } from "react";
import PropTypes from "prop-types";
import DeleteMessage from "./DeleteMessage";
import UpdateMessage from "./UpdateMessage";
import { AiFillEdit } from "react-icons/ai";

const SettingsMessage = ({ isReceiver, messageId, setIsPopupDeleteOpen }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isReceiver && (
        <div className="flex z-20 text-sm gap-2 ml-10 -mt-2 w-full bg-blackHover p-2 rounded-l-lg">
          {isEditing ? (
            <UpdateMessage
              messageId={messageId}
              handleCancelEdit={handleCancelEdit}
            />
          ) : (
            <button
              type="button"
              onClick={handleEditClick}
              className="text-white cursor-pointer"
            >
              <AiFillEdit />
            </button>
          )}
          <DeleteMessage
            messageId={messageId}
            setIsPopupDeleteOpen={setIsPopupDeleteOpen}
          />
        </div>
      )}
    </>
  );
};

SettingsMessage.propTypes = {
  isReceiver: PropTypes.bool.isRequired,
  messageId: PropTypes.string.isRequired,
  setIsPopupDeleteOpen: PropTypes.func.isRequired,
};

export default SettingsMessage;
