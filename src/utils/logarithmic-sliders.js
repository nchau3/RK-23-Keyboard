// Log class from Thomas Foydel's tutorial on logarithmic sliders in React
// https://github.com/ThomasFoydel/logarithmic-range-input

class Log {
  constructor(options) {
    this.minPos = options.minPos || 0;
    this.maxPos = options.maxPos || 50;
    this.minVal = Math.log(options.minVal || 1);
    this.maxVal = Math.log(options.maxVal || 9000);
    this.scale = (this.maxVal - this.minVal) / (this.maxPos - this.minPos);
  }

  value(position) {
    return Math.exp((position - this.minPos) * this.scale + this.minVal);
  }

  position(value) {
    return this.minPos + (Math.log(value) - this.minVal) / this.scale;
  }
}

export default Log;