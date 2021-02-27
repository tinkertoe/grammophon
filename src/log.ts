import { name } from '../package.json'
import chalk from 'chalk'

// Implement custom log function with prefix
const log = (..._args: any) => {
  const args = []
  args.push(chalk.grey(`[${name}]`))
  for (let i = 0; i < _args.length; i++) {
    args.push(_args[i])
  }
  console.log(...args)
}

export default log