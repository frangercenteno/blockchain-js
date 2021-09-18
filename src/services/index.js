import express from 'express';

import Blockchain from '../blockchain';
import P2PService from './p2p';

const { HTTP_PORT = 3000 } = process.env;

const app = express();
const blockchain = new Blockchain();
const p2pService = new P2PService(blockchain);

blockchain.addBlock('express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/blocks', (req, res) => {
  res.json(blockchain.blocks);
});

app.post('/mine', (req, res) => {
  const { body: { data } } = req;
  const block = blockchain.addBlock(data);

  p2pService.sync();

  res.json({
    blocks: blockchain.blocks.length,
    block,
  });
});

app.listen(HTTP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Service HTTP:${HTTP_PORT} listening...`);
  p2pService.listen();
});
