import { useState } from "react";

//context and main nodes declared outside of component
const audioContext = new AudioContext();
const mainGainNode = audioContext.createGain();
mainGainNode.connect(audioContext.destination);

//set empty octave objects to manage active pitches
const oscList = [];

for (let i = 0; i < 9; i++) {
  oscList[i] = {};
}

export default function useAudioContext() {
  const [volume, setVolume] = useState(0.25);

  mainGainNode.gain.value = volume;
  
  const changeVolume = (newValue) => {
    setVolume(newValue);
  }

  return { audioContext, mainGainNode, oscList, volume, changeVolume };
}