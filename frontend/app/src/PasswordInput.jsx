import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="relative py-2">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        type={isShowPassword ? "text" : "password"} 
        className="input-box"
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="password-icon"
          onClick={() => toggleShowPassword()}
          color="white"
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="password-icon"
          onClick={() => toggleShowPassword()}
          color="white"
        />
      )}
    </div>
  );
};

export default PasswordInput;
