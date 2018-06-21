const fs = require('fs');
const path = require('path');

function findFile (filepath) {
  try {
    fs.statSync(filepath);
    return filepath;
  } catch (e) {
    throw new Error(`Unable to find ${filepath}`);
  }
}

function findInModule (filename) {
  try {
    const dirname = path.dirname(module.parent.id);
    const fpath = path.join(dirname, filename);
    findFile(fpath);
    return fpath;
  } catch (e) {
    throw new Error(e.message);
  }
}

function findInHome (filename) {
  try {
    const fpath = path.join(process.env.HOME, filename);
    findFile(fpath);
    return fpath;
  } catch (e) {
    return findInModule(filename);
  }
}

function findInCurrent (filename) {
  let fpath;
  try {
    fpath = path.join(process.cwd(), filename);
    findFile(fpath);
    return fpath;
  } catch (e) {
    return findInHome(filename);
  }
}

const lookupRoot = (filename) => {
  try {
    return findInCurrent(filename);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = lookupRoot;
