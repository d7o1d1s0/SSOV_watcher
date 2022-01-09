import React, { useState, useEffect } from 'react'

const BuysDetails = ({ buy }) => {

    const parse_hash = function (buy) {
        const string1 = ''
        const string2 = string1.concat(buy.hash.slice(0, 7), '..', buy.hash.slice(-5))
        return string2
    }

    const parse_time = function (buy) {
        const stamp = buy.timeStamp
        const time = new Date(stamp * 1000)
        const time_obj = time.toString()
        return time_obj
    }

    const from = buy.from

    return (
        <>
            <div className="buy-info">
                <h4>Option Buy</h4>
                <p>Hash: <a target="_blank" href={`https://arbiscan.io/tx/${buy.hash}`}>{parse_hash(buy)}</a></p>
                <p>Time: {parse_time(buy)}</p>
                <p>Address: <a target="_blank" href={`https://arbiscan.io/address/${from}`}>{from}</a></p>
            </div>
        </>
    )
}

export default BuysDetails