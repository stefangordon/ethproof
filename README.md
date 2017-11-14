
# ethproof

[![NPM version](https://img.shields.io/npm/v/ethproof.svg?style=flat)](https://npmjs.com/package/ethproof) [![NPM downloads](https://img.shields.io/npm/dm/ethproof.svg?style=flat)](https://npmjs.com/package/ethproof) [![CircleCI](https://circleci.com/gh/stefangordon/ethproof/tree/master.svg?style=shield)](https://circleci.com/gh/stefangordon/ethproof/tree/master)  [![codecov](https://codecov.io/gh/stefangordon/ethproof/branch/master/graph/badge.svg)](https://codecov.io/gh/stefangordon/ethproof)

## Install

```bash
npm install --save git+https://github.com/stefangordon/ethproof.git
```

## Usage


```js
import {hashDocument, publishProof} from 'ethproof'

const privateKeyHex = '774a1dee2b3a3d6c64c0e47124d3ac7522ae5c57e1fef1c4abb1b3dd63bffee6';
const destinationAddress = '44241d4e6a0fd2acff819478a87b7cdfe7963468';
const document = Buffer.from('Hello Crypto! ' + Math.random().toString());

const documentHash = hashDocument(document);
const txHash = publishProof(privateKeyHex, destinationAddress, documentHash, 'rinkeby');
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
