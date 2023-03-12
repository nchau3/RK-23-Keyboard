//styles
import "../styles/component-styles/controls.scss"
import OctaveSwitch from "./OctaveSwitch";
import VoiceSelect from "./VoiceSelect";

export default function Controls(props) {
  const { masterVolume, masterGain } = props.sliders;

  return (
    <div className="controls">
      <div className="slider-container">
        <span>Master Volume:</span>
        <input
          type="range"
          id="master_gain"
          min="0.0"
          max="1.0"
          step="0.01"
          value={`${masterVolume}`}
          name="master_gain" 
          onChange={e => props.onChange("masterVolume", e.target.value)}/>
      </div>
      <div className="slider-container">
        <span>Master Gain:</span>
        <input
          type="range"
          id="master_gain"
          min="0.0"
          max="1.0"
          step="0.01"
          value={`${masterGain}`}
          name="master_gain" 
          onChange={e => props.onChange("masterGain", e.target.value)}/>
      </div>
      <span className="lower-bar">
        <VoiceSelect onSelect={props.onSelect} />
        <OctaveSwitch />
      </span>
    </div>
  )
}