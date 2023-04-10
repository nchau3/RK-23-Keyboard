//each voice has an array of values which represent the relative gain of each overtone above the fundamental frequency

class Voice {
  constructor(name, harmonics, envelope) {
    this.name = name;
    this.harmonics = harmonics;
    this.envelope = envelope;
  }
}

export const voice1 = new Voice(
  "voice 1",
  [1, 1, 0.6, 1.3, 0.02, 0.04, 0.03],
  {
    attack: 0.001,
    release: 0.2
  }
);

export const voice2 = new Voice(
  "voice 2",
  [1.4, 0.1, 0.8, 0.06, 0.09, 0.02, 0.003, 0.003, 0.001, 0.001, 0.002],
  {
    attack: 0.01,
    release: 0.35
  }
);

export const voice3 = new Voice(
  "voice 3",
  [1.7, 1.4, 0.07, 0.05, 0.003, 0.1, 0.001, 0.002, 0.01, 0.01, 0.001, 0.002, 0.006],
  {
    attack: 0.2,
    release: 0.05
  }
);