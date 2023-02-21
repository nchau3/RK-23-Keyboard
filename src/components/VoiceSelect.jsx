import { useState } from "react"

export default function VoiceSelect() {
  const [selected, setSelected] = useState("voice1");

  const changeVoice = (newVoice) => {
    setSelected(newVoice);
  }

  return (
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
  )
}