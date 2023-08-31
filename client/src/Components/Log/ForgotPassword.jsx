import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../Utils/Utils";
import { GrMail } from "react-icons/gr";
import { IoMdReturnLeft } from "react-icons/io";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isPopupEmailOpen, setIsPopupEmailOpen] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    try {
      if (!email) {
        setEmailError("L'email est requis");
      } else {
        const response = await axios.post(`${apiUrl}user/forgot-password`, {
          email,
        });

        if (response.data.error) {
          setEmailError(response.data.error);
        } else {
          setIsPopupEmailOpen(true);
          setTimeout(() => {
            setIsPopupEmailOpen(false);
            navigate("/profil");
          }, 3000);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="h-screen w-screen  flex  flex-row justify-center items-center ">
      {isPopupEmailOpen && (
        <div className="z-10 absolute top-3 sm:top-auto sm:bottom-4 sm:left-44  w-72 left-1/2 -translate-x-1/2 bg-whitePur border-b-4 border-green text-blackHover py-2 px-4">
          <p className="flex justify-center">Email envoyé avec succès !</p>
        </div>
      )}
      <Link to="/profil" className="absolute sm:text-lg right-5 top-6">
        <IoMdReturnLeft />
      </Link>
      <form
        onSubmit={handleSubmit}
        className="p-8 gap-5 flex flex-col items-start border-2 border-grey rounded-lg"
      >
        <h4 className=" text-2xl font-bold">Mot de passe oublié</h4>
        <div className=" flex flex-col">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>

          <div className="relative text-white mb-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-1.5  pointer-events-none">
              <span className="w-4 h-4 ">
                <GrMail />
              </span>
            </div>
            <input
              type="email"
              placeholder="Entrer l'email"
              autoComplete="off"
              name="email"
              className="bg-blackHover rounded-md font-medium text-white text-sm outline-0 block w-full pl-9 p-2.5"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <small className="text-red text-xs italic">{emailError}</small>
        </div>
        <button
          type="submit"
          className="bg-blackHover rounded-md py-2 px-4 cursor-pointer"
        >
          Envoyé
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
