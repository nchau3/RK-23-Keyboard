//components
import Instructions from './components/Instructions';
import Keyboard from './components/Keyboard';

//styles
import './styles/App.scss';
import './styles/mobile.scss';

function App() {
  return (
    //tabIndex allows autofocus of App on load to receive keyboard inputs
      <div 
      id="App">
        <h1>RK-23 KEYBOARD</h1>
        <Keyboard />
        <Instructions />
      </div>
  )
}

export default App
