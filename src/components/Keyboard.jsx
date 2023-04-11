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
    voice,
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

  let inputIndex = -1;

  const pianoKeys = noteFreq.map((keys, octaveIndex) => {
    const keyList = Object.entries(keys);
    const keyboardInputs = ['a', 'w', 's', 'd', 'r', 'f', 't', 'g', 'h', 'u', 'j', 'i', 'k', 'o', 'l', ';'];
    
    return keyList.map((key, keyIndex) => {
      inputIndex++;

      const noteIndex = Object.keys(noteFreq[octaveIndex])[keyIndex];

      //check the next note in noteFreq to check for blackKey
      const getNextNote = () => {
        if (keyIndex + 1 < keyList.length) {
          return keyList[keyIndex + 1];
        } else if (Object.keys(noteFreq[octaveIndex + 1]).length > 0) {
          return Object.keys(noteFreq[octaveIndex + 1])[0];
        } else {
          return null;
        }
      }

      const next = getNextNote();

      const isBlackKey = (note) => {
        if (note.length === 2) {
          return true;
        }
        return false;
      };

      // only render white keys at this stage, passing the next black key's props
      // blackKeys will be rendered as children of their preceding white key for styling purposes
      if (next && !isBlackKey(noteIndex) && isBlackKey(next[0])) {
        const blackKeyProps = {
          id: `${next[0]}${next[1].toString().slice(0, 3)}`,
          key: `${next[0]}${next[1].toString().slice(0, 3)}`,
          note: next[0],
          octave: octaveIndex,
          freq: next[1],
          notePressed: notePressed,
          noteReleased: noteReleased,
          keyDown: handleKeyDown,
          keyUp: handleKeyUp,
          input: keyboardInputs[inputIndex + 1],
          keysPressed: keysPressed,
          whiteKey: false
        }

        return (
          <div className="key-wrapper" key={`key-wrapper ${octaveIndex}-${keyIndex}`}>
            <Key
              id={`${key[0]}${key[1].toString().slice(0, 3)}`}
              key={`${key[0]}${key[1].toString().slice(0, 3)}`}
              note={key[0]}
              octave={octaveIndex}
              freq={key[1]}
              notePressed={notePressed}
              noteReleased={noteReleased}
              keyDown={handleKeyDown}
              keyUp={handleKeyUp}
              input={keyboardInputs[inputIndex]}
              keysPressed={keysPressed}
              whiteKey={!isBlackKey(key[0])}
              blackKeyProps={blackKeyProps}
            />
          </div>
          )
      }
      else if (!isBlackKey(noteIndex)){
        return (
          <div className="key-wrapper" key={`key-wrapper ${octaveIndex}-${keyIndex}`}>
            <Key 
            id={`${key[0]}${key[1].toString().slice(0, 3)}`}
            key={`${key[0]}${key[1].toString().slice(0, 3)}`}
            note={key[0]}
            octave={octaveIndex}
            freq={key[1]}
            notePressed={notePressed}
            noteReleased={noteReleased}
            keyDown={handleKeyDown}
            keyUp={handleKeyUp}
            input={keyboardInputs[inputIndex]}
            keysPressed={keysPressed}
            whiteKey={!isBlackKey(key[0])}
            />
          </div>
        )
      }
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
        voice={voice}
        onSelect={changeVoice}
        octave={octaveModifier}
        setOctave={setOctaveModifier} />
      <div className="keys-container">
        {pianoKeys}
      </div>
    </div>
  )
}