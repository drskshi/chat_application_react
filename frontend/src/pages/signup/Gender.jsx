import React from "react";

const Gender = ({ onSelect, selectedGender }) => {
  return (
    <div className="flex gap-2">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text text-white">Male</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-blue-500 border-black ml-1"
            checked={selectedGender === "male"}
            onChange={() => onSelect("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text text-white">Female </span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-pink-500 border-gray-900 ml-1"
            checked={selectedGender === "female"}
            onChange={() => onSelect("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default Gender;
