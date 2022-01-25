const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const buyschema = new Schema({
    
    blockNumber: {
        type: String,
    },
    timeStamp: {
        type: String,
    },
    hash: {
        type: String,
        required: true
    },
    nonce: {
        type: String,
    },
    blockHash: {
        type: String,
    },
    transactionIndex: {
        type: String,
    },
    from: {
        type: String,
    },
    to: {
        type: String,
    },
    value: {
        type: String,
    },
    gas: {
        type: String,
    },
    gasPrice: {
        type: String,
    },
    isError: {
        type: String,
    },
    txreceipt_status: {
        type: String,
    },
    input: {
        type: String,
    },
    contractAddress: {
        type: String,
    },
    cumulativeGasUsed: {
        type: String,
    },
    gasUSed: {
        type: String,
    },
    confirmations: {
        type: String,
    },
    type: {
        type: String
    },
    purchaseAmount: {
        type: String
    },
    token: {
        type: String
    },

})

module.exports = DPXBuys = mongoose.model("buys", buyschema);
