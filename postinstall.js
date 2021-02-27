const child_process = require('child_process')
const os = require('os')
if (os.arch() == 'arm64' && process.platform != 'win32') {
  console.log('Replacing libvosk.so library')
  spawnSync("cp libvosk.so node_modules/vosk/lib/linux-x86_64/libvosk.so")
}