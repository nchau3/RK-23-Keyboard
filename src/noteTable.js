export default function createNoteTable() {
  const noteFreq = [];
  for (let i = 0; i < 9; i++) {
    noteFreq[i] = [];
  }

  noteFreq[2]["A"] = 110;
  noteFreq[2]["Bb"] = 116.54;
  noteFreq[2]["B"] = 123.47;
  noteFreq[3]["C"] = 130.81;
  noteFreq[3]["C#"] = 138.59;
  noteFreq[3]["D"] = 146.83;
  noteFreq[3]["Eb"] = 155.56;
  noteFreq[3]["E"] = 164.81;
  noteFreq[3]["F"] = 174.61;
  noteFreq[3]["F#"] = 185;
  noteFreq[3]["G"] = 196;
  noteFreq[3]["Ab"] = 207.65;
  noteFreq[3]["A"] = 220;
  noteFreq[3]["Bb"] = 233.08;
  noteFreq[3]["B"] = 246.94;
  noteFreq[4]["C"] = 261.63;
  noteFreq[4]["C#"] = 277.18;
  noteFreq[4]["D"] = 293.66;
  noteFreq[4]["Eb"] = 311.13;
  noteFreq[4]["E"] = 329.63;
  noteFreq[4]["F"] = 349.23;
  noteFreq[4]["F#"] = 369.99;
  noteFreq[4]["G"] = 392;
  noteFreq[4]["Ab"] = 415.30;
  noteFreq[4]["A"] = 440;
  noteFreq[4]["Bb"] = 466.16;
  noteFreq[4]["B"] = 493.88;
  noteFreq[5]["C"] = 523.25;
  noteFreq[5]["C#"] = 554.37;
  noteFreq[5]["D"] = 587.33;
  noteFreq[5]["Eb"] = 622.25;
  noteFreq[5]["E"] = 659.25;
  noteFreq[5]["F"] = 698.46;
  noteFreq[5]["F#"] = 739.99;
  noteFreq[5]["G"] = 783.99;
  noteFreq[5]["Ab"] = 830.61;
  noteFreq[5]["A"] = 880;
  noteFreq[5]["Bb"] = 932.33;
  noteFreq[5]["B"] = 987.77;
  noteFreq[6]["C"] = 1046.50;

  return noteFreq;
}