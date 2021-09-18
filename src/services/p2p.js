import WebSocket from 'ws';

const { P2P_PORT = 5000, PEERS } = process.env;
// PEERS=ws1, PEERS=ws2
const peers = PEERS ? PEERS.split(',') : [];
const MESSAGE = { BLOCKS: 'blocks' };

class P2PService {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });

    server.on('connection', (socket) => this.onConnection(socket));

    peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.on('open', () => this.onConnection(socket));
    });

    // eslint-disable-next-line no-console
    console.log(`Service ws:${P2P_PORT} listening...`);
  }

  onConnection(socket) {
    const { blockchain: { blocks } } = this;

    // eslint-disable-next-line no-console
    console.log('[ws:socket] connected');
    this.sockets.push(socket);

    socket.on('message', (message) => {
      const { type, value } = JSON.parse(message);

      try {
        if (type === MESSAGE.BLOCKS) this.blockchain.replace(value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`[ws:message] error ${error}`);
      }
    });

    socket.send(JSON.stringify({
      type: MESSAGE,
      value: blocks,
    }));
  }

  sync() {
    const { blockchain: { blocks } } = this;
    this.broadcast(MESSAGE.BLOCKS, blocks);
  }

  broadcast(type, value) {
    // eslint-disable-next-line no-console
    console.log(`[ws:broadcast] ${type}...`);
    const message = JSON.stringify({ type, value });
    this.sockets.forEach((socket) => socket.send(message));
  }
}

export default P2PService;
