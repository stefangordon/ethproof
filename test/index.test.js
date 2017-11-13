import {hashDocument, publishProof, buildTransaction} from '../src/';

const privateKeyHex = '774a1dee2b3a3d6c64c0e47124d3ac7522ae5c57e1fef1c4abb1b3dd63bffee6';
const addressHex = '44241d4e6a0fd2acff819478a87b7cdfe7963468';
const destinationAddress = '0000000000000000000000000000000000000617';

test('[hashDocument] is a function', () => {
  expect(typeof hashDocument).toBe('function');
});

test('[hashDocument] hashes a small buffer', () => {
  const buf = Buffer.from('Hello Crypto!');
  expect(hashDocument(buf)).toBe('b529dd6dbeef9b6de657e785d47515554794ec41818837446d36cb2de1ebfb48');
});

test('[hashDocument] does input validation', () => {
  expect(() => hashDocument(21)).toThrowError(TypeError);
});

test('[publishProof] is a function', () => {
  expect(typeof publishProof).toBe('function');
});

// This test publishes a real transaction, so it is skipped by default
test.skip('[publishProof] publishes a transaction to the chain', () => {
  const document = Buffer.from('Hello Crypto!');
  const documentHash = hashDocument(document);
  const txHash = publishProof(privateKeyHex, destinationAddress, documentHash, 'ropsten');
  expect(txHash).toBeTruthy();
  console.log(txHash);
});

test('[buildTransaction] builds a valid transaction', () => {
  const document = Buffer.from('Hello Crypto!');
  const documentHash = hashDocument(document);
  const tx = buildTransaction(privateKeyHex, addressHex, documentHash, undefined);
  expect(tx.validate()).toBeTruthy();  // Use tx.validate(true) to show error text
  expect(tx.getSenderAddress().toString('hex')).toBe(addressHex);
});
