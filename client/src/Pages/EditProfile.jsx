import { useContext, useEffect, useState } from "react";
import { IoMdReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";
import UidContext from "../Services/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { updatePseudo, uploadPicture } from "../Store/actions/user.actions";
import { updateBio } from "../Store/actions/user.actions";
import { AiOutlineCloudUpload } from "react-icons/ai";
import MainLayout from "../Layouts";
import DeleteProfil from "../Components/Profil/DeleteProfil";

const EditProfile = () => {
  const uid = useContext(UidContext);
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [isPopupImageSaveOpen, setIsPopupImageSaveOpen] = useState(false);
  const [isPopupBioOpen, setIsPopupBioOpen] = useState(false);
  const [isPopupPseudoOpen, setIsPopupPseudoOpen] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [showPseudoField, setShowPseudoField] = useState(false);

  const userData = useSelector((state) => state.user);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [file]);

  useEffect(() => {
    setBio(userData.bio || "");
    setCurrentImage(`${userData.picture}`);
    setPseudo(userData.pseudo || "");
    setShowPseudoField(!!userData.googleId);
  }, [userData]);

  const handlePicture = async (e) => {
    e.preventDefault();
    let hasErrors = false;

    if (file === null) {
      setUploadError("Une image est requise");
      hasErrors = true;
    } else {
      setUploadError("");
    }

    if (!hasErrors) {
      const data = new FormData();
      data.append("name", userData.pseudo);
      console.log(pseudo);
      data.append("userId", userData._id);
      data.append("avatar", file);
      dispatch(uploadPicture(data, userData._id));

      if (!error.uploadError) {
        setIsPopupImageSaveOpen(true);
        setTimeout(() => {
          setIsPopupImageSaveOpen(false);
        }, 3000);
        location("/profil");
      }
    }
  };

  const handleBioSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBio(userData._id, bio));
    setIsPopupBioOpen(true);
    setTimeout(() => {
      setIsPopupBioOpen(false);
    }, 3000);
  };

  const handlePseudoSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updatePseudo(userData._id, pseudo));
    if (!error.userError) {
      setIsPopupPseudoOpen(true);
      setTimeout(() => {
        setIsPopupPseudoOpen(false);
      }, 3000);
      location("/profil");
    }
  };
  return (
    <MainLayout>
      {uid ? (
        <div className="flex flex-col-reverse sm:flex-row h-screen bg-black w-screen pb-6">
          {isPopupImageSaveOpen && (
            <div className="z-10 absolute top-3 sm:top-auto sm:bottom-4 sm:left-44  w-72 left-1/2 -translate-x-1/2 bg-whitePur border-b-4 border-green text-blackHover py-2 px-4">
              <p className="flex justify-center">Image changé avec succès !</p>
            </div>
          )}
          {isPopupBioOpen && (
            <div className="z-10 absolute top-3 sm:top-auto sm:bottom-4 sm:left-44  w-72 left-1/2 -translate-x-1/2 bg-whitePur border-b-4 border-green text-blackHover py-2 px-4">
              <p className="flex justify-center">Bio changé avec succès !</p>
            </div>
          )}
          {isPopupPseudoOpen && (
            <div className="z-10 absolute top-3 sm:top-auto sm:bottom-4 sm:left-44  w-72 left-1/2 -translate-x-1/2 bg-whitePur border-b-4 border-green text-blackHover py-2 px-4">
              <p className="flex justify-center">Pseudo changé avec succès !</p>
            </div>
          )}
          <div className="flex flex-col w-full h-full items-start sm:w-3/5 lg:w-2/5">
            <div className="w-full">
              <p className="w-full relative flex justify-center p-4 text-lg after:content[''] after:absolute after:w-screen after:h-px after:bg-grey after:bottom-0 after:right-0  sm:after:absolute sm:after:w-full after:h-px after:bg-grey after:bottom-0 after:right-0">
                Modifier le profil
              </p>
              <Link to="/profil" className="absolute sm:text-lg right-5 top-6">
                <IoMdReturnLeft />
              </Link>
            </div>
            <div className="w-full overflow-y-auto mb-20 sm:mb-0">
              <section className="flex w-full sm:h-36 px-4 ">
                <div className="w-1/4 sm:1/2 flex justify-center items-center pt-6 pb-4 sm:pt-0 sm:pb-0">
                  {!previewImage ? (
                    <img
                      className="object-cover p-1 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border border-white border-2"
                      src={currentImage}
                      alt=""
                    />
                  ) : (
                    <img
                      className="object-cover p-1 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border border-white border-2"
                      src={previewImage}
                      alt="Prévisualisation"
                    />
                  )}
                </div>
                <div className="w-3/4 flex flex-col justify-center px-5 sm:w-1/2">
                  <h1 className="font-bold text-lg">
                    {userData.pseudo ? userData.pseudo : "loading"}
                  </h1>
                </div>
              </section>
              {showPseudoField && (
                <>
                  <form onSubmit={handlePseudoSubmit} className="w-full px-6">
                    <section className="flex flex-col w-full pb-4">
                      <label htmlFor="pseudo" className=" pb-2">
                        Changer le nom d&rsquo;utilisateur
                      </label>
                      <div className="w-32 mb-2">
                        <input
                          type="text"
                          id="pseudo"
                          name="pseudo"
                          value={pseudo}
                          onChange={(e) => setPseudo(e.target.value)}
                          disabled={userData.pseudoChanged}
                          className="bg-transparent border border-white resize-none rounded-md px-2 py-1"
                        />
                      </div>
                      {error.userError && (
                        <small className="text-red text-xs italic">
                          {error.userError}
                        </small>
                      )}{" "}
                      <p className="text-xs text-grey">
                        Vous ne pouvez changer le nom d&rsquo;utilisateur
                        qu&rsquo;une seul fois
                      </p>
                      {!userData.pseudoChanged && ( // Affiche le bouton seulement si le pseudo n'est pas changé
                        <div className="w-32">
                          <input
                            type="submit"
                            value="Sauvegarder"
                            className="w-full mt-3 cursor-pointer py-2 px-4 bg-blackHover rounded-md"
                          />
                        </div>
                      )}
                    </section>
                  </form>
                </>
              )}
              <form onSubmit={handlePicture} className="w-full px-6">
                <p className="pb-3">Modifier la photo de profil</p>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="w-full h-16 flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center text-3xl justify-center">
                      <AiOutlineCloudUpload />
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
                {error && (
                  <div className="text-red text-sm my-2">
                    {error.uploadError.format && (
                      <small className="text-red text-xs italic">
                        {error.uploadError.format}
                      </small>
                    )}
                    {error.uploadError.maxSize && (
                      <small className="text-red text-xs italic">
                        {error.uploadError.maxSize}
                      </small>
                    )}
                    {uploadError && (
                      <div className="text-red text-sm my-2">
                        <small className="text-red text-xs italic">
                          {uploadError}
                        </small>
                      </div>
                    )}
                  </div>
                )}

                <input
                  type="submit"
                  name="avatar"
                  value="Sauvegarder la photo de profil"
                  className="mt-3 cursor-pointer py-2 px-4 bg-blackHover rounded-md"
                />
              </form>
              <form onSubmit={handleBioSubmit} className="w-full px-6">
                <section className="flex flex-col w-full h-48 sm:h-44 py-4">
                  <label htmlFor="message" className="capitalize pb-2">
                    bio
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="10"
                    rows="10"
                    maxLength="150"
                    defaultValue={userData.bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="bg-transparent border border-white resize-none rounded-md px-2 py-1"
                  ></textarea>
                  <div className="w-32">
                    <input
                      type="submit"
                      value="Sauvegarder"
                      className="w-full mt-3 cursor-pointer py-2 px-4 bg-blackHover rounded-md"
                    />
                  </div>
                </section>
              </form>
              <div className="px-6 py-2">
                <DeleteProfil id={uid} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        location()
      )}
    </MainLayout>
  );
};

export default EditProfile;
