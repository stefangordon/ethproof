
# ethproof

[![NPM version](https://img.shields.io/npm/v/ethproof.svg?style=flat)](https://npmjs.com/package/ethproof) [![NPM downloads](https://img.shields.io/npm/dm/ethproof.svg?style=flat)](https://npmjs.com/package/ethproof) [![CircleCI](https://circleci.com/gh/stefangordon/ethproof/tree/master.svg?style=shield)](https://circleci.com/gh/stefangordon/ethproof/tree/master)  [![codecov](https://codecov.io/gh/stefangordon/ethproof/branch/master/graph/badge.svg)](https://codecov.io/gh/stefangordon/ethproof)

## Install

```bash
npm install --save ethproof
```

## Usage

ES6
```js
import {hashDocument, publishProof} from 'ethproof'

const privateKeyHex = '774a1dee2b3a3d6c64c0e47124d3ac7522ae5c57e1fef1c4abb1b3dd63bffee6';
const destinationAddress = '44241d4e6a0fd2acff819478a87b7cdfe7963468';
const document = Buffer.from('Hello Crypto! ' + Math.random().toString());

const documentHash = hashDocument(document);
const txHash = publishProof(privateKeyHex, destinationAddress, documentHash);
```

ES5
```js
var ethproof = require('ethproof');

var privateKeyHex = '774a1dee2b3a3d6c64c0e47124d3ac7522ae5c57e1fef1c4abb1b3dd63bffee6';
var destinationAddress = '44241d4e6a0fd2acff819478a87b7cdfe7963468';
var document = Buffer.from('Hello Crypto! ' + Math.random().toString());

var documentHash = ethproof.hashDocument(document);
var txHash = ethproof.publishProof(privateKeyHex, destinationAddress, documentHash);
```

The above examples provide no JSON RPC URI to the `publishProof(...)` call.  As such they default to localhost and default port.  If you would like to use Infura or any other custom URI pass it as the final parameter.  For example:

```js
var txHash = publishProof(privateKeyHex, destinationAddress, documentHash, 'https://rinkeby.infura.io/');
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Use `npm test` to run linting and tests.

## Author

**ethproof** © [Stefan Gordon](https://github.com/stefangordon), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Stefan Gordon with help from contributors ([list](https://github.com/stefangordon/ethproof/contributors)).

> [github.com/stefangordon](https://github.com/stefangordon) · GitHub [@Stefan Gordon](https://github.com/stefangordon) · Twitter [@stefangordon](https://twitter.com/stefangordon)
