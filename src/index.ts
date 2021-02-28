import './heading'
import log from './log'
import chalk from 'chalk'
import vosk from 'vosk'
import Mic from 'mic'
import { Stream } from 'stream'
import { exec } from 'child_process'
import path from 'path'

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
    exec(print_command + `"${text}"`, (err, stdout, stderr ) => {
      if (stderr) { log(chalk.red(stderr)) }
      if (stdout) { log(chalk.red(stdout)) }
    })
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
})