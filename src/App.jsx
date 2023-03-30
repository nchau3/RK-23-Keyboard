import { useEffect, useRef } from 'react';
import {
  atom,
  useRecoilState
} from 'recoil';

//components
import Keyboard from './components/Keyboard';

//styles
import './styles/App.scss';

//recoil state
export const keysPressedState = atom({
  key: 'keysPressedState',
  default: []
});

function App() {
  const [keysPressed, setKeysPressed] = useRecoilState(keysPressedState);

  const handleKeyDown = (event) => {
    const update = [...keysPressed, event.key];
    setKeysPressed(update);
  }

  const handleKeyUp = (event) => {
    console.log(keysPressed);
    const update = keysPressed.filter(key => key !== event.key);
    setKeysPressed(update);
  }

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    //tabIndex allows autofocus of App on load to receive keyboard inputs
      <div 
        id="App"
        ref={ref}
        tabIndex={-1}
        onKeyDown={e => handleKeyDown(e)}
        onKeyUp={e => handleKeyUp(e)}>
        <h1>KEYBOARD</h1>
        <Keyboard />
      </div>
  )
}

export default App
