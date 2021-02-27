import dotenv from 'dotenv'
import log from './log'

// Inject configuration and set defaults
dotenv.config()
const config = {
  samplerate: Number(process.env.SAMPLERATE) || 44100,
  samplerateFactor: Number(process.env.SAMPLERATE_FACTOR) || 2,
  greeting: process.env.GREETING || 'Hallo Mensch, Maschiene hier!'
}
log('CONFIG:', config)

export default config