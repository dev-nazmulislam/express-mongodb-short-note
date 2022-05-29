# Express Mongobd Tutorial

1. [React Inastallation](https://github.com/dev-nazmulislam/react-short-note/tree/installation)
2. [React Fundamental Concepts](https://github.com/dev-nazmulislam/react-short-note/tree/react-fundamental)
3. [React Advanced concepts](https://github.com/dev-nazmulislam/react-short-note/tree/advanced)

# Advanced

### Basic Connact

```Js
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken"); // import jwt if use JsonWeb token
require("dotenv").config(); // import env file if use environment variables after install || npm install dotenv --save|| ane Create a .env file in the root of your project:

const port = process.env.PORT || 5000;
const app = express();

// used Middleware
app.use(cors());
app.use(express.json());

// Connact With MongoDb Database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.krxly.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Create a async fucntion to all others activity
async function run() {
  try {
    await client.connect();

    // Create Database to store Data
    const testCollection = client.db("testDatabaseName").collection("testData");


  } finally {
    // await client.close();
  }
}

// Call the fuction you decleare abobe
run().catch(console.dir);

// Root Api to cheack activity
app.get("/", (req, res) => {
  res.send("Hello From NR Computers!");
});

app.listen(port, () => {
  console.log(`NR Computers listening on port ${port}`);
});

```
