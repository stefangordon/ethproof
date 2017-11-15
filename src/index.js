import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import Hex from 'crypto-js/enc-hex';
import EthereumTx from 'ethereumjs-tx';
import EthereumUtil from 'ethereumjs-util';
import Web3 from 'web3';

const localDefault = 'http://localhost:8545';

/**
   * Generate hash of a document
   * @param {string|buffer} document - The document as a string or buffer
   * @return {string} Hex string representing hash
   */
export function hashDocument(document) {
  let words;

  if (Buffer.isBuffer(document)) {
    words = Base64.parse(document.toString('base64'));
  } else if (typeof document === 'string') {
    words = Base64.parse(document);
  } else {
    throw new TypeError('Expected document to be Buffer or String');
  }

  const hash = sha256(words);

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
export function publishProof(privateKeyHex, toAddress, hash, rpcUri) {
  if (!EthereumUtil.isValidAddress(EthereumUtil.addHexPrefix(toAddress))) {
    throw new Error('Invalid destination address.');
  }

  if (!rpcUri) {
    rpcUri = localDefault;
  }

  const web3 = new Web3(
    new Web3.providers.HttpProvider(rpcUri)
  );

  const tx = buildTransaction(privateKeyHex, toAddress, hash, web3);

  const serializedTx = EthereumUtil.addHexPrefix(tx.serialize().toString('hex'));
  web3.eth.sendRawTransaction(
    serializedTx, (err, txHash) => {
      if (err) {
        console.log(err);
        return null;
      }
      console.log('success: ' + txHash);
      return txHash;
    });
}

/**
   * Builds a signed transaction for transmitting,
   * primarily used internally.
   */
export function buildTransaction(privateKeyHex, toAddress, hash, web3) {
  const privateKeyBuffer = Buffer.from(privateKeyHex, 'hex');

  if (!EthereumUtil.isValidPrivate(privateKeyBuffer)) {
    throw new Error('Invalid private key.');
  }

  const txParams = {
    nonce: '0x00',
    gasPrice: '0x09184e72a000', // How should we set this?
    gasLimit: '0x5A88',
    to: EthereumUtil.addHexPrefix(toAddress),
    value: '0x00',
    data: EthereumUtil.addHexPrefix(hash)
  };

  if (web3 !== undefined) {
    const gas = web3.eth.estimateGas(txParams);
    const nonce = web3.eth.getTransactionCount(
      EthereumUtil.bufferToHex(
        EthereumUtil.privateToAddress(privateKeyBuffer)
      ));
    txParams.gasLimit = web3.toHex(gas);
    txParams.nonce = web3.toHex(nonce);
  }

  const tx = new EthereumTx(txParams);

  tx.sign(privateKeyBuffer);
  return tx;
}
