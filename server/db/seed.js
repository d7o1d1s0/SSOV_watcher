const mongoose = require("mongoose");
const DPXBuys = require("./dopexbuys");
const db = 'mongodb://localhost/dpx_options'
const fetch = require("node-fetch");

// console.log('starting life')



mongoose.connect(db)
    .then(() => console.log("mongodb connection success"))
    .catch(error => console.log(error));


async function api_call() {
    const url = 'https://api.arbiscan.io/api?module=account&action=txlist&address=0x711da677a0d61ee855dad4241b552a706f529c70&startblock=1&endblock=99999999&sort=des'

    let obj;
    let saveCounter = 0;

    try {
        const response = await fetch(url);
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
            })
            // console.log(obj[i])

            buy.save(() => {
                console.log("saved" + buy)
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

api_call()