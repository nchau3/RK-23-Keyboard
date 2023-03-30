import { useState } from "react";
import { useRecoilValue } from "recoil";
import { keysPressedState } from "../App";

export default function Key(props) {
  const [keydown, setKeydown] = useState(false);
  const keysPressed = useRecoilValue(keysPressedState);

  const { octave, note, freq, notePressed, noteReleased, whiteKey } = props;

  const notePressedHandler = (event) => {
    //check for primary mouse button
    if (event.buttons & 1) {
      if (!keydown) {
        notePressed(octave, note, freq);
        setKeydown(true);
      }
    }
  }

  const noteReleasedHandler = () => {
    if (keydown) {
      noteReleased(octave, note);
      setKeydown(false);
    }
  }

  return (
    //mouseOver and mouseLeave events allow for dragging over notes
    <div 
      className={whiteKey ? "key key-white" : "key key-black"}
      onMouseDown={e => notePressedHandler(e)}
      onMouseOver={e => notePressedHandler(e)}
      onMouseUp={() => noteReleasedHandler()}
      onMouseLeave={() => noteReleasedHandler()}>
    </div>
  )
}