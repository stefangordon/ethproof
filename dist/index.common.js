'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sha256 = _interopDefault(require('crypto-js/sha256'));
var Base64 = _interopDefault(require('crypto-js/enc-base64'));
var Hex = _interopDefault(require('crypto-js/enc-hex'));
var EthereumTx = _interopDefault(require('ethereumjs-tx'));
var EthereumUtil = _interopDefault(require('ethereumjs-util'));
var Web3 = _interopDefault(require('web3'));

var localDefault = 'http://localhost:8545';

/**
   * Generate hash of a document
   * @param {string|buffer} document - The document as a string or buffer
   * @return {string} Hex string representing hash
   */
function hashDocument(document) {
  var words;

  if (Buffer.isBuffer(document)) {
    words = Base64.parse(document.toString('base64'));
  } else if (typeof document === 'string') {
    words = Base64.parse(document);
  } else {
    throw new TypeError('Expected document to be Buffer or String');
  }

  var hash = sha256(words);

  return hash.toString(Hex);
}

/**
   * Publishes a proof of existence to the Ethereum chain
   * @param {string} privateKeyHex - Private key as a hex string
   * @param {string} toAddress - Destination address
   * @param {string} hash - Hash as hex string
   * @param {string} rpcUri - Optional RPC Uri.  Defaults to http://localhost:8545
   * @return {string} Hex string representing hash
   */
function publishProof(privateKeyHex, toAddress, hash, rpcUri) {
  if (!EthereumUtil.isValidAddress(EthereumUtil.addHexPrefix(toAddress))) {
    throw new Error('Invalid destination address.');
  }

  if (!rpcUri) {
    rpcUri = localDefault;
  }

  var web3 = new Web3(
    new Web3.providers.HttpProvider(rpcUri)
  );

  var tx = buildTransaction(privateKeyHex, toAddress, hash, web3);

  var serializedTx = EthereumUtil.addHexPrefix(tx.serialize().toString('hex'));
  var txHash = web3.eth.sendRawTransaction(serializedTx);
  console.log('Transaction hash:' + txHash);
  return txHash;
}

/**
   * Builds a signed transaction for transmitting,
   * primarily used internally.
   */
function buildTransaction(privateKeyHex, toAddress, hash, web3) {
  var privateKeyBuffer = Buffer.from(privateKeyHex, 'hex');

  if (!EthereumUtil.isValidPrivate(privateKeyBuffer)) {
    throw new Error('Invalid private key.');
  }

  var txParams = {
    nonce: '0x00',
    gasPrice: '0x09184e72a000', // How should we set this?
    gasLimit: '0x5A88',
    to: EthereumUtil.addHexPrefix(toAddress),
    value: '0x00',
    data: EthereumUtil.addHexPrefix(hash)
  };

  if (web3 !== undefined) {
    var gas = web3.eth.estimateGas(txParams);
    var nonce = web3.eth.getTransactionCount(
      EthereumUtil.bufferToHex(
        EthereumUtil.privateToAddress(privateKeyBuffer)
      ));
    txParams.gasLimit = web3.toHex(gas);
    txParams.nonce = web3.toHex(nonce);
  }

  var tx = new EthereumTx(txParams);

  tx.sign(privateKeyBuffer);
  return tx;
}

exports.hashDocument = hashDocument;
exports.publishProof = publishProof;
exports.buildTransaction = buildTransaction;
