/*  
  The Raspberry Pi has trouble with closing the connection
  to USB devices, because of it's kernel drivers. This means
  we can't connect to the printer twice or it will error
  with LIBUSB_ERROR_BUSY. To mittigate this we create the
  connection to the printer in a seperate process which will
  automaticly stop after the printing is done and free the
  connection. The code below executes the print.js file with
  node and the recognised sentence as the first argument.
  Further down, the same code is run without an argument,
  which will print the welcome message.
*/ 

import log from './log'
import chalk from 'chalk'
import { exec } from 'child_process'

let printCommand = 'node src/printer.js'

// We need root privileges to talk to the printer
if (process.platform == 'linux') {
  printCommand = 'sudo ' + printCommand
}

function greet() {
  exec(printCommand, (err, stdout, stderr ) => {
    if (stderr) { log(chalk.red(stderr.trim())) }
    if (stdout) { log(stdout.trim()) }
  })
}

function print(text: string) {
  exec(`${printCommand} "${text}"` , (err, stdout, stderr ) => {
    if (stderr) { log(chalk.red(stderr.trim())) }
    if (stdout) { log(stdout.trim()) }
  })
}

export { greet, print }