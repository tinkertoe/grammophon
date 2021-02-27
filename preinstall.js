const spawnSync = require("child_process").spawnSync
if (process.platform == 'linux') {
  console.log('Installing system dependencies')
  spawnSync("sudo apt update -y && sudo apt install -y alsa-utils build-essential libudev-dev")
}