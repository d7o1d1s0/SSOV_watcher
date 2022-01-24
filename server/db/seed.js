const mongoose = require("mongoose");
const DPXBuys = require("./dopexbuys");
const db = 'mongodb://localhost/dpx_options'
const fetch = require("node-fetch");

// console.log('starting life')

let obj;
let saveCounter = 0;

const contracts = [
    '0x711da677a0d61ee855dad4241b552a706f529c70',
    '0xd4cafe592be189aeb7826ee5062b29405ee63488',
    '0x48252edbfcc8a27390827950ccfc1c00152894e3',
    '0x460f95323a32e26c8d32346abe73eb94d7db08d6'
]

const urls = function (list) {
    let url_list = [];
    for (let i = 0; i < contracts.length; i++) {
        let temp_string1 = ''
        let temp_string2 = temp_string1.concat('https://api.arbiscan.io/api?module=account&action=txlist&address=', list[i], '&startblock=1&endblock=99999999&sort=des')
        console.log(temp_string2)
        url_list.push(temp_string2)
    }
    return url_list
}

const url = urls(contracts)

const type_checker = function (input) {
    if (input.slice(0, 10) == '0xea3bd5df') {
        return 'Purchase'
    } else if (input.slice(0, 10) == '0x8144eeba') {
        return 'Deposit'
    } else {
        return 'Unknown'
    }
}

const purchase_amount_getter = function (input) {
    if (type_checker(input) == 'Purchase') {
        return (parseInt(input.slice(120, 138), 16)*10**-18).toFixed(2) + ' contract(s)'
    } else {
        return null
    }   
}



const api_call1 = async function () {

    mongoose.connect(db)
    .then(() => console.log("mongodb connection success"))
    .catch(error => console.log(error));


    try {
        const response = await fetch(url[3]);
        const json = await response.json();
        obj = json.result;



        for (let i = 0; i < obj.length; i++) {
            let buy = new DPXBuys({
                blockNumber: obj[i].blockNumber,
                timeStamp: obj[i].timeStamp,
                hash: obj[i].hash,
                nonce: obj[i].nonce,
                blockHash: obj[i].blockHash,
                transactionIndex: obj[i].transactionIndex,
                from: obj[i].from,
                to: obj[i].to,
                value: obj[i].value,
                gas: obj[i].gas,
                gasPrice: obj[i].gasPrice,
                isError: obj[i].isError,
                txreceipt_status: obj[i].txreceipt_status,
                input: obj[i].input,
                contractAddress: obj[i].contractAddress,
                cumulativeGasUsed: obj[i].cumulativeGasUsed,
                gasUsed: obj[i].gasUsed,
                confirmations: obj[i].confirmations,
                type: type_checker(obj[i].input),
                purchaseAmount: purchase_amount_getter(obj[i].input),
            })
            // console.log(obj[i])

            buy.save(() => {
                console.log("saved: " + buy._id)
                console.log(saveCounter)
                saveCounter++;

                if (saveCounter === obj.length) {
                    mongoose.disconnect()
                        .then(() => console.log("saved succesfully and mongodb   disconnected"))
                        .catch(error => console.log(error));
                }
            })

        }


    } catch (err) {
        console.log(err);
    }
}

api_call1()