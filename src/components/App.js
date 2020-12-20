import './App.css';
import React, {useState, useEffect} from 'react'
import Web3 from 'web3'
// import Navbar from './Navbar'
import {HelloWorld} from '../abis/abi.js'

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x62e26AD609f5396b731ae8bdad6DfD44d999D666"
const storageContract = new web3.eth.Contract(HelloWorld, contractAddress)

function App() {
  const [string, setString] = useState(undefined)
  const [getString, setGetString] = useState([])

  const stringSet = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0]
    const gas = await storageContract.methods.setMessage(string).estimateGas();
    const post = await storageContract.methods.setMessage(string).send({
      from: account,
      gas,
    })
  }

  const stringGet = async (t) => {
    t.preventDefault();
    const post = await storageContract.methods.getMessage().call();
    setGetString(post);
  }

  return (
    <div className="main">
      
      <div className="card">
        <form className="form" onSubmit={stringSet}>
          <label>
            Set your String!
          <input
            className="input"
            type="text"
            name="name"
            onChange={(t) => setString(t.target.value)}
          />
          </label>
          <button className="button" type="submit" value="Confirm">
            Confirm
          </button>
        </form>
        <br />
        <button className="button" onClick={stringGet} type="button">
          Get your string!
        </button>
        {getString}
      </div>
    </div>
  );
}

export default App;
