import { useEffect, useState } from "react";
import SliderBar from "./SliderBar";

export default function Slider(props) {
  const { name, min, max, gain, onChange } = props;
  const [gainMeter, setGainMeter] = useState(0);

  const getSlider = () => {
    const sliderBars = []
    for (let i = min; i <= max; i++) {
      sliderBars.push(i);
    }

    return sliderBars.map(bar => {
      return (
        <SliderBar
          key={`slider-${bar}`}
          name={name}
          value={bar}
          onChange={onChange}
          active={bar <= gainMeter ? true : false} />
      )
    })
  }

  useEffect(() => {
    setGainMeter(gain * 50);
  }, [gain]);

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