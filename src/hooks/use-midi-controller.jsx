import { useEffect, useState } from "react";

/**
 * The TWELVE_TONE_NOTE_NAMES from `noteTable.js`.
 */
const TWELVE_TONE_NOTE_NAMES = [
	"C",
	"C#",
	"D",
	"Eb",
	"E",
	"F",
	"F#",
	"G",
	"Ab",
	"A",
	"Bb",
	"B",
];

/**
 * Given a `noteName`, such as `C`,
 * and an `octave`, such as `4`,
 *
 * Return the frequency of the note.
 *
 * Note: currently only supports the specific note names
 * used in `noteTable.js`.
 *
 * @param {*} noteName
 * @param {*} octave
 * @returns
 */
function getNoteFrequency(noteName, octave) {
	const noteIndex = TWELVE_TONE_NOTE_NAMES.indexOf(noteName);
	const noteNumber = noteIndex + (octave + 1) * 12;
	// With the above noteNumber logic, A440 will be the 69th note.
	// We calculate the frequency of the incoming note using A440 as
	// the basis, using even tempered tuning.
	// (I don't really understand this fully, but it seems to work.)
	const noteDistanceFromA440 = noteNumber - 69;
	return 440 * Math.pow(2, noteDistanceFromA440 / 12);
}

/**
 * Return true if `value` is a non-negative number,
 * or `false` otherwise.
 *
 * @param {*} value
 * @returns
 */
function isNonNegativeNumber(value) {
	return typeof value === "number" && value >= 0;
}

/**
 * Given some midi event data,
 * and callback functions for note presses and releases,
 *
 * Call the appropriate callback function
 * based on the incoming midi event data.
 *
 * @param {*} event MIDI event data.
 * @param {*} notePressed Called when a note is pressed down.
 * @param {*} noteReleased Called when a note is released.
 */
function handleNotesFromMidi(event, notePressed, noteReleased) {
	// With the MIDI controllers we've tested,
	// we expect three data entries for pressed notes.
	const [command, key, velocity] = event.data;
	/**
	 * We expect the first data entry to be the command type.
	 *
	 * On the Axiom 25:
	 * - key presses are command 144, with velocity > 0
	 * - key releases are command 144, with velocity === 0
	 *
	 * On the Yamaha P125:
	 * - key presses are command 144, with velocity > 0
	 * - key releases are command 128
	 */
	if (command === 144 || command === 128) {
		// We expect the data entry to be the key number.
		// 0 is the lowest C, 12 is the next C, and so on.
		if (isNonNegativeNumber(key) && isNonNegativeNumber(velocity)) {
			// If we have a key, we can get its note name and octave, and frequency.
			const note = TWELVE_TONE_NOTE_NAMES[key % 12];
			const octave = Math.floor(key / 12) - 1;
			const freq = getNoteFrequency(note, octave);
			// If velocity is 0, or command is 128,
			// this is a key release. Otherwise it's a key press.
			if (velocity === 0 || command === 128) {
				noteReleased(octave, note);
			} else {
				// TODO: could potentially use velocity to control volume
				notePressed(octave, note, freq);
			}
		}
	} else if (command === 254) {
		// Ignore this one, comes off Yamaha P125 constantly,
		// I don't want to log it out.
	} else {
		// There are other commands that could be worth investigating.
		// For now, just log them out. (One that might be cool is sustain pedal).
		console.log(Array.from(event.data));
	}
}

/**
 * A hook that requests MIDI access,
 * and if successful, handles MIDI events in order
 * to call `notePressed` and `noteReleased` functions when
 * relevant  MIDI input is detected.
 *
 * @param {Object} properties A bundle of properties, could expand in the future to
 * accommodate other MIDI input, such as controlling decay via sustain pedal.
 * @param {(octave, note, freq) => void} properties.notePressed A function to call when a note is pressed. Outside this hook, we expect this to start a note.
 * @param {(octave, note) => void} properties.noteReleased A function to call when a note is released. Outside this hook, we expect this to stop a note.
 */
export default function useMidiController({ notePressed, noteReleased }) {
	const [midiAccess, setMidiAccess] = useState(null);

	/**
	 * On mount, request MIDI access,
	 * and if successful, set state accordingly.
	 */
	useEffect(() => {
		async function getMidiAccess() {
			try {
				setMidiAccess(await navigator.requestMIDIAccess());
			} catch (e) {
				console.error(`Failed to get MIDI access - ${e}`);
			}
		}
		getMidiAccess();
	}, []);

	/**
	 * If MIDI access changes to available,
	 * hook up note press events from MIDI
	 * to our `notePressed` and `noteReleased` functions.
	 */
	useEffect(() => {
		if (midiAccess) {
			midiAccess.inputs.forEach((entry) => {
				entry.onmidimessage = (event) =>
					handleNotesFromMidi(event, notePressed, noteReleased);
			});
		}
	}, [midiAccess, notePressed, noteReleased]);
}
