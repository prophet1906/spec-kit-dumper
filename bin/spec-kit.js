#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');

const KilocodeSetup = require('../lib/kilocode-setup');
const ClineruleSetup = require('../lib/clinerule-setup');
const { validateWorkspace, getPackageInfo } = require('../lib/utils');

const program = new Command();
const packageInfo = getPackageInfo();

program
  .name('spec-kit')
  .description('CLI tool to set up Kilocode or Clinerules for Spec-Driven Development workflows')
  .version(packageInfo.version);

program
  .command('kilocode')
  .description('Set up Kilocode custom modes for Spec-Driven Development')
  .option('-f, --force', 'Overwrite existing files without confirmation')
  .option('-v, --verbose', 'Show detailed output')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🚀 Setting up Kilocode for Spec-Driven Development...'));
      
      const targetDir = process.cwd();
      await validateWorkspace(targetDir);
      
      const setup = new KilocodeSetup(targetDir, options);
      await setup.execute();
      
      console.log(chalk.green('✅ Kilocode setup completed successfully!'));
      console.log(chalk.yellow('💡 You can now use the custom modes in your Kilocode workspace.'));
    } catch (error) {
      console.error(chalk.red('❌ Error setting up Kilocode:'), error.message);
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program
  .command('clinerules')
  .description('Set up Clinerules for Spec-Driven Development')
  .option('-f, --force', 'Overwrite existing files without confirmation')
  .option('-v, --verbose', 'Show detailed output')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🚀 Setting up Clinerules for Spec-Driven Development...'));
      
      const targetDir = process.cwd();
      await validateWorkspace(targetDir);
      
      const setup = new ClineruleSetup(targetDir, options);
      await setup.execute();
      
      console.log(chalk.green('✅ Clinerules setup completed successfully!'));
      console.log(chalk.yellow('💡 You can now use /specify, /plan, and /tasks commands with Cline.'));
    } catch (error) {
      console.error(chalk.red('❌ Error setting up Clinerules:'), error.message);
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Interactive setup - choose between Kilocode or Clinerules')
  .option('-f, --force', 'Overwrite existing files without confirmation')
  .option('-v, --verbose', 'Show detailed output')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🎯 Welcome to Spec-Kit Interactive Setup!'));
      console.log(chalk.gray('This will help you set up Spec-Driven Development in your workspace.\n'));
      
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'setupType',
          message: 'Which setup would you like to use?',
          choices: [
            {
              name: 'Kilocode - Custom modes for Kilocode workspace',
              value: 'kilocode',
              short: 'Kilocode'
            },
            {
              name: 'Clinerules - Slash commands for Cline AI assistant',
              value: 'clinerules',
              short: 'Clinerules'
            }
          ]
        }
      ]);
      
      const targetDir = process.cwd();
      await validateWorkspace(targetDir);
      
      if (answers.setupType === 'kilocode') {
        const setup = new KilocodeSetup(targetDir, options);
        await setup.execute();
        console.log(chalk.green('✅ Kilocode setup completed successfully!'));
        console.log(chalk.yellow('💡 You can now use the custom modes in your Kilocode workspace.'));
      } else {
        const setup = new ClineruleSetup(targetDir, options);
        await setup.execute();
        console.log(chalk.green('✅ Clinerules setup completed successfully!'));
        console.log(chalk.yellow('💡 You can now use /specify, /plan, and /tasks commands with Cline.'));
      }
    } catch (error) {
      console.error(chalk.red('❌ Setup failed:'), error.message);
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Check the current setup status')
  .action(async () => {
    try {
      const targetDir = process.cwd();
      console.log(chalk.blue('📊 Checking setup status...\n'));
      
      // Check for Kilocode setup
      const kilocodeFile = path.join(targetDir, '.kilocodemodes');
      const hasKilocode = await fs.pathExists(kilocodeFile);
      
      // Check for Clinerules setup
      const clineruleFile = path.join(targetDir, '.clinerules', 'spec-kit.md');
      const hasClinerules = await fs.pathExists(clineruleFile);
      
      console.log(chalk.bold('Setup Status:'));
      console.log(`Kilocode: ${hasKilocode ? chalk.green('✅ Configured') : chalk.gray('❌ Not configured')}`);
      console.log(`Clinerules: ${hasClinerules ? chalk.green('✅ Configured') : chalk.gray('❌ Not configured')}`);
      
      if (!hasKilocode && !hasClinerules) {
        console.log(chalk.yellow('\n💡 Run "spec-kit init" to set up Spec-Driven Development.'));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error checking status:'), error.message);
      process.exit(1);
    }
  });

// Handle unknown commands
program.on('command:*', () => {
  console.error(chalk.red('❌ Invalid command: %s'), program.args.join(' '));
  console.log(chalk.yellow('💡 Run "spec-kit --help" to see available commands.'));
  process.exit(1);
});

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
  console.log(chalk.yellow('\n💡 Start with "spec-kit init" for interactive setup.'));
}

program.parse(process.argv);
