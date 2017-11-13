import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import Hex from 'crypto-js/enc-hex';
import EthereumTx from 'ethereumjs-tx';
import EthereumUtil from 'ethereumjs-util';
import Web3 from 'web3';
import Enum from 'enum';

const networks = new Enum({
  ropsten: 'https://ropsten.infura.io/',
  production: 'https://mainnet.infura.io/',
  local: 'http://localhost:8545'
}, {ignoreCase: true});

export function hashDocument(input) {
  let words;

  if (Buffer.isBuffer(input)) {
    words = Base64.parse(input.toString('base64'));
  } else if (typeof input === 'string') {
    words = Base64.parse(input);
  } else {
    throw new TypeError('Expected input to be Buffer or String');
  }

  const hash = sha256(words);

  return hash.toString(Hex);
}

export function publishProof(privateKeyHex, toAddress, hash, network) {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(networks.get(network).value)
  );

  const gasPrice = web3.eth.getGasPrice();

  const tx = buildTransaction(privateKeyHex, toAddress, hash, gasPrice.toString());

  const serializedTx = EthereumUtil.addHexPrefix(tx.serialize().toString('hex'));
  web3.eth.sendSignedTransaction(
    serializedTx, (err, result) => {
      if (err) {
        console.log(err);
        return null;
      }
      console.log('success');
      return result;
    });
}

export function buildTransaction(privateKeyHex, toAddress, hash, gasPrice) {
  const privateKeyBuffer = Buffer.from(privateKeyHex, 'hex');
  const hashBuffer = Buffer.from(hash, 'hex');

  const txParams = {
    nonce: '0x00',
    gasPrice: '0',
    gasLimit: '0',
    to: EthereumUtil.addHexPrefix(toAddress),
    value: '0x00',
    data: hashBuffer,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 3
  };

  const tx = new EthereumTx(txParams);

  tx.gasPrice = gasPrice;
  tx.gasLimit = tx.getBaseFee();

  tx.sign(privateKeyBuffer);
  return tx;
}
