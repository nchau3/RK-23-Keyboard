//components
import Keyboard from './components/Keyboard';

//styles
import './styles/App.scss';

function App() {
  return (
    //tabIndex allows autofocus of App on load to receive keyboard inputs
      <div 
      id="App">
        <h1>KEYBOARD</h1>
        <Keyboard />
      </div>
  )
}

export default App
