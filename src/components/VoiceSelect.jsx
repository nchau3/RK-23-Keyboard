export default function VoiceSelect(props) {
  const { voice, onSelect } = props;

  return (
    <div className="voice-select-container">
      <label htmlFor="voice-select">VOICE SELECT</label>
      <div className="voice-select">
        <div 
          className="control-button"
          onClick={() => onSelect(-1)}
        ><i className="fa-solid fa-caret-left"></i></div>
        <div className="voice-display">
          <div>{voice.name.toUpperCase()}</div>
          <div>{voice.id}</div>
        </div>
        <div 
          className="control-button"
          onClick={() => onSelect(1)}
        ><i className="fa-solid fa-caret-right"></i></div>
      </div>
    </div>
  )
}