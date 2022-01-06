import React from 'react'


const TransactionDetails = ({selectedTransaction}) => {

    const from = selectedTransaction.from
    const stamp = selectedTransaction.timeStamp
    const time = new Date (stamp*1000)
    const time_obj = time.toString()
    const hash = selectedTransaction.hash
    const input = selectedTransaction.input
    const gweis = parseInt(input.slice(120,138), 16)
    const token_contract = selectedTransaction.to
    const value = selectedTransaction.value

    const thisContractList = [
        {'token': 'ETH', 'address': '0x711da677a0d61ee855dad4241b552a706f529c70'}, 
        {'token': 'rDPX', 'address': '0xd4cafe592be189aeb7826ee5062b29405ee63488'},
        {'token': 'DPX', 'address': '0x48252edbfcc8a27390827950ccfc1c00152894e3'}, 
        {'token': 'gOHM', 'address': '0x460f95323a32e26c8d32346abe73eb94d7db08d6'}]

    const token_finder = function (add, list) {
        for (let i=0; (list.length); i=i+1) {
            if (list[i].address == add) {
                return list[i].token
            }
        }
    } 

    const token = token_finder(token_contract, thisContractList)

    const strike_finder = function (token, strike_index) {
        let list = [
            [
            {'token': 'ETH', 'strike': 4000},
            {'token': 'ETH', 'strike': 4500},
            {'token': 'ETH', 'strike': 5000},
            {'token': 'ETH', 'strike': 6000},
            {'token': 'ETH', 'strike': 7000},
        ],
        [
            {'token': 'rDPX', 'strike': 55},
            {'token': 'rDPX', 'strike': 66},
            {'token': 'rDPX', 'strike': 88},
            {'token': 'rDPX', 'strike': 111},
            {'token': 'rDPX', 'strike': 133},
        ],[
            {'token': 'DPX', 'strike': 1700},
            {'token': 'DPX', 'strike': 2000},
            {'token': 'DPX', 'strike': 2500},
            {'token': 'DPX', 'strike': 3333},
        ],[
            {'token': 'gOHM', 'strike': 15000},
            {'token': 'gOHM', 'strike': 20000},
            {'token': 'gOHM', 'strike': 25000},
            {'token': 'gOHM', 'strike': 30000},
        ],
        ]

        for (let i=0; list.length; i++) {
            if (list[i][0].token == token) {
                return list[i][strike_index]
            }
        }
    }

    const strike = strike_finder(token.toString(), input[73]).strike
    

    return (
        <>
        <p>Address: <a target="_blank" href={`https://arbiscan.io/address/${from}`}>{from}</a></p>
        <p>Time: {time_obj}</p>
        <p>Hash: <a target="_blank" href={`https://arbiscan.io/tx/${hash}`}>{hash}</a></p>
        <p>Token: {token}</p>
        <p>Strike: {strike}</p>
        <p>Amount: {gweis*10**-18} contract(s)</p>
        <p>Value: {(value*10**-18).toFixed(6)} ETH</p>
        </>
    )
}

// 0xea3bd5df0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000001158e460913d00000000000000000000000000000663209723924567f58017dbbc87f35c52aed6db1

export default TransactionDetails;