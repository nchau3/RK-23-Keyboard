export default function OctaveSwitch(props) {
  const changeOctave = (value) => {
    const newValue = props.octave + value;
    if (newValue > -3 && newValue < 3) {
      props.setOctave(newValue);
    }
  }

  return (
    <div className="octave-switch">
      <div 
        className="octave-button"
        onClick={() => changeOctave(-1)}
      ><i className="fa-solid fa-caret-left"></i></div>
      <div className="octave-display">{props.octave}</div>
      <div
        className="octave-button"
        onClick={() => changeOctave(1)}
      ><i className="fa-solid fa-caret-right"></i></div>
    </div>
  )
}