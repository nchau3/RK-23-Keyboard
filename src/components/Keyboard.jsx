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

  //start and store oscillator so it can be indexed/stopped on key release
  const notePressed = (octave, note, freq) => {
    const octaveIndex = Number(octave);
    oscList[octaveIndex][note] = playTone(freq);
  }

  //retrieve active oscillator, stop playback and delete
  const noteReleased = (octave, note) => {
    const octaveIndex = Number(octave);
    oscList[octaveIndex][note].disconnect();
    delete oscList[octave][note];
  }

  const pianoKeys = noteFreq.map((keys, index) => {
    const keyList = Object.entries(keys);

    return keyList.map((key) => {
      return (
        <Key 
          key={key[0]}
          note={key[0]}
          octave={index}
          freq={key[1]}
          whiteKey={key[0].length === 2 ? false : true}
          notePressed={notePressed}
          noteReleased={noteReleased}
        />
      )
    })
  })

  return (
    <div className="keyboard">
      <Controls />
      <div className="keys-container">
        {pianoKeys}
      </div>
    </div>
  )
}