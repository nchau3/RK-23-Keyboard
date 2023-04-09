//components
import Controls from "./Controls";
import Key from "./Key";

//hooks
import useAudioContext from "../useAudioContext";
import useMidiController from "../hooks/use-midi-controller";
import { useState, useRef, useEffect } from "react";

//styles
import "../styles/component-styles/keyboard.scss";

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

  useMidiController({ notePressed, noteReleased });

  const [keysPressed, setKeysPressed] = useState([]);

  const handleKeyDown = (event) => {
    const update = [...keysPressed, (event.key).toLowerCase()];
    setKeysPressed(update);
  }

  const handleKeyUp = (event) => {
    const update = keysPressed.filter(key => key !== (event.key).toLowerCase());
    setKeysPressed(update);
  }

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  let i = -1;

  const pianoKeys = noteFreq.map((keys, index) => {
    const keyList = Object.entries(keys);
    const keyboardInputs = ['a', 'w', 's', 'd', 'r', 'f', 't', 'g', 'h', 'u', 'j', 'i', 'k', 'o', 'l', ';'];
    
    return keyList.map((key) => {
      i++;
      return (
        <Key 
          key={`${key[0]}${key[1]}`}
          note={key[0]}
          octave={index}
          freq={key[1]}
          notePressed={notePressed}
          noteReleased={noteReleased}
          keyDown={handleKeyDown}
          keyUp={handleKeyUp}
          input={keyboardInputs[i]}
          keysPressed={keysPressed}
          whiteKey={key[0].length === 2 ? false : true}
        />
        )
      })
    })

  return (
    <div className="keyboard"
      ref={ref}
      tabIndex={-1}
      onKeyDown={e => handleKeyDown(e)}
      onKeyUp={e => handleKeyUp(e)}>
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