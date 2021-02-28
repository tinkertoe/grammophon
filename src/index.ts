import log from './log'
import rec from './recognizer'
import handleResult from './handleResult'
import { greet } from './callPrinter'

import chalk from 'chalk'
import Mic from 'mic'
import { Stream } from 'stream'

log('Setting up microphone interface')

const mic = Mic({ rate: 44100 })
const micStream = mic.getAudioStream() as Stream

micStream.on('data', (data) => {
  // Function returns true if it thinks the sentence is over
  const eof = rec.acceptWaveform(data)
  if (eof) {
    handleResult(JSON.parse(rec.result()))
  }
})

mic.start()
log(chalk.green('Listening 🎤'))

// Print greeting
greet()