import './heading'
import log from './log'
import config from './config'

import chalk from 'chalk'
import Mic from 'mic'
import { Stream } from 'stream'
import vosk from 'vosk'
import escpos from 'escpos'
escpos.USB = require('escpos-usb')

log('Starting voice recognition engine')
const rec = new vosk.Recognizer(new vosk.Model('model'), config.samplerate * config.samplerateFactor)

log('Setting up microphone interface')
const mic = Mic({ rate: config.samplerate })
const micStream = mic.getAudioStream() as Stream

log('Define printer connection')
let device: escpos.USB
let printer: escpos.Printer
try {
  device = new escpos.USB()
  printer = new escpos.Printer(device)
} catch (err) {
  log(chalk.red(err))
}

// Handle result of speech recognition
const handleResult = (result: Object) => {
  // Check if result has text and that something was said
  if (result.hasOwnProperty('text') && result['text'] != '') {

    // Log result in console
    log(chalk.yellow('> ' + result['text']))

    // Only send to printer if it was set up
    if (device && printer) {
      device.open(() => {
        printer.text(result['text'])
      }).close()
    }
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

micStream.on('error', (err) => {
  throw new Error(err)
})

// Start listening
mic.start()
log(chalk.green('Listening 🎤'))
