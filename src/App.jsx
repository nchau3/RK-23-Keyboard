import { useEffect, useRef, useState } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from 'recoil';

//components
import Keyboard from './components/Keyboard';

//styles
import './styles/App.scss';

function App() {
  const [keysPressed, setKeysPressed] = useState([]);

  const handleKeyDown = (event) => {
    console.log(event);
    const update = [...keysPressed, event.key];
    setKeysPressed(update);
  }

  const handleKeyUp = (event) => {
    console.log(event);
    const update = keysPressed.filter(key => key !== event.key);
    setKeysPressed(update);
  }

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    //tabIndex allows autofocus of App on load to receive keyboard inputs
    <RecoilRoot>
      <div 
        id="App"
        ref={ref}
        tabIndex={-1}
        onKeyDown={e => handleKeyDown(e)}
        onKeyUp={e => handleKeyUp(e)}>
        <h1>KEYBOARD</h1>
        <Keyboard keysPressed={keysPressed}/>
      </div>
    </RecoilRoot>
  )
}

export default App
