const { parseExpression } = require('@babel/parser');

// https://astexplorer.net/
const parmap = {
  AssignmentExpression: 'left',
  VariableDeclarator: 'id',
  AssignmentPattern: 'left',
  MemberExpression: 'property',
  CallExpression: 'callee',
  ObjectProperty: 'key',
};
const pararr = Object.keys(parmap).concat([
  'ExportDefaultDeclaration',
  'ConditionalExpression',
  'ExpressionStatement',
  'BinaryExpression',
  'TemplateLiteral',
  'UnaryExpression',
  'IfStatement',
]);

module.exports = ({ types: t }) => ({
  visitor: {
    Identifier(path, state) {
      const { name } = path.node;
      if (
        !(state.opts[name] || name.startsWith('_glob_')) ||
        !pararr.includes(path.parent.type)
      ) {
        return;
      }
      for (const type in parmap) {
        if (
          path.parent.type === type &&
          path.parent[parmap[type]] === path.node &&
          (type !== 'MemberExpression' || !path.parent.computed)
        ) {
          return;
        }
      }
      const { filename, sourceFileName } = path.hub.file.opts;
      const value = (state.opts[name] || state.opts['_glob_'])({
        sourceFileName,
        filename,
        name,
      });

      switch (typeof value) {
        case 'undefined':
          path.node.name = 'undefined';
          break;
        case 'boolean':
          path.replaceWith(t.booleanLiteral(value));
          break;
        case 'string':
          path.replaceWith(t.stringLiteral(value));
          break;
        case 'number':
          path.replaceWith(t.numericLiteral(value));
          break;
        default:
          path.replaceWith(parseExpression(JSON.stringify(value)));
          break;
      }
    },
  },
});
