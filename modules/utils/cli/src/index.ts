import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import { spawn } from 'child_process';
import { collect, split } from './collect';

type Command = [ string, string[]? ]

const splitToCommand = (fullCommand: string): Command => {
  const command = fullCommand.split(" ")[0]
  const args = fullCommand.split(" ").slice(1)
  return [ command, args ]
}

const displayItem = (name: string) => {
  if (name.includes("/"))
    return `${chalk.bold(chalk.green(name.split("/")[0]))}${chalk.bold(chalk.green("::"))}${chalk.bold(chalk.white(name.split("/")[1]))}`
  return `${chalk.bold(chalk.blue("@"))}${chalk.bold(chalk.blue("::"))}${chalk.bold(chalk.white(name))}`
}

const display = (command: Command) => {
  const cmd = chalk.blueBright(chalk.bold(command[0]))
  const params = command[1] ?
    command[1].map(arg => arg.startsWith("-") ? chalk.green(chalk.italic(arg)) : chalk.white(chalk.bold(arg))) :
    []
  return `${cmd}${params.length ? " " : ""}${params.join(" ")}`
}

const _run = async (rootDir: string) => {

  console.clear()

  const commands = await collect(rootDir)
  const menu = split(commands)

  const selectedWorkspace = await select({
    message: 'Package',
    choices: Object.keys(menu).map(item => ({
      name: displayItem(item),
      value: item,
    })),
    pageSize: 30,
  })

  const commandsOfWorkspace = menu[selectedWorkspace]

  const selected = await select({
    message: 'Script',
    choices: commandsOfWorkspace.map(command => ({
      name: display(splitToCommand(command)),
      value: command
    })),
    pageSize: 30,
  })

  const command = splitToCommand(selected)
  const process = spawn(command[0], command[1])

  process.stdout.on('data', data => console.log(`${data}`))
  
  process.stderr.on('data', data => console.error(`${data}`))
  
  process.on('close', (code) => {
    if (code === 0)
      console.log(`${chalk.bold(chalk.green('SUCCESS'))} - Command exited with code ${chalk.green(code)}`)
    else
      console.log(`${chalk.bold(chalk.red('ERROR'))} - Command exited with code ${chalk.red(code)}`)
  })
}

export const run = (rootDir: string) => _run(rootDir)
  .catch(() => console.log(`${chalk.bold(chalk.red('EXITED'))} - force closed by user`))