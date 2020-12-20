import './App.css';
import React, {useState, useEffect} from 'react'
import Web3 from 'web3'
import Navbar from './components/Navbar'
import {HelloWorld} from './abi/HelloWorld.json'

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x62e26AD609f5396b731ae8bdad6DfD44d999D666"
const HelloWorld = new web3.eth.Contract(HelloWorld, contractAddress)

function App() {
  const [string, setString] = useState(undefined)
  const [getString, setGetString] = useState([])

  const stringSet = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0]
    const gas = await HelloWorld.methods.set(string).estimateGas();
    const post = await HelloWorld.methods.set(string).send({
      from: account,
      gas,
    })
  }

  const stringGet = async (t) => {
    t.preventDefault();
    const post = await HelloWorld.methods.get().call();
    setGetString(post);
  }

  return (
    <div className="main">
      <div className="card">
        <form className="form" onSubmit={stringSet}>
          <input
            className="input"
            type="text"
            name="name"
            onChange={(t) => setString(t.target.value)}
          />
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
