import React from "react";
import { IconContext } from "react-icons";
import { FaInfoCircle } from "react-icons/fa";

const Icon = () => {
  return (
    <div className="custom-icon">
      <IconContext.Provider value={{ className: "" }}>
        <FaInfoCircle />
      </IconContext.Provider>
    </div>
  );
};

export default Icon;
