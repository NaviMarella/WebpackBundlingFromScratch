// get required dependencies here
const Compiler = require('./compiler.js');

// All constants should go here
const inputFileName = '../src/index.js';
const outputFolderName = '../dist/';
const outputChunkName = 'main';
const context = 'WebpackBundlingFromScratch';

//Step 1 - build the module dependency graph for entry
const compiler = new Compiler();
const moduleGraph = compiler.createGraph(inputFileName, context);


// Step 2 - build the chunk graph
const chunkGraph = compiler.createChunkGroupGraph(moduleGraph, outputChunkName);

//Step 3 - Assign Id's to modules and chunks
compiler.assignIDS(moduleGraph, chunkGraph);

// Step 4 - Code generation based on ModuleGraph

console.log(moduleGraph);
console.log(chunkGraph);