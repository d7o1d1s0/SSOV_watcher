const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        const db = client.db('dpx_options');
        const buysCollection = db.collection('buys');
        const buysRouter = createRouter(buysCollection);
        app.use('/api/buys', buysRouter);
    })
    .catch(console.error);

app.listen(5000, function () {
    console.log(`Listening on port ${this.address().port}`);
});