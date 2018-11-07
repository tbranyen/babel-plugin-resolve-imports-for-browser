# Babel Resolve: Imports to Browser ESM

A Babel 7 compatible transform to convert import paths to browser-compatible
source paths. Users of previous module systems are used to using extensionless
imports and files from `node_modules`. This module is designed to make any
module loadable by the web module system.

### Usage

```sh
npm install --save-dev babel-plugin-resolve-imports
```

Update your babel configuration:

```json
{
  "plugins": ["resolve-imports"]
}
```

Now code like this:

```javascript
import PropTypes from 'prop-types';
```

Will turn into this:

``` javascript
import PropTypes from 'node_modules/prop-types/index.js';
```
