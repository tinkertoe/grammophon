const exec = require("child_process").exec
if (process.platform == 'linux') {
  console.log('Installing system dependencies')
  exec("sudo apt update -y && sudo apt install -y alsa-utils build-essential libudev-dev python", (err, stdout, stderr) => {
    if (stdout) { console.log(stdout) }
    if (stderr) { console.error(stderr) }
  }).unref()
}