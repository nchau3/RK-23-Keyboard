import { useState } from "react";

export default function SliderBar(props) {

  const selectHandler = (newValue) => {
    props.onChange("masterGain", newValue / 50);
  }

  return (
    <div 
      className={`slider-bar ${props.active ? "active" : ""}`}
      onClick={() => selectHandler(props.value)}
      onMouseOver={() => selectHandler(props.value)}
      >
    </div>
  )
}