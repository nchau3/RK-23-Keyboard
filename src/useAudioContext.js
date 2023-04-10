import { useState } from "react";
import createNoteTable from "./noteTable";
import delayInSeconds from "./utils/delay-in-seconds";
import actuallySetTargetAtTime from "./utils/actually-set-target-at-time";
import * as voiceSelect from "./voiceSelect";

//context and main nodes declared outside of component
const audioContext = new AudioContext();
const mainGainNode = audioContext.createGain();
const splitterNode = audioContext.createChannelSplitter(2);
const compressorNode = new DynamicsCompressorNode(audioContext, {
  attack: 0.001,
  threshold: -55
});


//routing
splitterNode.connect(audioContext.destination);
compressorNode.connect(splitterNode);
mainGainNode.connect(compressorNode);

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
    gain: 0.1048
  });

  const [voice, setVoice] = useState(voiceSelect.voice1);

  const [octaveModifier, setOctaveModifier] = useState(0);

  //gain node capped heavily to ease distortion and improve sound quality
  mainGainNode.gain.value = sliders.gain / 10;
  
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
    const actualFreq = freq * convertOctave(octaveModifier);
    const harmonics = voice.harmonics;
    const attack = voice.envelope.attack;

    const voiceNode = audioContext.createChannelMerger(harmonics.length);

    for (let i = 1; i <= harmonics.length; i++) {
      //stack oscillators according to specified harmonics
      const osc = audioContext.createOscillator();

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
    voiceGainNode.gain.value = 0;
    voiceNode.connect(voiceGainNode);

    // We connect the voice gain node to the main gain node
    voiceGainNode.connect(mainGainNode);

    //attack envelope
    actuallySetTargetAtTime(voiceGainNode.gain, 1, audioContext.currentTime, attack);

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
      const release = voice.envelope.release;
      actuallySetTargetAtTime(
        oldestPlayedNode.voiceGainNode.gain,
        0,
        audioContext.currentTime,
        release
      );
      // delay to allow for decay to complete
      await delayInSeconds(release);
      oldestPlayedNode.voiceNode.disconnect();
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