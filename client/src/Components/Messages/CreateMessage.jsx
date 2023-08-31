import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createMessage,
  getMessages,
} from "../../Store/actions/message.actions";
import { BsFillSendFill } from "react-icons/bs";
import {
  AiFillPicture,
  AiOutlinePicture,
  AiTwotoneSetting,
} from "react-icons/ai";
import PropTypes from "prop-types";

const CreateMessage = ({
  userId,
  currentUserID,
  socket,
  setSetting,
  setIsPopupImageOpen,
}) => {
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState("");

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setPicture(imageFile);
    setIsPopupImageOpen(true);
    setTimeout(() => {
      setIsPopupImageOpen(false);
    }, 3000);
  };

  const handleTextAreaChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById("image");
    fileInput.click();
  };

  const handleSettingClick = () => {
    setSetting((prevSetting) => !prevSetting);
  };

  const handleCancelPost = () => {
    setMessage("");
    setPicture("");
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (message || picture) {
      const data = new FormData();
      data.append("sender", currentUserID);
      data.append("receiver", userId);
      data.append("message", message);
      if (picture) data.append("image", picture);

      socket.emit("newMessage", data);
      await dispatch(createMessage(data));
      dispatch(getMessages());

      handleCancelPost();
    } else {
      alert("Entrer un message");
    }
  };

  return (
    <>
      <form
        action=""
        className=" relative w-full relative px-4 after:absolute after:w-screen after:h-px after:bg-grey after:top-0 after:right-0 sm:after:w-full"
      >
        <div className="flex w-full  justify-center items-center h-20 ">
          <div className="flex w-full flex-col pt-2">
            <label htmlFor="message" className="capitalize pb-2"></label>
            <input
              name="message"
              value={message}
              onChange={handleTextAreaChange}
              maxLength="500"
              className="bg-transparent border border-white resize-none text-sm rounded-md px-2 py-2"
              placeholder="Entrer un message..."
            ></input>
          </div>
          <div className="flex items-center w-40">
            <label htmlFor="picture" className=" pb-2"></label>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleImageClick}
              name="picture"
              value={picture}
            >
              <div className="w-4 h-0 ms-5 text-xl cursor-pointer">
                {picture ? <AiFillPicture /> : <AiOutlinePicture />}
              </div>
            </button>
            <button
              type="submit"
              onClick={handlePost}
              className="w-4 h-0 ms-5 text-lg cursor-pointer "
            >
              <BsFillSendFill />
            </button>
            <button
              type="button"
              onClick={() => handleSettingClick()}
              className="w-4 h-0 ms-5 text-xl cursor-pointer "
            >
              <AiTwotoneSetting />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

CreateMessage.propTypes = {
  userId: PropTypes.string.isRequired,
  currentUserID: PropTypes.string.isRequired,
  socket: PropTypes.object,
  setSetting: PropTypes.func.isRequired,
  setIsPopupImageOpen: PropTypes.func.isRequired,
};
export default CreateMessage;
