function Chunk() {}

Chunk.prototype.addChunk = function (modules, chunkName) {
    let chunk = {
        name: chunkName,
        dependencies: []
    };
    for (const module of modules) {
        module.chunkName = chunkName;
        if (chunk.dependencies.indexOf(module.fileName) <= -1) {
            chunk.dependencies.push(module.fileName);
        }
    }

    return chunk;
}

Chunk.prototype.applyChunkIDS = function (chunkGroups) {
    // Chunk counter
    var counter = 0;

    for (let i = chunkGroups.length - 1; i >= 0; i--) {
        let chunks = chunkGroups[i].chunks
        for (let chunk of chunks) {
            chunk.id = counter++;
        }
    }
}


module.exports = Chunk;