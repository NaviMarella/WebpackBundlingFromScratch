const path = require('path');
const fs = require('fs');
const Parser = require('./parser.js');

function Module() {}

Module.prototype.createModule = function (fileName) {
    const content = fs.readFileSync(fileName, 'utf-8');
    const parser = new Parser();

    // parse code and get information about dependencies
    const moduleInfo = parser.parseModule(content);
    const {
        code,
        dependencies
    } = moduleInfo;

    // Return module information
    return {
        fileName,
        dependencies,
        code
    }
}

Module.prototype.applyModuleIDS = function (modules) {
    // Module counter
    var counter = 0;

    for (const module of modules) {
        module.id = counter++;
    }
}

module.exports = Module;