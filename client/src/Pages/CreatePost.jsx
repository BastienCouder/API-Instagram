import { useContext, useEffect, useRef, useState } from "react";
import {
  resizeImage,
  adjustSquareImages,
  timestampParser,
} from "../Utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "../Store/actions/post.actions";
import UidContext from "../Services/AppContext";
import MainLayout from "../Layouts";

const CreatePost = () => {
  const uid = useContext(UidContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [picture, setPicture] = useState("");
  const [pictureError, setPictureError] = useState("");
  const userData = useSelector((state) => state.user);
  const error = useSelector((state) => state.error);
  const imageRefs = useRef();
  const dispatch = useDispatch();

  const [isPopupPostOpen, setIsPopupPostOpen] = useState(false);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setPicture(imageFile);
    setPictureError("");

    resizeImage(imageFile, 400, 400)
      .then((resizedImage) => {
        setSelectedImage(resizedImage);
      })
      .catch((err) => {
        console.error("Erreur lors du redimensionnement de l'image : ", err);
      });
  };

  useEffect(() => {
    adjustSquareImages(imageRefs);
  }, [selectedImage]);

  const handleTextAreaChange = (e) => {
    setMessage(e.target.value);
    setMessageError("");
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById("image");
    fileInput.click();
  };

  const handleCancelPost = () => {
    setMessage("");
    setMessageError("");
    setSelectedImage(null);
    setPicture("");
    setPictureError("");
  };

  const handlePost = async (e) => {
    e.preventDefault();

    let hasErrors = false;

    if (message === "") {
      setMessageError("Un message est requis");
      hasErrors = true;
    } else {
      setMessageError("");
    }

    if (picture === "") {
      setPictureError("Une image est requise");
      hasErrors = true;
    } else {
      setPictureError("");
    }

    if (!hasErrors) {
      const data = new FormData();
      data.append("posterId", userData?._id);
      data.append("message", message);
      if (picture) data.append("image", picture);

      await dispatch(createPost(data));
      if (!error.postError) {
        dispatch(getPosts());
        handleCancelPost();

        setIsPopupPostOpen(true);
        setTimeout(() => {
          setIsPopupPostOpen(false);
        }, 3000);
      }
    }
  };

  return (
    <MainLayout>
      {uid ? (
        <div className="h-screen w-screen text-white flex flex-col sm:flex-row items-start">
          {isPopupPostOpen && (
            <div className="z-10 absolute top-3 sm:top-auto sm:bottom-4 sm:left-44  w-72 left-1/2 -translate-x-1/2 bg-whitePur border-b-4 border-green text-blackHover py-2 px-4">
              <p className="flex justify-center">Post crée !</p>
            </div>
          )}
          <div className="flex flex-col w-full h-full items-start p-4 sm:w-3/5 lg:w-3/5">
            <form action="" className="w-full">
              <div className="flex w-full">
                {selectedImage ? (
                  <div
                    className="w-4/5 mt-2 rounded-md overflow-hidden"
                    style={{
                      width: "200px",
                      height: "200px",
                      backgroundImage: `url(${selectedImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                ) : (
                  <div
                    className="w-4/5 mt-2 rounded-md overflow-hidden border border-2 border-dashed"
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                  ></div>
                )}
                {userData && (
                  <div className="flex flex-col w-2/5 sm:h-40 py-3 ms-5 items-start ">
                    <div className="w-full mb-2 sm:mb-4">
                      {userData?.picture && (
                        <img
                          className="object-cover p-1 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border border-white border-2"
                          src={`.${userData.picture}`}
                          alt=""
                        />
                      )}
                    </div>
                    <div className=" flex flex-col ms-2">
                      {userData?.pseudo && (
                        <h1 className="font-bold text-lg lg:w-24">
                          {userData.pseudo}
                        </h1>
                      )}

                      <span className="text-sm">
                        {timestampParser(Date.now())}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {error && (
                <div className="my-2">
                  {error.postError.format && (
                    <small className="text-red text-xs italic">
                      {error.postError.format}
                    </small>
                  )}
                  {error.postError.maxSize && (
                    <small className="text-red text-xs italic">
                      {error.postError.maxSize}
                    </small>
                  )}
                  {pictureError && (
                    <small className="text-red text-xs italic">
                      {pictureError}
                    </small>
                  )}
                </div>
              )}
              <div className="flex w-full flex-col h-56 sm:h-52 py-4 lg:pe-44 xl:pe-80">
                <label htmlFor="message" className="capitalize pb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={message}
                  onChange={handleTextAreaChange}
                  cols="10"
                  rows="10"
                  maxLength="500"
                  className="bg-transparent border border-white resize-none rounded-md px-2 py-1"
                ></textarea>
                {messageError && (
                  <small className="text-red text-xs italic mt-2">
                    {messageError}
                  </small>
                )}
              </div>

              <div className="flex flex-col w-40 h-48 sm:h-44 pb-4">
                <label htmlFor="image" className="capitalize pb-2">
                  Image
                </label>
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
                  className="cursor pointer flex w-full text-sm text-grey border border-black rounded-lg bg-blackHover py-2 px-4 focus:outline-none placeholder-black"
                >
                  Choisir une image
                </button>
                <div className="flex gap-4 w-32">
                  <input
                    type="submit"
                    value="Créer un post"
                    onClick={handlePost}
                    className="w-full mt-4 cursor-pointer py-2 px-4 bg-blackHover rounded-md"
                  />
                  {message || selectedImage ? (
                    <input
                      type="submit"
                      value="Reinitialisé"
                      onClick={handleCancelPost}
                      className="w-full mt-4 cursor-pointer py-2 px-4 bg-blackHover rounded-md"
                    />
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </MainLayout>
  );
};

export default CreatePost;
