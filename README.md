# Express Mongobd Tutorial

### Basic Connact root file like `index.jx`

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

### Get API

## Get/Access all data from mongodb database

`Server Site Code`

```Js
app.get("/service", async (req, res) => {
      const result = await testCollection.find().toArray();
      res.send(users);
    });
```

`Client site code`

```Js
useEffect(() => {
      fetch("http://localhost:5000/service")
        .then((res) => res.json())
        .then((data) => console.log(data));
    }, []);
```

## Get/Access Spacific data from mongodb database with id/email

`Server Site Code`

```Js
app.get("/service/:id", async (req, res) => {
const id = req.params.id;
const result = await testCollection.find({ \_id: ObjectId(id) }).toArray();
res.send(result);
});
```

`Client site code`

```Js
useEffect(() => {
fetch(`http://localhost:5000/service/${id}`)
.then((res) => res.json())
.then((data) => console.log(data));
}, []);

```

## Get/Access Spacific data from mongodb database with multiple query

`Server Site Code`

```Js
app.get("/service", async (req, res) => {
const query = req.body;
const result = await testCollection.find(query).toArray();
res.send(result);
});
```

`Client site code`

```Js
    const query = {
      email: "exampale@example.com",
      name: "set name",
      time: "set time",
    };
    useEffect(() => {
      fetch("http://localhost:5000/service", {
        method: "GET",
        body: JSON.stringify(query), // send any of query by which you find data
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }, []);
```

## Get/Access Limited data from mongodb database after find with query

`Server Site Code`

```Js
    app.get("/service", async (req, res) => {
      const query = {};
      const findData = testCollection.find(query);
      const result = await findData.skip(5).limit(3).toArray(); //you can also set skip & limit range dynamicly.
      res.send(result);
    });
```

`Client site code`

```Js
 useEffect(() => {
      fetch("http://localhost:5000/service")
        .then((res) => res.json())
        .then((data) => console.log(data));
    }, []);

```
