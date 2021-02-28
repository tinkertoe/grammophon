import './heading'
import log from './log'
import chalk from 'chalk'
import vosk from 'vosk'
import Mic from 'mic'
import { Stream } from 'stream'
import { exec } from 'child_process'
import path from 'path'

// Define console command to spawn print process
const print_command = path.join('node_modules', '.bin', 'ts-node') + ' src/print.ts '

log('Starting voice recognition engine')
let samplerateFactor: number = 1
if (process.platform == 'win32') { samplerateFactor = 2 }
const rec = new vosk.Recognizer(new vosk.Model('model'), 44100 * samplerateFactor)

log('Setting up microphone interface')
const mic = Mic({ rate: 44100 })
const micStream = mic.getAudioStream() as Stream

// Handle result of speech recognition
const handleResult = (result: Object) => {
  // Check if result has text and that something was said
  if (result.hasOwnProperty('text') && result['text'] != '') {
    // Log result in console
    const text = '> ' + result['text']
    log(chalk.yellow(text))
    /*  
      The Raspberry Pi has trouble with closing the connection
      to USB devices, because of it's kernel drivers. This means
      we can't connect to the printer twice or it will error
      with LIBUSB_ERROR_BUSY. To mittigate this we create the
      connection to the printer in a seperate process which will
      automaticly stop after the printing is done and free the
      connection.
    */ 
    exec(print_command + `"${text}"`, (err, stdout, stderr ) => {
      if (stderr) { log(chalk.red(stderr.trim())) }
      if (stdout) { log(stdout.trim()) }
    }).unref()
  }
}

// When new data arrives on the microphone stream, send it to the recognition engine
micStream.on('data', (data) => {
  // Function returns true if it thinks the sentence is over
  const eof = rec.acceptWaveform(data)
  if (eof) {
    handleResult(JSON.parse(rec.result()))
  }
})

// Start listening
mic.start()
log(chalk.green('Listening 🎤'))

// Print welcome message
exec(print_command, (err, stdout, stderr ) => {
  if (stderr) { log(chalk.red(stderr.trim())) }
  if (stdout) { log(stdout.trim()) }
}).unref()