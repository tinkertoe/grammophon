const os = require('os')
const exec = require("child_process").exec

if (os.platform() === 'linux' && (os.arch() === 'arm' || os.arch() === 'arm64') ) {
  
  console.log('Replacing libvosk.so library')
  
  exec("cp libvosk.so node_modules/vosk/lib/linux-x86_64/libvosk.so", (err, stdout, stderr) => {
    if (stdout) { console.log(stdout) }
    if (stderr) { console.error(stderr) }
  }).unref()
  
}
