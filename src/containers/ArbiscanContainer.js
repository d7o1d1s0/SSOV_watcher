import React, {useState, useEffect} from 'react'
import TransactionsList from '../components/TransactionsList';
import TransactionDetails from '../components/TransactionDetails';
import ContractDetails from '../components/ContractDetails';


const ArbiscanContainer = () => {

    const [info, setInfo] = useState(null);
    const [txInfo, setTxInfo] = useState(null)
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (contract) {
            setSelectedTransaction(null);
            getInfo();
            console.log(txInfo)
        }
    }, [contract]);

    const contractList = [
        {'token': 'ETH', 'address': '0x711da677a0d61ee855dad4241b552a706f529c70'}, 
        {'token': 'rDPX', 'address': '0xd4cafe592be189aeb7826ee5062b29405ee63488'},
        {'token': 'DPX', 'address': '0x48252edbfcc8a27390827950ccfc1c00152894e3'}, 
        {'token': 'gOHM', 'address': '0x460f95323a32e26c8d32346abe73eb94d7db08d6'}]

    const contractOptions = contractList.map((item, index) => {
        return <option value={item.address} key={index}>{item.token}</option>
    })

    const handleContractSelect = event  => {
        setContract(event.target.value);
    }

    

    const getInfo = function() {

        fetch(`https://api.arbiscan.io/api?module=account&action=txlist&address=${contract}&startblock=1&endblock=99999999&sort=des&apikey=${process.env.API_KEY}`)
        .then((res) => res.json())
        .then(data => setInfo(data.result));
        }
        
    const getTxInfo = function() {
        fetch(`https://api.arbiscan.io/api?module=logs&action=getLogs&fromBlock=4350809&toBlock=4350811&address=0xd4cafe592be189aeb7826ee5062b29405ee63488&topic0=0x78de8c82973d11415ea2004f458680aa6d5826c3e8a798496a61db56fa66417b&apikey=${process.env.API_KEY}`)
        .then((res) => res.json())
        .then(d => setTxInfo(d.result[0]));
    }    
    

    const onTransactionSelected = function(transaction) {
        setSelectedTransaction(transaction);
        getTxInfo();
    }

    return(
        <>
            <h2>I'm the Arbiscan Container</h2>
            <ContractDetails contractOptions={contractOptions} handleContractSelect={handleContractSelect}/>
            <h2>Contract: {contract}</h2>
            {contract ? <TransactionsList info={info} onTransactionSelected={onTransactionSelected}/> : null}
            {selectedTransaction ? <TransactionDetails txInfo={txInfo} selectedTransaction = {selectedTransaction} /> : null}
        </>
    )
}

export default ArbiscanContainer