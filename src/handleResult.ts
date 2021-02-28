import log from './log'
import { print } from './callPrinter'
import chalk from 'chalk'

function handleResult (result: Object) {
  if (result.hasOwnProperty('text') && result['text'] != '') {
    const text = '> ' + result['text']
    log(chalk.yellow(text))
    print(text)
  }
}

export default handleResult