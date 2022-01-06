import React from 'react'
import TransactionDetails from './TransactionDetails';

const TransactionsList = ({info, onTransactionSelected}) => {

    if (!info) {
        return <p> loading..</p>
    }

    const make_label = function (res) {

        let eth_value = (res.value*10**-18).toFixed(4)
        let lab = ''
        let label = lab.concat(eth_value, ' ETH')
        return label
    }


    const transactionOptions = info.map((result, index) => {
        if (result.input.slice(0,9).toString() === '0xea3bd5d' ) {
        return <option value={index} key = {index}>{make_label(result)}</option>
    }}
    )

    const handleChange = function(event) {
        const chosenTransaction = info[event.target.value]
        onTransactionSelected(chosenTransaction);
        // console.log(chosenTransaction)
    }

    return (
        <>
        <h3>I'm the transaction list</h3>
        <select defaultValue="" onChange={handleChange}>
            <option value="" selected>Choose a Transaction</option>
            {transactionOptions}
        </select>
        </>
    )
}
    
export default TransactionsList