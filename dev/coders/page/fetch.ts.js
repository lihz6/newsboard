const { headers } = require('..');
module.exports = function() {
  return [
    ...headers(),
    `import fetch from '_fetch';`,
    `import resolve from '_fetch/resolve';`,
    ``,
    `export function fetchFrom(path: string, search: string) {`,
    `  if (__DEVE__) {`,
    `    return resolve(true);`,
    `  }`,
    `  return fetch(\`\${path}\${search}\`);`,
    `}`,
    ``,
  ].join('\n');
};
