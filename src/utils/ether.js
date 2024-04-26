import { Alchemy, Network } from 'alchemy-sdk';
import { formatEther } from '@ethersproject/units';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const getCurBlock = async () => {
  return await alchemy.core.getBlockNumber();
}

const getTransactions = async (blockNumber) => {
  const block = await alchemy.core.getBlockWithTransactions(blockNumber);
  return block.transactions;
}

const parseEther = (wei) => {
  return formatEther(wei);
}

const parseTransaction = (tx) => {
  return {
    ...tx,
    value: parseEther(tx.value),
    gasPrice: parseEther(tx.gasPrice),
  };
}




export { getCurBlock, getTransactions, parseTransaction };