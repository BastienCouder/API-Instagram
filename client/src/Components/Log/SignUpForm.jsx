import { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import { BiSolidUser } from "react-icons/bi";
import { GrMail } from "react-icons/gr";
import { MdPassword } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { apiUrl } from "../../Utils/Utils";
import ShowPassword from "./ShowPassword";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pseudoError, setPseudoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setPseudoError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setTermsError("");

    // Verify
    if (pseudo === "") {
      setPseudoError("Le nom d'utilisateur est requis");
    }
    if (email === "") {
      setEmailError("L'email est requis");
    }
    if (password === "") {
      setPasswordError("Le mot de passe est requis");
    }
    if (confirmPassword === "") {
      setConfirmPasswordError("La confirmation du mot de passe est requise");
    }
    if (password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
    }
    if (!document.getElementById("terms").checked) {
      setTermsError("Veuillez valider les conditions générales");
    }

    // Submit Verify
    if (
      pseudo !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      document.getElementById("terms").checked
    ) {
      try {
        setLoading(true);
        const response = await axios.post(`${apiUrl}/auth/register`, {
          pseudo,
          email,
          password,
        });
        console.log(response);
        if (response.data.errors) {
          const { pseudo, email, password } = response.data.errors;
          setPseudoError(pseudo);
          setEmailError(email);
          setPasswordError(password);
          console.log(response);
        } else {
          setFormSubmit(true);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
        </>
      ) : (
        <>
          <form
            action=""
            onSubmit={handleRegister}
            id="sign-up-form"
            className="w-72 sm:w-80"
            autoComplete="off"
          >
            <h2 className="mb-6 text-2xl font-bold">S&rsquo;inscrire</h2>
            <div className="mb-2">
              <label
                htmlFor="pseudo"
                className="block mb-1 text-sm font-medium"
              >
                Nom d&rsquo;utilisateur
              </label>
              <div className="relative text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                  <span className="w-4 h-4  ">
                    <BiSolidUser />
                  </span>
                </div>
                <input
                  type="text"
                  name="pseudo"
                  id="pseudo"
                  placeholder="nom d'utilisateur"
                  onChange={(e) => setPseudo(e.target.value)}
                  value={pseudo}
                  className="bg-blackHover rounded-md font-medium text-white text-sm outline-0 block w-full pl-9 p-2.5"
                />
              </div>
              <small className="text-red text-xs italic">{pseudoError}</small>
              <br />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email
              </label>
              <div className="relative text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                  <span className="w-4 h-4 ">
                    <GrMail />
                  </span>
                </div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="bg-blackHover rounded-md font-medium text-white text-sm outline-0 block w-full pl-9 p-2.5"
                />
              </div>
              <small className="text-red text-xs italic">{emailError}</small>
              <br />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium"
              >
                Mot de passe
              </label>
              <div className="relative text-white">
                <div className="absolute inset-y-1 left-0 flex items-center pl-1.5 pointer-events-none">
                  <span className="w-4 h-4  ">
                    <MdPassword />
                  </span>
                </div>
                <ShowPassword password={password} setPassword={setPassword} />
              </div>
              <small className="text-red text-xs italic">{passwordError}</small>
              <br />
            </div>
            <div className="mb-1">
              <label
                htmlFor="password-conf"
                className="block mb-1 text-sm font-medium"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative text-white">
                <div className="absolute inset-y-1 left-0 flex items-center pl-1.5 pointer-events-none">
                  <span className="w-4 h-4  ">
                    <MdPassword />
                  </span>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password-conf"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="confirmer mot de passe"
                  className="bg-blackHover rounded-md font-medium text-white text-sm outline-0 block w-full pl-9 p-2.5"
                />
              </div>
              <small className="text-red text-xs italic">
                {confirmPasswordError}
              </small>
              <br />{" "}
            </div>
            <div className="inline-flex items-center w-full">
              <label
                className="relative flex items-center rounded-full m-0 "
                htmlFor="terms"
                data-ripple-dark="true"
              >
                <input
                  type="checkbox"
                  id="terms"
                  className="cursor-pointer before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-0 before:w-0 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-white before:opacity-0 before:transition-opacity checked:border-white checked:bg-white checked:before:bg-white "
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-black opacity-0 transition-opacity peer-checked:opacity-100">
                  <BsCheck />
                </div>
              </label>

              <label
                className="mt-px select-none font-light text-white text-sm ms-2"
                htmlFor="login"
              >
                J&rsquo;accepte les{" "}
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  conditions générales
                </a>
              </label>
            </div>
            <small className="text-red text-xs italic">{termsError}</small>
            <br />
            <br />
            <input
              type="submit"
              value="Valider inscription"
              disabled={isLoading}
              className="bg-blackHover rounded-md py-2 px-4 cursor-pointer"
            />
          </form>
        </>
      )}
    </>
  );
};

export default SignUpForm;
