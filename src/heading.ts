import chalk from 'chalk'
import figlet from 'figlet'
import { name, author } from '../package.json'

// Display heading
console.log(figlet.textSync(name, {font: 'Big'}))
console.log(chalk.yellow('>> by ' + author))