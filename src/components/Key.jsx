import { useEffect, useState } from "react";

export default function Key(props) {
  const [keydown, setKeydown] = useState(false);

  const { 
    octave,
    note,
    freq, 
    notePressed, 
    noteReleased, 
    input, 
    whiteKey, 
    keysPressed 
  } = props;

  useEffect(() => {
    
    if (!keydown && keysPressed.includes(input)) {
      notePressed(octave, note, freq);
      setKeydown(true);
    } else if (keydown && !keysPressed.includes(input)) {
      noteReleased(octave, note);
      setKeydown(false);
    }
  }, [keysPressed])

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