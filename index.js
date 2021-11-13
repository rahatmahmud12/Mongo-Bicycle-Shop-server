const express = require('express');
const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');

require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o1vd8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect()

        const database = client.db("assignment");
        const productCollection = database.collection("products");


        //get API

        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })

        //get single product

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) };
            const product = await productCollection.findOne(query);
            res.json(product);

        })

        //post API

        app.post('/products', async (req, res) => {
            const product = req.body;
            console.log('hitting the post', product);


            const result = await productCollection.insertOne(product);
            console.log(result)
            res.json(result)
        })

        //delete

        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.json(result)
        })




    }
    finally {
        // await client.close()

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('okay my bicycle is running')
})

app.listen(port, () => {
    console.log(`listen at ${port}`)
})

//assignment-twelve
//LzcCGsaDVVPItEDf