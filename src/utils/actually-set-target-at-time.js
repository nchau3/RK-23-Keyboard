/**
 * TODO: add a note on how timeContant is weird
 *
 * @param {*} audioParam
 * @param {*} decayDuration
 */
export default function actuallySetTargetAtTime(audioParam, decayDuration) {
	const timeConstant = decayDuration / 5;
	audioParam.setTargetAtTime(
		0,
		audioContext.currentTime,
		timeConstant // seconds... but takes 5× this to decay to 95%
	);
}
