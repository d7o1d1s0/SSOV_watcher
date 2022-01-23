import React, { useState, useEffect } from 'react'

const BuysDetails = ({ buy }) => {

    const token_contract = buy.to

    const parse_address = function (buy) {
        const string1 = ''
        const string2 = string1.concat(buy.from.slice(0, 7), '..', buy.from.slice(-5))
        return string2
    }

    const type_checker = function (buy) {
        if (buy.input.slice(0, 10) == '0xea3bd5df') {
            return 'Purchase'
        } else if (buy.input.slice(0, 10) == '0x8144eeba') {
            return 'Deposit'
        } else {
            return 'Unknown'
        }
    }

    const amount_getter = function (buy) {
        if (type_checker(buy) == 'Purchase') {
            return (parseInt(buy.input.slice(120, 138), 16)*10**-18).toFixed(2) + ' contract(s) ' + (buy.value*10**-18).toFixed(3) + ' ETH'
        } else if (type_checker(buy) == 'Deposit') {
            return (buy.value*10**-18).toFixed(3) + ' ETH'
        } else {
            return 'Unknown'
        }
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

    const thisContractList = [
        { 'token': 'ETH', 'address': '0x711da677a0d61ee855dad4241b552a706f529c70' },
        { 'token': 'rDPX', 'address': '0xd4cafe592be189aeb7826ee5062b29405ee63488' },
        { 'token': 'DPX', 'address': '0x48252edbfcc8a27390827950ccfc1c00152894e3' },
        { 'token': 'gOHM', 'address': '0x460f95323a32e26c8d32346abe73eb94d7db08d6' }
    ]

    const token_finder = function (add, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].address == add) {
                return list[i].token
            }
        }
    }

    const strike_finder = function (token, strike_index) {
        
        let list = [
            [
                { 'token': 'ETH', 'strike': 4000 },
                { 'token': 'ETH', 'strike': 4500 },
                { 'token': 'ETH', 'strike': 5000 },
                { 'token': 'ETH', 'strike': 6000 },
                { 'token': 'ETH', 'strike': 7000 },
            ],
            [
                { 'token': 'rDPX', 'strike': 55 },
                { 'token': 'rDPX', 'strike': 66 },
                { 'token': 'rDPX', 'strike': 88 },
                { 'token': 'rDPX', 'strike': 111 },
                { 'token': 'rDPX', 'strike': 133 },
            ], [
                { 'token': 'DPX', 'strike': 1700 },
                { 'token': 'DPX', 'strike': 2000 },
                { 'token': 'DPX', 'strike': 2500 },
                { 'token': 'DPX', 'strike': 3333 },
            ], [
                { 'token': 'gOHM', 'strike': 15000 },
                { 'token': 'gOHM', 'strike': 20000 },
                { 'token': 'gOHM', 'strike': 25000 },
                { 'token': 'gOHM', 'strike': 30000 },
            ],
        ]

        for (let i = 0; list.length; i++) {
            if (list[i][0].token == token) {
                return list[i][strike_index]
            }
        }
    }

    const strike_getter = function (buy) {
        if (type_checker(buy) == 'Deposit') {
            return null
        } else if (type_checker(buy) == 'Purchase') {
            const strike_index = buy.input[73]
            const token = token_finder(token_contract, thisContractList)
            return strike_finder(token.toString(), strike_index).strike
        } else {
            return 'Unknown'
        }
        
    }  
    const token = token_finder(token_contract, thisContractList)

    return (
        <>
            <div className="buy-info">
                <h4>{type_checker(buy)}</h4>
                <p>Hash: <a target="_blank" href={`https://arbiscan.io/tx/${buy.hash}`}>{parse_hash(buy)}</a></p>
                <p>Time: {parse_time(buy)}</p>
                <p>Address: <a target="_blank" href={`https://arbiscan.io/address/${buy.from}`}>{parse_address(buy)}</a></p>
                <p>Token: {token}</p>
                { strike_getter(buy) ? <p>Strike: {strike_getter(buy)}</p> : null }
                <p>Amount: {amount_getter(buy)}</p>
            </div>
        </>
    )
}

export default BuysDetails

// {txInfo ? <div><p>Value: {txData(txInfo)} {token}</p>
//         </div> : null}