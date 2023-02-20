//styles
import "../styles/component-styles/controls.scss"

export default function Controls() {
  return (
    <div className="controls">
      <div className="slider-container">
        <span>Master Gain:</span>
        <input
          type="range"
          id="volume"
          min="0.0"
          max="1.0"
          step="0.01"
          value="0.5"
          list="volumes"
          name="volume" />
      </div>
    </div>
  )
}