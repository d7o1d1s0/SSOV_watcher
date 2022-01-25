import React, { useState, useEffect } from 'react'

const BuysDetails = ({ buy }) => {

    const parse_address = function (buy) {
        const string1 = ''
        const string2 = string1.concat(buy.from.slice(0, 7), '..', buy.from.slice(-5))
        return string2
    }

    const parse_hash = function (buy) {
        const string1 = ''
        const string2 = string1.concat(buy.hash.slice(0, 7), '..', buy.hash.slice(-5))
        return string2
    }

    const parse_time = function (buy) {
        const stamp = buy.timeStamp
        const time = new Date(stamp * 1000).toISOString().replace(/T/, ' ').slice(0,-5)
        return time
    }



    return (
        <>
            <div className="buy-info">
                <h4>{buy.type}</h4>
                <p>Hash: <a target="_blank" href={`https://arbiscan.io/tx/${buy.hash}`}>{parse_hash(buy)}</a></p>
                <p>Time: {parse_time(buy)}</p>
                <p>Address: <a target="_blank" href={`https://arbiscan.io/address/${buy.from}`}>{parse_address(buy)}</a></p>
                <p>Token: {buy.token}</p>
                { buy.strike ? <p>Strike: {buy.strike}</p> : null }
                { buy.purchaseAmount ? <p>Amount: {buy.purchaseAmount}</p> : null }
                { buy.type == 'Deposit' ? <p>Length of input: {buy.input.length}</p> : null }
                { buy.type == 'Deposit' ? <p>Number of strikes: {buy.input.slice(265, 266)}</p> : null }
                { buy.type == 'Deposit' ? <p>Strike Index 1: {buy.input.slice(329, 330)}</p> : null }
                { buy.type == 'Deposit' ? <p>Strike Index 2: {buy.input.slice(393, 394)}</p> : null }
            </div>
        </>
    )
}



export default BuysDetails

// {txInfo ? <div><p>Value: {txData(txInfo)} {token}</p>
//         </div> : null}