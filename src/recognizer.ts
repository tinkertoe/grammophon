import log from './log'
import vosk from 'vosk'

log('Starting voice recognition engine')

/* 
  There is some odd behaviour on windows, where sox
  only uses double of the specified samplerate. To fix
  this, we also double the samplerate of the vosk recog-
  nizer.
*/
let samplerateFactor: number = 1
if (process.platform == 'win32') { samplerateFactor = 2 }

const rec = new vosk.Recognizer(new vosk.Model('model'), 44100 * samplerateFactor)

export default rec