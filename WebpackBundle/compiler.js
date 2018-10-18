const path = require('path');
const Resolver = require('./resolver.js');
const ModuleFactory = require('./module.js');
const Chunk = require('./chunk.js');


function Compiler() {}

Compiler.prototype.createGraph = function (fileName, context) {
    const resolver = new Resolver();
    const moduleFactory = new ModuleFactory();
    const absolutePath = resolver.resolveModule(fileName, context);
    const modules = [];
    if (absolutePath) {
        // If the main entry file exists then start creating the module graph
        const entryModule = moduleFactory.createModule(absolutePath);
        if (entryModule) {
            // push the entry module into modules
            modules.push(entryModule);

            // process module dependencies for each module
            for (const module of modules) {
                const dirName = path.dirname(module.fileName);
                module.dependencies.forEach(filePath => {
                    const absoluteChildPath = resolver.resolveModule(filePath, dirName);
                    const childModule = moduleFactory.createModule(absoluteChildPath);

                    modules.push(childModule);

                })
            }
        }
    }

    return modules;
}

Compiler.prototype.createChunkGroupGraph = function (graph, entryChunkName) {
    let chunkGroups = [];
    let availableModules = [];
    let chunks = [];
    // Entry point is the main chunk group
    const chunkFactory = new Chunk();

    // add dependencies to default main chunk
    var chunk = chunkFactory.addChunk(graph, entryChunkName);
    chunks.push(chunk);
    chunkGroups.push({
        name: entryChunkName,
        isEntryPoint: true,
        availableModules,
        chunks
    });

    // Async chunk

    return chunkGroups;
}

Compiler.prototype.assignIDS = function (moduleGraph, chunkGraph) {
    const moduleFactory = new ModuleFactory();
    const chunkFactory = new Chunk();
    // Assign ids to modules
    moduleFactory.applyModuleIDS(moduleGraph);

    //Assign ids to chunks
    chunkFactory.applyChunkIDS(chunkGraph);
}

module.exports = Compiler;