const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const {
    transformFromAst
} = require('babel-core');

function Parser() {}

Parser.prototype.parseModule = function (content) {
    // Reading source code in the form of ast
    const ast = babylon.parse(content, {
        sourceType: 'module'
    });

    const dependencies = [];
    traverse(ast, {
        ImportDeclaration: ({
            node
        }) => {
            dependencies.push(node.source.value);
        },
    });
    /*
    const {
        code
    } = transformFromAst(ast, null, {
        presets: ['env'],
    });
    */

    return {
        code: content,
        dependencies
    }

}

module.exports = Parser;