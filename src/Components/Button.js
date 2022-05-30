import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <div>
      <button className={props.btnClass} onClick={props.onAddClick}>
        {props.btnValue}
      </button>
    </div>
  );
};

export default Button;
