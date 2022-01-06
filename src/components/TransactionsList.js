import React from 'react'
import TransactionDetails from './TransactionDetails';

const TransactionsList = ({info, onTransactionSelected}) => {

    if (!info) {
        return <p> loading..</p>
    }


    const transactionOptions = info.map((result, index) => {
        if (result.input.slice(0,9).toString() === '0xea3bd5d' ) {
        return <option value={index} key = {index}>{result.hash}</option>
    }}
    )

    const handleChange = function(event) {
        const chosenTransaction = info[event.target.value]
        onTransactionSelected(chosenTransaction);
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