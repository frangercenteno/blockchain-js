import { SHA256 } from 'crypto-js';

const DIFFICULTY = 3;

class Block {
  constructor(timestamp, prevHash, hash, data, nonce) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  // Genesis Block
  static get genesis() {
    // fake timestamp, it should actual date
    const timestamp = (new Date(2000, 0, 1)).getTime();
    return new this(timestamp, undefined, 'g3n3s1s-h4sh', 'i like arepa');
  }

  // Mine
  static mine(prevBlock, data) {
    const { hash: prevHash } = prevBlock;
    let nonce = 0;
    let timestamp;
    let hash;
    // Proof of work
    do {
      timestamp = Date.now();
      nonce += 1;
      hash = this.hash(timestamp, prevHash, data, nonce);
    } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

    return new this(timestamp, prevHash, hash, data, nonce);
  }

  // secure hash algorithm
  static hash(timestamp, prevHash, data, nonce) {
    return SHA256(`${timestamp}${prevHash}${data}${nonce}`).toString();
  }

  toString() {
    const {
      timestamp, prevHash, hash, data, nonce
    } = this;

    return `Block - 
      timestamp:            ${timestamp}
      prevHash:             ${prevHash}
      hash:                 ${hash}
      data:                 ${data}
      nonce:                ${nonce}`;
  }
}

export default Block;
