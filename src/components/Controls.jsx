//components
import OctaveSwitch from "./OctaveSwitch";
import VoiceSelect from "./VoiceSelect";

//styles
import "../styles/component-styles/controls.scss"
import Slider from "./Slider";

export default function Controls(props) {
  const { gain } = props.sliders;

  return (
    <div className="controls">
      <Slider 
        name={"gain"}
        minPos={1}
        maxPos={50}
        minVal={0}
        maxVal={100}
        value={gain}
        onChange={props.onChange} />
      <span className="lower-bar">
        <VoiceSelect voice={props.voice} onSelect={props.onSelect} />
        <OctaveSwitch octave={props.octave} setOctave={props.setOctave}/>
      </span>
    </div>
  )
}