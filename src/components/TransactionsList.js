import React from 'react'
import TransactionDetails from './TransactionDetails';

const TransactionsList = ({info, onTransactionSelected}) => {

    if (!info) {
        return <p> loading..</p>
    }

    const result_parse = function (res) {
        let hash_start_fin = ''
        let hash_s_f = hash_start_fin.concat(res.hash.slice(0, 7), '..', res.hash.slice(-5));
        return hash_s_f
    }

    const make_label = function (res) {
        let hash_start_fin = ''
        let hash_s_f = hash_start_fin.concat(res.hash.slice(0, 7), '..', res.hash.slice(-5));
        let eth_value = (res.value*10**-18).toFixed(4)
        let lab = ''
        let label = lab.concat(hash_s_f, '   ', eth_value)
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