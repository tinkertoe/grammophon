import { name, author } from '../package.json'
import chalk from 'chalk'
import figlet from 'figlet'

// Display heading
console.log(figlet.textSync(name, {font: 'Big'}))
console.log(chalk.yellow('>> by ' + author))