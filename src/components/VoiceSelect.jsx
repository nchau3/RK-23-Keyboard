export default function VoiceSelect(props) {
  const { voice, onSelect } = props;

  return (
    <div className="voice-select-container">
      <label htmlFor="voice-select">VOICE SELECT</label>
      <div className="voice-select">
        <div className="voice-display">
          <div>{voice.name.toUpperCase()}</div>
          <div>{voice.id}</div>
        </div>
        <div className="button-container">
          <div 
            className="control-button"
            onClick={() => onSelect(1)}>
            <i className="fa-solid fa-plus"></i>
          </div>
          <div 
            className="control-button"
            onClick={() => onSelect(-1)}>
            <i className="fa-solid fa-minus"></i>
          </div>
        </div>
      </div>
    </div>
  )
}