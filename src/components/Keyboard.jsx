//components
import Controls from "./Controls";
import Key from "./Key";

//hooks
import useAudioContext from "../useAudioContext";

//styles
import "../styles/component-styles/keyboard.scss";
import { useState } from "react";

export default function Keyboard() {
  const { 
    sliders,
    changeSliders,
    noteFreq,
    notePressed,
    noteReleased,
    changeVoice,
    octaveModifier,
    setOctaveModifier
   } = useAudioContext();

  const pianoKeys = noteFreq.map((keys, index) => {
    const keyList = Object.entries(keys);
    const keyboardInputs = ['a', 'w', 's', 'd', 'r', 'f', 't', 'g', 'h', 'u', 'j', 'i', 'k', 'o', 'l', ';'];

    let i = -1;

    return keyList.map((key) => {
      i++;
      return (
        <Key 
          key={key[0]}
          note={key[0]}
          octave={index}
          freq={key[1]}
          notePressed={notePressed}
          noteReleased={noteReleased}
          input={keyboardInputs[i]}
          whiteKey={key[0].length === 2 ? false : true}
        />
      )
    })
  })

  return (
    <div className="keyboard">
      <Controls 
        sliders={sliders} 
        onChange={changeSliders}
        onSelect={changeVoice}
        octave={octaveModifier}
        setOctave={setOctaveModifier} />
      <div className="keys-container">
        {pianoKeys}
      </div>
    </div>
  )
}