import Block from './src/blockchain/block';

const { genesis } = Block;

const block1 = Block.mine(genesis, 'd4t4-1');
const block2 = Block.mine(block1, 'd4t4-1');

console.log(block1.toString());

console.log(block2.toString());
