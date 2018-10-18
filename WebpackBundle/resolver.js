const path = require('path');
var fs = require('fs');

function Resolver() {}

Resolver.prototype.resolveModule = function (relativePath, context) {
    const absolutePath = path.join(context, relativePath);
    const exists = fs.existsSync(absolutePath);
    return exists ? absolutePath : null;
}

module.exports = Resolver;