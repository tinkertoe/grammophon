import dotenv from 'dotenv'
import log from './log'

// Inject configuration and set defaults
dotenv.config()
const config = {
  samplerate: Number(process.env.SAMPLERATE) || 44100
}
log('CONFIG:', config)

export default config