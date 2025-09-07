const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { copyDirectory, copyFile, getSourceDir, formatPath } = require('./utils');

class ClineruleSetup {
  constructor(targetDir, options = {}) {
    this.targetDir = targetDir;
    this.options = options;
    this.sourceDir = getSourceDir();
  }

  async execute() {
    console.log(chalk.blue('📁 Copying folders and configuration for Clinerules...'));
    
    const foldersToCopy = ['memory', 'modes', 'scripts', 'templates'];
    
    // Copy folders
    for (const folder of foldersToCopy) {
      const sourceDir = path.join(this.sourceDir, folder);
      const destDir = path.join(this.targetDir, folder);
      
      if (await fs.pathExists(sourceDir)) {
        const copied = await copyDirectory(sourceDir, destDir, this.options);
        if (copied) {
          console.log(chalk.green(`✅ Copied folder: ${formatPath(destDir)}`));
        }
      } else {
        console.log(chalk.yellow(`⚠️  Source folder not found: ${folder}`));
      }
    }
    
    // Create .clinerules directory and copy spec-kit.md file
    await this.createClineruleConfig();
    
    // Make scripts executable if on Unix-like system
    if (process.platform !== 'win32') {
      await this.makeScriptsExecutable();
    }
  }
  
  async createClineruleConfig() {
    const clineruleDir = path.join(this.targetDir, '.clinerules');
    const sourceSpecKit = path.join(this.sourceDir, '.clinerules', 'spec-kit.md');
    const destSpecKit = path.join(clineruleDir, 'spec-kit.md');
    
    // Create .clinerules directory
    await fs.ensureDir(clineruleDir);
    
    // Copy spec-kit.md from source
    if (await fs.pathExists(sourceSpecKit)) {
      const copied = await copyFile(sourceSpecKit, destSpecKit, this.options);
      if (copied) {
        console.log(chalk.green(`✅ Copied config: ${formatPath(destSpecKit)}`));
      }
    } else {
      console.log(chalk.yellow(`⚠️  Source config not found: .clinerules/spec-kit.md`));
    }
  }
  
  async makeScriptsExecutable() {
    const scriptsDir = path.join(this.targetDir, 'scripts');
    
    if (!await fs.pathExists(scriptsDir)) {
      return;
    }
    
    try {
      const files = await fs.readdir(scriptsDir);
      
      for (const file of files) {
        const filePath = path.join(scriptsDir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.isFile() && (file.endsWith('.sh') || file.endsWith('.bash'))) {
          await fs.chmod(filePath, 0o755);
          if (this.options.verbose) {
            console.log(chalk.gray(`🔧 Made executable: ${file}`));
          }
        }
      }
    } catch (error) {
      if (this.options.verbose) {
        console.log(chalk.yellow(`⚠️  Could not make scripts executable: ${error.message}`));
      }
    }
  }
}

module.exports = ClineruleSetup;
