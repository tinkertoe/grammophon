import log from './log'
import chalk from 'chalk'
import { exec } from 'child_process'

exec('git pull', (err, stdout, stderr) => {
  log('Checking for updates')
  if (stderr) { log(chalk.red(stderr.trim())) }
  if (stdout) { log(stdout.trim())}
})