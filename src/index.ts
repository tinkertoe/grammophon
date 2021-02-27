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
let samplerateFactor: number = 1
if (process.platform == 'win32') {
  samplerateFactor = 2
}
const rec = new vosk.Recognizer(new vosk.Model('model'), config.samplerate * samplerateFactor)

log('Setting up microphone interface')
const mic = Mic({ rate: config.samplerate })
const micStream = mic.getAudioStream() as Stream

// try block will cause app to keep running with just voice recognition
log('Define printer connection')
const device = new escpos.USB()
const printer = new escpos.Printer(device)

device.open((err) => {
  // Print welcome message
  printer
    .font('B')
    .align('CT')
    .style('B')
    .text('Hallo Mensch,')
    .text('Maschiene hier!')
    .drawLine()
    .feed(1)
    .cut()
    .close()

  
  // Handle result of speech recognition
  const handleResult = (result: Object) => {
    // Check if result has text and that something was said
    if (result.hasOwnProperty('text') && result['text'] != '') {

      // Log result in console
      log(chalk.yellow('> ' + result['text']))

      printer
        .align('LT')
        .style('NORMAL')
        .text('> ' + result['text'])
        .close()
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
  
})






