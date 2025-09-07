const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * Get package information from package.json
 */
function getPackageInfo() {
  try {
    const packagePath = path.join(__dirname, '..', 'package.json');
    return require(packagePath);
  } catch (error) {
    return { version: '1.0.0', name: 'spec-kit' };
  }
}

/**
 * Validate that the target directory is suitable for setup
 */
async function validateWorkspace(targetDir) {
  if (!await fs.pathExists(targetDir)) {
    throw new Error(`Target directory does not exist: ${targetDir}`);
  }
  
  const stats = await fs.stat(targetDir);
  if (!stats.isDirectory()) {
    throw new Error(`Target path is not a directory: ${targetDir}`);
  }
  
  // Check if we have write permissions
  try {
    await fs.access(targetDir, fs.constants.W_OK);
  } catch (error) {
    throw new Error(`No write permission for directory: ${targetDir}`);
  }
}

/**
 * Copy directory recursively
 */
async function copyDirectory(sourceDir, destDir, options = {}) {
  const { force = false, verbose = false } = options;
  
  if (!await fs.pathExists(sourceDir)) {
    throw new Error(`Source directory does not exist: ${sourceDir}`);
  }
  
  // Check if destination exists and handle accordingly
  if (await fs.pathExists(destDir) && !force) {
    if (verbose) {
      console.log(chalk.yellow(`⚠️  Directory already exists: ${destDir}`));
    }
    return false;
  }
  
  await fs.copy(sourceDir, destDir, { overwrite: force });
  
  if (verbose) {
    console.log(chalk.green(`✅ Copied: ${destDir}`));
  }
  
  return true;
}

/**
 * Copy single file
 */
async function copyFile(sourcePath, destPath, options = {}) {
  const { force = false, verbose = false } = options;
  
  if (!await fs.pathExists(sourcePath)) {
    throw new Error(`Source file does not exist: ${sourcePath}`);
  }
  
  // Check if destination exists and handle accordingly
  if (await fs.pathExists(destPath) && !force) {
    if (verbose) {
      console.log(chalk.yellow(`⚠️  File already exists: ${destPath}`));
    }
    return false;
  }
  
  await fs.copy(sourcePath, destPath, { overwrite: force });
  
  if (verbose) {
    console.log(chalk.green(`✅ Copied: ${destPath}`));
  }
  
  return true;
}

/**
 * Get the source directory for templates and files
 */
function getSourceDir() {
  return path.join(__dirname, '..');
}

/**
 * Format file path for display
 */
function formatPath(filePath) {
  return path.relative(process.cwd(), filePath);
}

module.exports = {
  getPackageInfo,
  validateWorkspace,
  copyDirectory,
  copyFile,
  getSourceDir,
  formatPath
};
