import { useEffect, useState } from "react";
import SliderBar from "./SliderBar";

export default function Slider(props) {
  const { gain, onChange } = props;
  const [gainMeter, setGainMeter] = useState(0);

  const getSlider = () => {
    const sliderBars = []
    for (let i = 1; i <= 50; i++) {
      sliderBars.push(i);
    }

    return sliderBars.map(bar => {
      return (
        <SliderBar
          key={`slider-${bar}`}
          value={bar}
          onClick={onChange}
          active={bar <= gainMeter ? true : false} />
      )
    })
  }

  useEffect(() => {
    setGainMeter(gain * 50);
  }, [gain]);

  return (
    <div className="slider-container">
      <label htmlFor="slider">GAIN</label>
      <div className="slider">
        <div className="slider-bar-container">
          {getSlider()}
        </div>
      </div>
    </div>
  )
}