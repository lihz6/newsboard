const { kebabCase } = require('lodash');
const path = require('path');
const fs = require('fs');
const {
  addWebpackResolve,
  fixBabelImports,
  addBabelPlugin,
  addLessLoader,
  override,
} = require('customize-cra');

function modifyVars() {
  if (!fs.existsSync('src/_sass/_antd.scss')) {
    return {};
  }
  const text = fs.readFileSync('src/_sass/_antd.scss', { encoding: 'utf-8' });

  const reduce = (text, data) => {
    const match = /^\$([-a-z0-9]+): *(.+);$/im.exec(text);
    if (!match) return data;
    data[`@${match[1]}`] = match[2];
    return reduce(text.slice(match.index + match[0].length), data);
  };
  return reduce(text, {});
}

module.exports = override(
  // fixBabelImports('antd-mobile', {
  //   libraryName: 'antd-mobile',
  //   style: true
  // }),
  addBabelPlugin([
    require('./dev/plugins/replace'),
    {
      ROUTER_BASENAME() {
        if (process.env.NODE_ENV === 'production') {
          const url = require('url');
          const pkg = require('./package.json');
          return url.parse(pkg.homepage).pathname;
        }
        return '/';
      },
      REPOSITORY() {
        const pkg = require('./package.json');
        if (pkg.repository && pkg.repository.url) {
          return pkg.repository.url;
        }
        return 'set://package.json/repository/url';
      },

      WITH_PATH({ filename, sourceFileName: _ }) {
        return withPath(filename.replace(/\\/g, '/'));
      },
      __PROD__() {
        return process.env.NODE_ENV === 'production';
      },
      __DEVE__() {
        return process.env.NODE_ENV === 'development';
      },
      __TEST__() {
        return process.env.NODE_ENV === 'test';
      },
      _glob_occupied() {
        return '-glob-occupied';
      },
      _glob_centered() {
        return '-glob-centered';
      },
    },
  ]),
  fixBabelImports('antd', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: modifyVars(),
  }),
  addWebpackResolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  })
);

function withPath(filename) {
  for (const sep of ['/src/pages/', '/src/']) {
    if (filename.includes(sep)) {
      return withPath(`/${filename.split(sep)[1]}`);
    }
  }
  const { dir, name } = path.parse(filename);
  if (!name) {
    return '/';
  }
  if (name.toLowerCase() === 'index' || dir.endsWith(`/${name}`)) {
    return withPath(dir);
  }
  return `${dir}/${kebabCase(name)}`.replace('//', '/');
}
