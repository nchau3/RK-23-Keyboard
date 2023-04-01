import { useState } from "react";
import createNoteTable from "./noteTable";
import * as voiceSelect from "./voiceSelect";

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

  const [octaveModifier, setOctaveModifier] = useState(0);

  mainVolumeNode.gain.value = sliders.masterVolume;
  mainGainNode.gain.value = sliders.masterGain;
  
  const changeSliders = (slider, newValue) => {
    setSliders(prev => ({...prev, [slider]: newValue}));
  }

  const changeVoice = (newVoice) => {
    setVoice(voiceSelect[newVoice]);
  }

  const convertOctave = (modifier) => {
    switch (modifier) {
      case -2:
        return 0.25;
      case -1:
        return 0.5;
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 4;
    }
  };

  const playTone = (freq) => {
    const voiceNode = audioContext.createChannelMerger();
    const actualFreq = freq * convertOctave(octaveModifier);

    for (let i = 1; i <= voice.harmonics.length; i++) {
      //stack oscillators according to specified harmonics
      const osc = audioContext.createOscillator();
      osc.type = voice.type;

      //multiples of fundamental frequency
      osc.frequency.value = actualFreq * i;

      //set gain of each harmonic
      const oscGainNode = audioContext.createGain();
      oscGainNode.gain.value = voice.harmonics[i - 1];

      osc.connect(oscGainNode);
      osc.start();
      oscGainNode.connect(voiceNode);
    }
    voiceNode.connect(mainGainNode);

    return voiceNode;
  };

  //start and store oscillator so it can be indexed/stopped on key release
  const notePressed = (octave, note, freq) => {
    const octaveIndex = Number(octave);
    //prevents duplicates
    if (!oscList[octaveIndex][note]) {
      oscList[octaveIndex][note] = playTone(freq);
    }
  }

  //retrieve active oscillator, stop playback and delete
  const noteReleased = (octave, note) => {
    const octaveIndex = Number(octave);
    if (oscList[octaveIndex][note]) {
      oscList[octaveIndex][note].disconnect();
      delete oscList[octave][note];
    }
  }

  return { 
    audioContext,
    mainGainNode,
    oscList,
    sliders,
    changeSliders,
    noteFreq,
    notePressed,
    noteReleased,
    octaveModifier,
    setOctaveModifier,
    convertOctave,
    changeVoice
   };
}