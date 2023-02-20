//components
import Controls from "./Controls";
import Key from "./Key";

//styles
import "../styles/component-styles/keyboard.scss";

export default function Keyboard() {
  return (
    <div className="keyboard">
      <Controls />
      <div className="keys-container">
        <Key />
      </div>
    </div>
  )
}