import { useState } from "react";
import PropTypes from "prop-types";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ShowPassword = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="bg-blackHover rounded-md font-medium text-white text-sm outline-0 block w-full pl-9 p-2.5"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-1 right-0 px-2 text-xl cursor-pointer"
      >
        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </button>
    </>
  );
};

ShowPassword.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default ShowPassword;
