import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import PropTypes from "prop-types";
import { AiFillGoogleCircle } from "react-icons/ai";
import { apiUrl } from "../../Utils/Utils";

const LogIndex = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  const googleAuth = () => {
    window.open(`${apiUrl}auth/google/callback`, "_self");
  };

  return (
    <div className="h-screen w-screen text-white flex flex-col sm:flex-row items-start">
      <div className="flex justify-start w-screen  flex-col overflow-y-auto bg-black mb-20 px-8 pt-6 ">
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
        <div className="flex flex-col h-full mb-4 ">
          <div className="flex items-center mt-5 mb-4">
            <hr className="w-28 sm:w-32 h-2" />
            <p className="px-5 -mt-3">ou</p>
            <hr className="w-28 sm:w-32 h-2" />
          </div>
          <button
            className=" flex items-center gap-2 w-32 border-2 border-grey rounded-lg px-4 py-2"
            onClick={googleAuth}
          >
            <AiFillGoogleCircle className="text-3xl" /> Google
          </button>
          <ul className="flex ">
            <li className={signUpModal ? "hidden" : "mx-0 mt-5  text-sm"}>
              Toujours pas de compte ?&emsp;
              <span
                onClick={handleModals}
                id="register"
                className="cursor-pointer text-red hover:border-b-2"
              >
                S&#39;inscrire
              </span>
            </li>

            <li className={signInModal ? "hidden" : "mx-0 mt-5 text-sm "}>
              Déjà un compte ?&emsp;
              <span
                onClick={handleModals}
                id="login"
                className="cursor-pointer text-red hover:border-b-2"
              >
                Se connecter
              </span>
            </li>
          </ul>{" "}
        </div>
      </div>
    </div>
  );
};

LogIndex.propTypes = {
  signup: PropTypes.bool.isRequired,
  signin: PropTypes.bool.isRequired,
};

export default LogIndex;
