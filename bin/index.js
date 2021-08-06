#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const package = require('../package.json');

// const program = new commander.Command();
program
  .version(`wqq ${package.version}`, '-v --version')
  .usage('<command> [options]')
program
  .command('init <projectName>')
  .description('初始化项目')
  .option('-g, --git [message]', 'git initialization with initial commit message', false)
  .action((name, options) => {
    require('../lib/init')(name, options)
  });
// output help information on unknown commands
program.on('command:*', ([cmd]) => {
  program.outputHelp()
  console.log()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log()
  // suggestCommands(cmd)
  process.exitCode = 1
})
program.Command.prototype['missingArgument'] = function (...args) {
  if (this._allowUnknownOption) {
    return
  }
  this.outputHelp()
  console.log()
  console.log(`  ` + chalk.red('Missing required argument ' + chalk.yellow(`<${args}>`)))
  console.log()
  process.exit(1)
}
program.parse(process.argv)