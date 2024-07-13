import React from "react";
import "./index.css";
import { useState } from "react";

const InputBox = ({ handleAdd }) => {
  const [item, setItem] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item?.trim()) {
      console.log({ item });
      handleAdd(item);
      setItem("");
    }
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        name="item"
        className="input-box"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button type="submit" className="submit-btn">
        Go
      </button>
    </form>
  );
};

export default InputBox;
