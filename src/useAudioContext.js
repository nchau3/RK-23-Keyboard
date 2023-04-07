import { useState } from "react";
import createNoteTable from "./noteTable";
import delayInSeconds from "./utils/delay-in-seconds";
import actuallySetTargetAtTime from "./utils/actually-set-target-at-time";
import * as voiceSelect from "./voiceSelect";

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
  const noteIds = [
    "A",
    "Ab",
    "B",
    "Bb",
    "C",
    "C#",
    "D",
    "E",
    "Eb",
    "F",
    "F#",
    "G",
  ];
  for (const noteId of noteIds) {
    oscList[i][noteId] = [];
  }
}

//manage state of all audio settings (gain, voice select, filters)
export default function useAudioContext() {
  //sliders object leaves room to implement other levels (EQ, filters)
  const [sliders, setSliders] = useState({
    masterGain: 0.5
  });

  const [voice, setVoice] = useState(voiceSelect.voice1);

  const [octaveModifier, setOctaveModifier] = useState(0);

  //gain node capped heavily to ease distortion and improve sound quality
  mainGainNode.gain.value = sliders.masterGain / 6;
  
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

    // We make a separate voice gain node,
    // so that we can fade out the voice just before we cut it off
    const voiceGainNode = audioContext.createGain();
    voiceGainNode.gain.value = 1;
    voiceNode.connect(voiceGainNode);

    // We connect the voice gain node to the main gain node
    voiceGainNode.connect(mainGainNode);

    return { voiceNode, voiceGainNode };
  };

  //start and store oscillator so it can be indexed/stopped on key release
  const notePressed = (octave, note, freq) => {
    const octaveIndex = Number(octave);
    // push this key press tone to the array.
    // note we may have multiple `playTone` entries on the same key,
    // this allows us to play a second instance of the same note before
    // the first one is fully decayed.
    oscList[octaveIndex][note].push(playTone(freq));
  }

  //retrieve active oscillator, stop playback and delete
  const noteReleased = async (octave, note) => {
    const octaveIndex = Number(octave);
    const oldestPlayedNode = oscList[octaveIndex][note].shift();
    if (oldestPlayedNode) {
      const decayTiming = 0.3;
      actuallySetTargetAtTime(oldestPlayedNode.voiceGainNode.gain, decayTiming);
      // delay to allow for decay to complete
      await delayInSeconds(decayTiming);
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