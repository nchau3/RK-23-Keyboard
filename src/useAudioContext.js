import { useState } from "react";
import createNoteTable from "./noteTable";

//context and main nodes declared outside of component
const audioContext = new AudioContext();
const mainGainNode = audioContext.createGain();
mainGainNode.connect(audioContext.destination);

//note frequencies array
const noteFreq = createNoteTable();

//set empty octave objects to manage active pitches
const oscList = [];

for (let i = 0; i < 9; i++) {
  oscList[i] = {};
}

export default function useAudioContext() {
  const [masterGain, setMasterGain] = useState(0.25);

  mainGainNode.gain.value = masterGain;
  
  const changeMasterGain = (newValue) => {
    setMasterGain(newValue);
  }

  return { audioContext, mainGainNode, oscList, masterGain, changeMasterGain, noteFreq };
}