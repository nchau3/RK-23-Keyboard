/**
 * This function is a wrapper around AudioParam.setTargetAtTime
 * that aims to improve the intuitiveness of the interface, by accepting
 * a `duration` parameter that represents the amount of time between
 * when the function is called and when the target value is reached.
 *
 * Well, not exactly - `duration` is actually the amount of time it
 * takes to _almost_ reach the target value, specifically to get 95% towards it.
 * But the difference to 100% is nearly imperceptible.
 *
 * This differs from the `audioParam.setTargetAtTime`, which accepts a
 * `timeConstant` parameter that represents the amount of time it takes
 * to reach 63% of the target value. This is a much more perceptible difference.
 *
 * @param {AudioParam} audioParam
 * @param {number} duration
 * @param {number} targetValue
 */
export default function actuallySetTargetAtTime(
	audioParam,
	targetValue,
	duration
) {
	const timeConstant = duration / 5;
	audioParam.setTargetAtTime(
		targetValue,
		audioContext.currentTime,
		timeConstant // seconds... but takes 5× this to decay to 95%
	);
}
