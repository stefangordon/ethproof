
# ethproof

[![NPM version](https://img.shields.io/npm/v/ethproof.svg?style=flat)](https://npmjs.com/package/ethproof) [![NPM downloads](https://img.shields.io/npm/dm/ethproof.svg?style=flat)](https://npmjs.com/package/ethproof) [![CircleCI](https://circleci.com/gh/stefangordon/ethproof/tree/master.svg?style=shield)](https://circleci.com/gh/stefangordon/ethproof/tree/master)  [![codecov](https://codecov.io/gh/stefangordon/ethproof/branch/master/graph/badge.svg)](https://codecov.io/gh/stefangordon/ethproof)
 [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/stefangordon/donate)

## Install

```bash
npm i ethproof
```

## Usage


```js
import {hashDocument, publishProof} from 'ethproof'

let hash = hashDocument(<string or Buffer>);
let tx = publishProof(
    privateKeyHex,
    '0x44241d4e6a0fd2acff819478a87b7cdfe7963468',
    hash,
    'ropsten');
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
