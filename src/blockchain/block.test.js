import Block from './block';

describe('Block', () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;

  beforeEach(() => {
    timestamp = new Date(2010, 1, 1);
    previousBlock = Block.genesis;
    data = 't3st-d4t4';
    hash = 'h454';
  });

  it('create a instance with parameters', () => {
    const block = new Block(timestamp, previousBlock.hash, hash, data);
    expect(block.timestamp).toEqual(timestamp);
    expect(block.prevHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
  });

  it('use static mine()', () => {
    const block = Block.mine(previousBlock, data);
    expect(block.hash.length).toEqual(64);
    expect(block.prevHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
  });

  it('use static hash()', () => {
    hash = Block.hash(timestamp, previousBlock.hash, data);
    expect(hash).toEqual('9d29ec449c40e723c52ca387dbde981dba2a47000e374e83646b4fa73b8dcf68');
  });

  it('use toString()', () => {
    const block = Block.mine(previousBlock, data);
    expect(typeof block.toString()).toEqual('string');
  });
});
