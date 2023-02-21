import { useState } from "react";
import createNoteTable from "./noteTable";
import * as voiceSelect from "./voices";

//context and main nodes declared outside of component
const audioContext = new AudioContext();
const mainVolumeNode = audioContext.createGain();
const mainGainNode = audioContext.createGain();
mainVolumeNode.connect(audioContext.destination);
mainGainNode.connect(mainVolumeNode);

//note frequencies array
const noteFreq = createNoteTable();

//set empty octave objects to manage active pitches
const oscList = [];

for (let i = 0; i < 9; i++) {
  oscList[i] = {};
}

//manage state of all audio settings (gain, voice select, filters)
export default function useAudioContext() {
  const [sliders, setSliders] = useState({
    masterVolume: 0.5,
    masterGain: 0.5
  });

  const [voice, setVoice] = useState(voiceSelect.voice1);

  mainVolumeNode.gain.value = sliders.masterVolume;
  mainGainNode.gain.value = sliders.masterGain;
  
  const changeSliders = (slider, newValue) => {
    setSliders(prev => ({...prev, [slider]: newValue}));
  }

  const changeVoice = (newVoice) => {
    setVoice(voiceSelect[newVoice]);
  }

  return { 
    audioContext,
    mainGainNode,
    oscList,
    sliders,
    changeSliders,
    noteFreq,
    voice,
    changeVoice
   };
}