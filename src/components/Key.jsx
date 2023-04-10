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
    keysPressed,
    blackKeyProps
  } = props;

  const keyClassNames = `${whiteKey ? "key key-white" : "key key-black"} ${keydown ? "keydown" : ""}`;

  //detecting viewport dimensions for mobile touch events instead of click events
  const width = window.outerWidth;
  const height = window.outerHeight;
  const isLandScape = width > height ? true : false;

  useEffect(() => {
    if (!keydown && keysPressed.includes(input)) {
      setKeydown(true);
    } else if (keydown && !keysPressed.includes(input)) {
      setKeydown(false);
    }
  }, [keysPressed])

  /**
	 * When keydown state changes, call notePressed or noteReleased
	 */
	useEffect(() => {
		if (keydown === true) {
			notePressed(octave, note, freq);
		} else if (keydown === false) {
			noteReleased(octave, note);
		}
	}, [keydown]);

  const notePressedHandler = (event) => {
    event.stopPropagation();
    //check for primary mouse button
    if ((event.buttons & 1) && width > 800) {
      if (!keydown) {
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

  const touchStartHandler = () => {
    if ((!isLandScape && width < 480) || (isLandScape && width < 800)) {
      if (!keydown) {
        setKeydown(true);
      }
    }
  }

  const touchEndHandler = () => {
    if ((!isLandScape && width < 480) || (isLandScape && width < 800)) {
      if (keydown) {
        setKeydown(false);
      }
    }
  }

  return (
    //mouseOver and mouseLeave events allow for dragging over notes
    <div 
      className={keyClassNames}
      onMouseDown={e => notePressedHandler(e)}
      onMouseOver={e => notePressedHandler(e)}
      onMouseUp={() => noteReleasedHandler()}
      onMouseLeave={() => noteReleasedHandler()}
      onTouchStart={() => touchStartHandler()}
      onTouchEnd={() => touchEndHandler()}>
      {blackKeyProps && 
        <Key 
          key={blackKeyProps.key}
          note={blackKeyProps.note}
          octave={blackKeyProps.octave}
          freq={blackKeyProps.freq}
          notePressed={blackKeyProps.notePressed}
          noteReleased={blackKeyProps.noteReleased}
          keyDown={blackKeyProps.keyDown}
          keyUp={blackKeyProps.keyUp}
          input={blackKeyProps.input}
          keysPressed={blackKeyProps.keysPressed}
          whiteKey={blackKeyProps.whiteKey}
        />
      }
    </div>
  )
}