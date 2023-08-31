import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreateMessage from "../component/Messages/CreateMessage";
import { IoMdReturnLeft } from "react-icons/io";
import { io } from "socket.io-client";
import { getMessages } from "../Store/actions/message.actions";
import UidContext from "../Services/AppContext";
import { apiUrl, location } from "../Utils/Utils";
import FriendsHint from "../component/Profil/FriendsHint";
import MainLayout from "../Layouts";
import SettingsMessage from "../component/Messages/SettingsMessage";

const MessageUser = () => {
  const uid = useContext(UidContext);
  const { userId } = useParams();
  const usersData = useSelector((state) => state.Allusers);
  const userData = useSelector((state) => state.user);
  const messageData = useSelector((state) => state.messages);
  const currentUserID = userData?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [autoScroll, setAutoScroll] = useState(true);

  const [setting, setSetting] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const [isPopupImageOpen, setIsPopupImageOpen] = useState(false);

  const currentMessagesReceiver = messageData?.filter(
    (message) => message.receiver === userId && message.sender === currentUserID
  );

  const currentMessagesSender = messageData?.filter(
    (message) => message.receiver === currentUserID && message.sender === userId
  );

  const messagesContainerRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(apiUrl, {
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(getMessages());
  }, [currentMessagesReceiver, currentMessagesSender]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [currentMessagesReceiver, currentMessagesSender]);

  const handleScroll = () => {
    if (
      messagesContainerRef.current &&
      messagesContainerRef.current.scrollTop <
        messagesContainerRef.current.scrollHeight -
          messagesContainerRef.current.clientHeight -
          2
    ) {
      setAutoScroll(false);
    } else {
      setAutoScroll(true);
    }
  };

  if (!userId || !usersData || !userData || !messageData) {
    return <div className="text-white p-2">Loading...</div>;
  }

  const currentUser = usersData?.find((user) => user._id === userId);

  if (!currentUser) {
    return <div className="text-white p-2">User not found.</div>;
  }

  const handleProfileLinkClick = () => {
    if (userData._id === currentUser._id) {
      navigate("/profil");
    } else {
      navigate(`/profil/${userId}`);
    }
  };

  return (
    <MainLayout>
      {uid ? (
        <div className="flex flex flex-col bg-black h-auto w-full sm:flex-row items-start text-white">
          {isPopupDeleteOpen && (
            <div className="z-10 absolute top-3 sm:top-auto sm:bottom-4 sm:left-44  w-72 left-1/2 -translate-x-1/2 bg-whitePur border-b-4 border-red text-blackHover py-2 px-4">
              <p className="flex justify-center">
                Message supprimé avec succès !
              </p>
            </div>
          )}
          {isPopupImageOpen && (
            <div className="z-10 absolute top-3 sm:top-auto sm:bottom-4 sm:left-44  w-72 left-1/2 -translate-x-1/2 bg-whitePur border-b-4 border-green text-blackHover py-2 px-4">
              <p className="flex justify-center">Image ajouté avec succès !</p>
            </div>
          )}
          <div className="relative flex flex-col w-screen  sm:w-[30rem] after:content[''] after:absolute after:w-screen after:h-px after:bg-grey after:top-0 after:right-0 sm:after:content[''] sm:after:absolute sm:after:h-screen sm:after:w-px sm:after:bg-grey sm:after:top-0 sm:after:right-0 ">
            <div className="relative w-full flex flex-col after:content[''] after:absolute after:w-screen after:h-px after:bg-grey after:bottom-0 after:right-0 sm:after:w-full">
              <div className="flex h-10 items-center mx-4 my-3">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src={`../.${currentUser?.picture || ""}`}
                  alt=""
                />
                <h3 className="ms-4">{currentUser?.pseudo || ""}</h3>
              </div>
            </div>
            <IoMdReturnLeft
              onClick={handleProfileLinkClick}
              className="cursor-pointer absolute sm:text-lg right-5 top-7"
            />
            <div className="flex flex-col justify-between h-[36rem] sm:h-[39rem]">
              <div
                ref={messagesContainerRef}
                className="relative pt-5 h-[28rem] sm:h-auto w-full flex flex-col  overflow-y-auto  sm:after:h-screen"
                onScroll={handleScroll}
                style={{ maxHeight: "32rem" }}
              >
                {[...currentMessagesReceiver, ...currentMessagesSender]
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((message) => {
                    const isReceiver = message.receiver === userId;
                    const isEdited = message.edited;
                    console.log(isEdited);
                    return (
                      <div key={message._id} className="flex flex-col my-1">
                        {message.picture && (
                          <>
                            <img
                              src={`../../..${message.picture}`}
                              alt={"Image"}
                              className={`text-white py-2 mb-2 ${
                                isReceiver
                                  ? "ml-auto  object-cover"
                                  : " mr-auto  object-cover"
                              }`}
                              style={{ maxWidth: "70%" }}
                            />{" "}
                            <div
                              className={
                                isReceiver ? " ml-auto  rounded-l-lg" : null
                              }
                            >
                              {setting && (
                                <SettingsMessage
                                  isReceiver={isReceiver}
                                  messageId={message._id}
                                  setIsPopupDeleteOpen={setIsPopupDeleteOpen}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {message.message && (
                          <>
                            <p
                              className={`text-white py-2 px-4  ${
                                isReceiver
                                  ? "bg-green ml-auto rounded-l-lg"
                                  : " mr-auto bg-blue rounded-r-lg"
                              }`}
                              style={{
                                maxWidth: "70%",
                                wordWrap: "break-word",
                              }}
                            >
                              {message.message}
                            </p>
                            <div
                              className={
                                isReceiver ? "ml-auto  rounded-l-lg" : null
                              }
                            >
                              {setting && (
                                <SettingsMessage
                                  isReceiver={isReceiver}
                                  messageId={message._id}
                                  setIsPopupDeleteOpen={setIsPopupDeleteOpen}
                                />
                              )}{" "}
                              {isEdited && (
                                <span className="capitalize bg-black text-grey text-xs  ml-10 mr-2">
                                  modifié
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>
              <CreateMessage
                userId={userId}
                currentUserID={currentUserID}
                socket={socket}
                setSetting={setSetting}
                setIsPopupImageOpen={setIsPopupImageOpen}
              />
            </div>
          </div>
          <div className="hidden lg:flex w-full m-4 ms-6 ">
            <FriendsHint type={"message"} />
          </div>
        </div>
      ) : (
        location()
      )}
    </MainLayout>
  );
};

export default MessageUser;
