import { useState } from "react";

export default function Key(props) {
  const [keydown, setKeydown] = useState(false);

  const { octave, note, freq, whiteKey, onMouseUp, onMouseDown } = props;

  const notePressed = (event) => {
    //check for primary mouse button
    if (event.buttons & 1) {
      if (!keydown) {
        onMouseDown(octave, note, freq);
        setKeydown(true);
      }
    }
  }

  const noteReleased = () => {
    if (keydown) {
      onMouseUp(octave, note);
      setKeydown(false);
    }
  }

  return (
    //mouseOver and mouseLeave events allow for dragging over notes
    <div 
      className={whiteKey ? "key key-white" : "key key-black"}
      onMouseDown={e => notePressed(e)}
      onMouseOver={e => notePressed(e)}
      onMouseUp={() => noteReleased()}
      onMouseLeave={() => noteReleased()}>
    </div>
  )
}