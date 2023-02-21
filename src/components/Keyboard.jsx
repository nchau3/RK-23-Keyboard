//components
import Controls from "./Controls";
import Key from "./Key";

//hooks
import useAudioContext from "../useAudioContext";

//styles
import "../styles/component-styles/keyboard.scss";

export default function Keyboard() {
  const { audioContext, mainGainNode, oscList, masterGain, changeMasterGain, noteFreq } = useAudioContext();

  const playTone = (freq, harmonicArray) => {
    const voiceNode = audioContext.createChannelMerger();

    for (let i = 1; i <= harmonicArray.length; i++) {
      //stack oscillators according to specified harmonics
      const osc = audioContext.createOscillator();

      //multiples of fundamental frequency
      osc.frequency.value = freq * i;

      //set gain of each harmonic
      const oscGainNode = audioContext.createGain();
      oscGainNode.gain.value = harmonicArray[i - 1];

      osc.connect(oscGainNode);
      osc.start();
      oscGainNode.connect(voiceNode);
    }
    voiceNode.connect(mainGainNode);

    return voiceNode;
  }

  //start and store oscillator so it can be indexed/stopped on key release
  const notePressed = (octave, note, freq, harmonicArray) => {
    const octaveIndex = Number(octave);
    oscList[octaveIndex][note] = playTone(freq, harmonicArray);
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
          onMouseDown={notePressed}
          onMouseUp={noteReleased}
        />
      )
    })
  })

  return (
    <div className="keyboard">
      <Controls masterGain={masterGain} onChange={changeMasterGain}/>
      <div className="keys-container">
        {pianoKeys}
      </div>
    </div>
  )
}