const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();

const cors = require('cors');

require('dotenv').config()
const port = process.env.PORT || 5000;

//middle ware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o1vd8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('connected')
        const database = client.db("assignment");
        const productCollection = database.collection("products")
        const ordersCollection = database.collection("orders")
        const reviewsCollection = database.collection("reviews")

        //get api

        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })


        app.get('/orders', async (req, res) => {
            const cursor2 = ordersCollection.find({});
            const orders = await cursor2.toArray();
            res.send(orders);
        })


        app.get('/reviews', async (req, res) => {
            const cursor3 = reviewsCollection.find({});
            const reviews = await cursor3.toArray();
            res.send(reviews);
        })

        //get single product

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) };
            const product = await productCollection.findOne(query);
            res.json(product);

        })

        //post api
        app.post('/products', async (req, res) => {

            const product = req.body;
            console.log('hitting the post', product);


            const result = await productCollection.insertOne(product);
            console.log(result)
            res.json(result)
        })


        app.post('/orders', async (req, res) => {

            const order = req.body;
            console.log('hitting the post', order);


            const result = await ordersCollection.insertOne(order);
            console.log(result)
            res.json(result)
        })


        app.post('/reviews', async (req, res) => {

            const review = req.body;
            console.log('hitting the post', review);


            const result = await reviewsCollection.insertOne(review);
            console.log(result)
            res.json(result)
        })


        //delete

        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.json(result)
        })
    }


    finally {
        //await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('it is running')
})

app.listen(port, () => {
    console.log('running it at', port)
})




//assignment-twelve
//LzcCGsaDVVPItEDf