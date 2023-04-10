import { useEffect, useState } from "react";
import SliderBar from "./SliderBar";
import Log from "../utils/logarithmic-sliders";

export default function Slider(props) {
  const { name, minPos, maxPos, minVal, maxVal, value, onChange } = props;
  const [sliderPosition, setSliderPosition] = useState(0);

  const log = new Log({
    minPos: minPos,
    maxPos: maxPos,
    minVal: minVal,
    maxVal: maxVal
  });

  const calculateValue = (position) => {
    if (position === 0) {
      return 0;
    } 
    const value = log.value(position);

    if (value > 1000) {
      return Math.round(value/100) * 100;
    } else if (value > 500) {
      return Math.round(value / 10) * 10;
    } else {
      return value / 100;
    }
  }

  const handleChange = (newPosition) => {
    onChange(name, calculateValue(newPosition));
  }

  const getSlider = () => {
    const sliderBars = []
    for (let i = minPos; i <= maxPos; i++) {
      sliderBars.push(i);
    }

    return sliderBars.map(bar => {
      return (
        <SliderBar
          key={`slider-${bar}`}
          name={name}
          value={bar}
          onChange={handleChange}
          active={bar <= sliderPosition ? true : false} />
      )
    })
  }

  useEffect(() => {
    setSliderPosition(log.position(value * 100));
  }, [value]);

  return (
    <div className="slider-container">
      <label htmlFor={`${name}-slider`}>{name.toUpperCase()}</label>
      <div className="slider">
        <div className="slider-bar-container">
          {getSlider()}
        </div>
      </div>
    </div>
  )
}