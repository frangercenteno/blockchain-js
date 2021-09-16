import Block from '../block';

export default (blockchain) => {
  const [genesisBlock, ...blocks] = blockchain;

  if (JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis)) throw Error('Invalid Genesis block.');

  for (let i = 0; i < blocks.length; i += 1) {
    const {
      prevHash, timestamp, hash, data, nonce, difficulty,
    } = blocks[i];
    const previousBlock = blockchain[i];

    if (prevHash !== previousBlock.hash) throw Error('Invalid previous hash.');
    if (hash !== Block.hash(timestamp, prevHash, data, nonce, difficulty)) throw Error('Invalid hash.');
  }

  return true;
};
