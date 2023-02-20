//styles
import "../styles/component-styles/controls.scss"

export default function Controls(props) {
  return (
    <div className="controls">
      <div className="slider-container">
        <span>Master Gain:</span>
        <input
          type="range"
          id="master_gain"
          min="0.0"
          max="1.0"
          step="0.01"
          value={`${props.masterGain}`}
          name="master_gain" 
          onChange={e => props.onChange(e.target.value)}/>
      </div>
    </div>
  )
}