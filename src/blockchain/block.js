import { SHA256 } from 'crypto-js';

class Block {
  constructor(timestamp, prevHash, hash, data) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
  }

  // Genesis Block
  static get genesis() {
    // fake timestamp, it should actual date
    const timestamp = (new Date(2000, 0, 1)).getTime();
    return new this(timestamp, undefined, 'g3n3s1s-h4sh', 'i like arepa');
  }

  // Mine
  static mine(prevBlock, data) {
    const timestamp = Date.now();
    const { hash: previousHash } = prevBlock;
    const hash = this.hash(timestamp, previousHash, data);

    return new this(timestamp, previousHash, hash, data);
  }

  // secure hash algorithm
  static hash(timestamp, prevHash, data) {
    return SHA256(`${timestamp}${prevHash}${data}`).toString();
  }

  toString() {
    const {
      timestamp, prevHash, hash, data,
    } = this;

    return `Block - 
      timestamp:            ${timestamp}
      prevHash:             ${prevHash}
      hash:                 ${hash}
      data:                 ${data}`;
  }
}

export default Block;
