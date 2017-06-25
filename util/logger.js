export default class Logger {
  logs = []

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getLogs(limit = this.height) {
    return this.logs.slice(-limit);
  }

  log(txt) {
    this.logs.push(txt);
    console.log(`> ${txt}`);
  }
}
