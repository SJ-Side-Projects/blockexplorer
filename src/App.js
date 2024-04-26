import { useEffect, useState } from 'react';
import { getCurBlock, getTransactions,parseTransaction } from './utils/ether';
import './App.css';


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

const TABLE_HEADERS = [
  'transactionIndex',
  'type',
  'from',
  'to',
  'value',
  'gasPrice',
  'hash',
  'nonce',
];

function App() {
  const [blockNumber, setBlockNumber] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const curBlock = await getCurBlock();
    setBlockNumber(curBlock);
    const txs = await getTransactions(curBlock);
    setTransactions(txs);
    console.log(txs[0])
    setIsLoading(false);
  }

  const refresh = () =>{
    setIsLoading(true);
    loadData();
  }

  return (
  <div className="App">
    <h1>Ethereum Block Explorer</h1>
    <h2>Block Number: {blockNumber}</h2>
    <button onClick={refresh}>Refresh</button>
    {
      !isLoading ? 
        <div className="TableContainer">
          <table>
            <thead>
              <tr>
                {TABLE_HEADERS.map((header, i) => <th key={i}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {
                transactions.length ? transactions.map((tx, i) => (
                  <tr key={i}>
                    {TABLE_HEADERS.map((header, j) => <td key={i+j}>{parseTransaction(tx)[header]}</td>)}
                  </tr>
                ))
                : null
              }
            </tbody>
          </table>
        </div>
      : <p>Loading...</p>
    }
    
    
  </div>
);
}

export default App;
