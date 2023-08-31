import { useState } from "react";
import axios from "axios";
import { GrMail } from "react-icons/gr";

import { apiUrl, location } from "../../Utils/Utils";
import ShowPassword from "./ShowPassword";
import { Link } from "react-router-dom";
import { MdPassword } from "react-icons/md";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    // Verify
    if (email === "") {
      setEmailError("L'email est requis");
    }
    if (password === "") {
      setPasswordError("Le mot de passe est requis");
    }

    // Submit Verify
    if (email !== "" && password !== "") {
      try {
        const response = await axios.post(
          `${apiUrl}/auth/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        if (response.data.errors) {
          const { email, password } = response.data.errors;
          setEmailError(email);
          setPasswordError(password);
          console.log(response.data.errors);
        } else {
          location("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handleLogin}
        id="sign-in-form"
        autoComplete="off"
        className="w-72 sm:w-80"
      >
        <h2 className="mb-6 text-2xl font-bold">Se connecter</h2>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <div className="relative text-black">
            <div className="absolute inset-y-1 left-0 flex items-center pl-1.5 pointer-events-none">
              <span className="w-4 h-3.5 text-white ">
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
              className="bg-blackHover rounded-md font-medium text-white text-sm outline-0  block w-full pl-9 p-2.5"
            />
          </div>
          <small className="text-red text-xs italic">{emailError}</small>
          <br />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>

          <div className="relative text-white">
            <div className="absolute bg-blackHover inset-y-1 left-0 flex items-center pl-1.5 pointer-events-none">
              <span className="w-4 h-3.5 text-white">
                <MdPassword />
              </span>
            </div>
            <ShowPassword password={password} setPassword={setPassword} />
          </div>
          <div className="flex justify-between mt-1">
            <small className="text-red text-xs italic">{passwordError}</small>
            <Link to="/forgot-password" className="text-xs">
              Mot de passe oublié ?
            </Link>
          </div>
        </div>

        <input
          type="submit"
          value="Se connecter"
          className="bg-blackHover rounded-md py-2 px-4 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default SignInForm;
