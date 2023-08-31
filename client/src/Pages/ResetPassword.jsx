import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../Utils/Utils";
import { IoMdReturnLeft } from "react-icons/io";
import { MdPassword } from "react-icons/md";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [invalidToken, setInvalidToken] = useState("");
  const [expiredToken, setExpiredToken] = useState("");
  const [samePassword, setSamePassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInvalidToken("");
    setExpiredToken("");
    setSamePassword("");

    try {
      const response = await axios.post(
        `${apiUrl}/user/reset-password/${token}`,
        {
          resetToken: token,
          newPassword: password,
        }
      );
      console.log(response);
      if (response.data.errors) {
        const { invalidToken, expiredToken, samePassword } =
          response.data.errors;
        setInvalidToken(invalidToken);
        setExpiredToken(expiredToken);
        setSamePassword(samePassword);
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(
        "Une erreur s'est produite lors de la réinitialisation du mot de passe."
      );
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-screen  flex  flex-row justify-center items-center ">
      <Link to="/profil" className="absolute sm:text-lg right-5 top-6">
        <IoMdReturnLeft />
      </Link>
      <form
        onSubmit={handleSubmit}
        className="p-8 gap-5 flex flex-col items-start border-2 border-grey rounded-lg"
      >
        <h4 className=" text-2xl font-bold">Réinitialiser le mot de passe</h4>
        <div className=" flex flex-col">
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Nouveau mot de passe
          </label>

          <div className="relative text-white">
            <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
              <span className="w-4 h-4">
                <MdPassword />
              </span>
            </div>
            <input
              type="password"
              placeholder="Saisissez le mot de passe"
              autoComplete="off"
              name="password"
              className="bg-blackHover rounded-md font-medium text-white text-sm outline-0 block w-full pl-9 p-2.5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <small className="text-red text-xs mt-2 italic">{error}</small>
          <small className="text-red text-xs mt-2 italic">{invalidToken}</small>
          <small className="text-red text-xs mt-2 italic">{expiredToken}</small>
          <small className="text-red text-xs mt-2 italic">{samePassword}</small>
        </div>

        <button
          type="submit"
          className="bg-blackHover rounded-md py-2 px-4 cursor-pointer"
          disabled={invalidToken || expiredToken || samePassword}
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
