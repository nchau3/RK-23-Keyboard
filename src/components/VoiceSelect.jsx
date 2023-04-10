import { useState } from "react"

export default function VoiceSelect(props) {
  const { voice, onSelect } = props;
  const [selected, setSelected] = useState(voice.name);

  const changeVoice = (newVoice) => {
    onSelect(newVoice);
    setSelected(newVoice);
  }

  return (
    <div className="voice-select-container">
      <label htmlFor="voice-select">VOICE SELECT</label>
      <div className="voice-select">
        <div className="control-button"><i className="fa-solid fa-caret-left"></i></div>
        <div className="voice-display">
          <div 
            className="voice-name"
            onClick={() => changeVoice("voice1")}
            >
              {voice.name.toUpperCase()}</div>
        </div>
        <div className="control-button"><i className="fa-solid fa-caret-right"></i></div>
      </div>
    </div>
  )
}