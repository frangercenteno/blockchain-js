import Blockchain from '../blockchain';
import validate from './validate';

describe('validate()', () => {
  let blockchain;
  let blockchainB;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchainB = new Blockchain();
  });

  it('validates a valid chain', () => {
    blockchain.addBlock('bl4ck-1');
    blockchain.addBlock('bl4ck-2');

    expect(validate(blockchain.blocks)).toBe(true);
  });

  it('invalidates a chain with a corrupt genesis block', () => {
    blockchain.blocks[0].data = 'h4ck-data';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid Genesis block.');
  });

  it('invalidates a chain with a corrupt previousHash within a block', () => {
    blockchain.addBlock('bl4ck-1');
    blockchain.blocks[1].prevHash = 'h4ck-previoushash';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid previous hash.');
  });

  it('invalidates a chain with a corrupt hash within a block', () => {
    blockchain.addBlock('bl4ck-1');
    blockchain.blocks[1].hash = 'h4ck-hash';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid hash.');
  });

  it('does not replace the chain with one with less blocks', () => {
    blockchain.addBlock('block-1');

    expect(() => {
      blockchain.replace(blockchainB.blocks);
    }).toThrowError('Received chain is not longer than current chain.');
  });

  it('not replace the chain with one is not valid', () => {
    blockchainB.addBlock('block-1');
    blockchainB.blocks[1].data = 'block-h4ck';

    expect(() => {
      blockchain.replace(blockchainB.blocks);
    }).toThrowError('Received chain is invalid');
  });
});
