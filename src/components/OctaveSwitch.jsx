export default function OctaveSwitch(props) {
  const { octave, setOctave } = props;

  const changeOctave = (value) => {
    const newValue = octave + value;
    if (newValue > -3 && newValue < 3) {
      setOctave(newValue);
    }
  }

  return (
    <div className="octave-switch-container">
      <label htmlFor="octave-switch">OCTAVE</label>
      <div className="octave-switch">
        <div 
          className="control-button"
          onClick={() => changeOctave(-1)}
          ><i className="fa-solid fa-caret-left"></i>
        </div>
        <div className="octave-display">
          {octave}
        </div>
        <div
          className="control-button"
          onClick={() => changeOctave(1)}
          ><i className="fa-solid fa-caret-right"></i>
        </div>
      </div>
    </div>
  )
}