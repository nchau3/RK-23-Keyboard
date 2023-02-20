//components
import Controls from "./Controls";
import Key from "./Key";

//hooks
import useAudioContext from "../useAudioContext";

//styles
import "../styles/component-styles/keyboard.scss";

export default function Keyboard() {
  const { audioContext, mainGainNode, oscList, volume, changeVolume, noteFreq } = useAudioContext();

  const playTone = (freq) => {
    const osc = audioContext.createOscillator();
    osc.frequency.value = freq;
    osc.connect(mainGainNode);
    osc.start();

    return osc;
  }

  return (
    <div className="keyboard">
      <Controls />
      <div className="keys-container">
        <Key />
      </div>
    </div>
  )
}