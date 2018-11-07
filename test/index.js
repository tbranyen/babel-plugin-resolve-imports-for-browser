const { throws, equal, deepEqual } = require('assert');
const { transformAsync } = require('@babel/core');
const { default: traverseAst } = require('@babel/traverse');
const { format } = require('./_utils');
const plugin = require('../lib/index.ts');

describe('Resolve Imports', function() {
  const defaults = {
    plugins: [plugin],
    sourceType: 'module',
  };

  describe('General behavior', () => {
    it('can add an extension to an extension-less file', async () => {
      const input = `
        import test from './test';
      `;

      const { code } = await transformAsync(input, {
        ...defaults,
        sourceType: 'module',
      });

      equal(code, format`
        import test from "./test.js";
      `);
    });

    it('can resolve a global node import', async () => {
      const input = `
        import mocha from 'mocha';
      `;

      const { code } = await transformAsync(input, {
        ...defaults,
        sourceType: 'module',
      });

      equal(code, format`
        import mocha from "/node_modules/mocha/index.js";
      `);
    });
  });
});
