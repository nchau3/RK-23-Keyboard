import { useEffect, useRef, useState } from "react";

export default function Key(props) {
  const [keydown, setKeydown] = useState(false);
  const ref = useRef();

  const {
    id,
    octave,
    note,
    freq, 
    notePressed, 
    noteReleased, 
    input, 
    whiteKey, 
    keysPressed,
    blackKeyProps,
    whiteKeyRef,
    whiteKeyRelease
  } = props;

  const keyClassNames = `${whiteKey ? "key-white" : "key-black"} ${keydown ? "keydown" : ""}`;

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
	}, [keydown])

  const notePressedHandler = (event) => {
    event.stopPropagation();

    if ((event.buttons & 1) && width > 800) {
      //allows release of parent white keys
      if (whiteKeyRef) {
        whiteKeyRelease()
      }
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

  const touchStartHandler = (event) => {
    event.stopPropagation();
    if ((!isLandScape && width < 480) || (isLandScape && height < 480)) {
      if (!keydown) {
        setKeydown(true);
      }
    }
  }

  const touchEndHandler = (event) => {
    if ((!isLandScape && width < 480) || (isLandScape && height < 480)) {
      if (keydown) {
        setKeydown(false);
      }
    }
  }

  return (
    //mouseOver and mouseLeave events allow for dragging over notes
    <div
      id={id}
      ref={ref}
      className={keyClassNames}
      onMouseDown={e => notePressedHandler(e)}
      onMouseOver={e => notePressedHandler(e)}
      onMouseUp={() => noteReleasedHandler()}
      onMouseLeave={() => noteReleasedHandler()}
      onTouchStart={e => touchStartHandler(e)}
      onTouchEnd={() => touchEndHandler()}>
      {blackKeyProps && 
        <Key 
          whiteKeyRef={ref.current}
          whiteKeyRelease={noteReleasedHandler}
          id={blackKeyProps.id}
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