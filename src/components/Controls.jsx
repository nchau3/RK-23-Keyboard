//components
import OctaveSwitch from "./OctaveSwitch";
import VoiceSelect from "./VoiceSelect";

//styles
import "../styles/component-styles/controls.scss"
import Slider from "./Slider";

export default function Controls(props) {
  const { masterGain } = props.sliders;

  return (
    <div className="controls">
      <Slider gain={masterGain} onChange={props.onChange} />
      <span className="lower-bar">
        <VoiceSelect onSelect={props.onSelect} />
        <OctaveSwitch octave={props.octave} setOctave={props.setOctave}/>
      </span>
    </div>
  )
}