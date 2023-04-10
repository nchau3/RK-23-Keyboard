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
      <ul className="voice-select">
        <li 
          className={selected === voice.name ? "selected" : ""}
          onClick={() => changeVoice("voice1")}
          >
            {voice.name.toUpperCase()}</li>
          <li 
          className={selected === "voice2" ? "selected" : ""}
          onClick={() => changeVoice("voice2")}
          >
            VOICE 2</li>
          <li 
          className={selected === "voice3" ? "selected" : ""}
          onClick={() => changeVoice("voice3")}
          >
            VOICE 3</li>
      </ul>
    </div>
  )
}