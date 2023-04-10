//each voice has an array of values which represent the relative gain of each overtone above the fundamental frequency

class Voice {
  constructor(id, name, harmonics, envelope) {
    this.id = id;
    this.name = name;
    this.harmonics = harmonics;
    this.envelope = envelope;
  }
}

const voiceLibrary = [
  new Voice(
    1,
    "first",
    [1, 1, 0.6, 1.3, 0.02, 0.04, 0.03],
    {
      attack: 0.001,
      release: 0.2
    }
  ),
  new Voice(
    2,
    "second",
    [1.4, 0.1, 0.8, 0.06, 0.09, 0.02, 0.003, 0.003, 0.001, 0.001, 0.002],
    {
      attack: 0.01,
      release: 0.35
    }
  ),
  new Voice(
    3,
    "third",
    [1.7, 1.4, 0.07, 0.05, 0.003, 0.1, 0.001, 0.002, 0.01, 0.01, 0.001, 0.002, 0.006],
    {
      attack: 0.2,
      release: 0.05
    }
  )
];

export default voiceLibrary;