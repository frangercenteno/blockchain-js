import Blockchain from './blockchain';
import Block from './block';

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('every blockchain has a genesis blockchain', () => {
    const [genesisBlock] = blockchain.blocks;
    expect(genesisBlock).toEqual(Block.genesis);
    expect(blockchain.blocks.length).toEqual(1);
  });

  it('use addBlock()', () => {
    const data = 'd4t4';
    blockchain.addBlock(data);
    const [, lasBlock] = blockchain.blocks;
    expect(lasBlock.data).toEqual(data);
    expect(blockchain.blocks.length).toEqual(2);
  });
});
