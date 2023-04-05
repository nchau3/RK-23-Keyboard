import { useState } from "react"

export default function VoiceSelect(props) {
  const [selected, setSelected] = useState("voice1");

  const changeVoice = (newVoice) => {
    props.onSelect(newVoice);
    setSelected(newVoice);
  }

  return (
    <div className="voice-select-container">
      <label htmlFor="voice-select">VOICE SELECT</label>
      <ul className="voice-select">
        <li 
          className={selected === "voice1" ? "selected" : ""}
          onClick={() => changeVoice("voice1")}
          >
            VOICE 1</li>
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