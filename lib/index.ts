import process from 'process';
import { extname } from 'path';
import { declare } from '@babel/helper-plugin-utils';
import { template, types as t } from '@babel/core';

const cwd = process.cwd();

const visitor = {
  exit(path) {
    const { specifiers } = path.node;
    const source = path.get('source');

    if (!source.node) {
      return;
    }

    const ext = extname(source.node.value);

    if (source.node.value[0] === '.' || source.node.value[0] === '/') {
      if (!ext) {
        const newSource = t.stringLiteral(source.node.value + '.js');
        source.replaceWith(newSource);
      }
    }

    else {
      const nodePath = require.resolve(source.node.value, {
        paths: [cwd],
      });
      const ext = extname(nodePath);
      let newSource = t.stringLiteral(nodePath.slice(cwd.length));

      // Ensure the node path has an extension.
      if (!ext) {
        newSource = t.stringLiteral(nodePath.slice(cwd.length) + '.js');
      }

      source.replaceWith(newSource);
    }
  },
};

export default declare((api, options) => {
  api.assertVersion(7);

  return {
    visitor: {
      Program: {
        exit(path) {
          path.traverse({
            ImportDeclaration: visitor,
            ExportDeclaration: visitor,
          });
        }
      },
    },
  };
});
