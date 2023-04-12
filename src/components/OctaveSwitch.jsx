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
        <div className="octave-display">
          {octave}
        </div>
        <div className="button-container">
          <div
            className="control-button"
            onClick={() => changeOctave(1)}
            >
          <i class="fa-solid fa-plus"></i>
          </div>
          <div 
            className="control-button"
            onClick={() => changeOctave(-1)}
            >
          <i class="fa-solid fa-minus"></i>
          </div>
        </div>
      </div>
    </div>
  )
}