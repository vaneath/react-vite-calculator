import React from "react";

const KeyButton = ({ label, onClick, className = "" }) => {
  return (
    <button
      className={`flex items-center justify-center text-white text-center bg-neutral-800 size-20 rounded-full text-3xl hover:bg-neutral-700 ${className}`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default KeyButton;
