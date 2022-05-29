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

    // Get/Access all data from mongodb database
    // Server Site Code
    app.get("/service", async (req, res) => {
      const result = await testCollection.find().toArray();
      res.send(users);
    });

    // Client site code
    useEffect(() => {
      fetch("http://localhost:5000/service")
        .then((res) => res.json())
        .then((data) => console.log(data));
    }, []);

    // Get/Access Spacific data from mongodb database with id/email
    // Server Site Code
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const result = await testCollection.find({ _id: ObjectId(id) }).toArray();
      res.send(result);
    });
    // Client site code
    useEffect(() => {
      fetch(`http://localhost:5000/service/${id}`)
        .then((res) => res.json())
        .then((data) => console.log(data));
    }, []);

    // Get/Access Spacific data from mongodb database with multiple query
    // Server Site Code
    app.get("/service", async (req, res) => {
      const query = req.body;
      const result = await testCollection.find(query).toArray();
      res.send(result);
    });

    // Client site code
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

    // Get/Access Limited data from mongodb database after find with query
    // Server Site Code
    app.get("/service", async (req, res) => {
      const query = {};
      const findData = testCollection.find(query);
      const result = await findData.skip(5).limit(3).toArray(); //you can also set skip & limit range dynamicly.
      res.send(result);
    });

    // Client site code
    useEffect(() => {
      fetch("http://localhost:5000/service")
        .then((res) => res.json())
        .then((data) => console.log(data));
    }, []);

    // Post API
    // Post data without cheack on mongodb database
    // Server Site Code
    app.post("/service", async (req, res) => {
      const service = req.body;
      const result = await testCollection.insertOne(service);
      res.send(result);
    });

    // Client site code
    const newData = {
      // stroe new Data in Object here
      name: "",
      price: "",
    };
    fetch("http://localhost:5000/service", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((result) => {
        const allData = [...previusData, newData];
        console.log(newReview);
      });

    // Post data With cheack in mongodb database. Batter to use Put Methood for this task
    // Server Site Code
    app.post("/service/:email", async (req, res) => {
      const service = req.body.service;
      const query = req.body.newQuery;
      query.email = email;
      const exist = testCollection.findOne(query);
      if (exist) {
        res.send({ result: "success" });
      } else {
        const result = await testCollection.insertOne(service);
        res.send(result);
      }
    });

    // Client Site Code
    const service = {
      name: "",
      price: "",
    };
    const newQuery = {
      name: "",
      time: "",
    };
    fetch("http://localhost:5000/service", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ service, newQuery }),
    })
      .then((res) => res.json())
      .then((result) => {
        const allData = [...previusData, newData];
        console.log(newReview);
      });

    // Put Methood
    // Update & insert Data on database by id/email/otherQuery
    // Server site Code
    app.put("/service/:id", async (req, res) => {
      const id = req.params.id;
      const service = req.body;

      const result = await testCollection.updateOne(
        { _id: ObjectId(id) }, // Find Data by query many time query type is "_id: id" Cheack on database
        {
          $set: service, // Set updated Data
        },
        { upsert: true } // define work
      );
      res.send({ result });
    });

    // Client Site Code
    const updatedData = {
      name: "",
      role: "",
    };

    fetch(`http://localhost:5000/service/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("item Updated successfully!!!");
      });

    // Patch api
    // update Data by id/email/othersQueary
    // Server site code
    app.patch("/service/:id", async (req, res) => {
      const id = req.params.id;
      const service = req.body;
      const result = await testCollection.updateOne(
        { _id: id }, // sometime _id:ObjectId(id)
        {
          $set: service,
        }
      );
      res.send(result);
    });

    // Client site code

    // const updatedData = {
    //   name: "",
    //   role: "",
    // };

    // fetch(`http://localhost:5000/service/${id}`, {
    //   method: "patch",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(updatedData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     alert("item Updated successfully!!!");
    //   });

    // Delete API
    // Delete Data form mongodb Database by id
    // Server site code
    app.delete("/service/:id", async (req, res) => {
      const id = req.params.id;
      const result = await testCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });

    // Client Site Code
    fetch(`http://localhost:5000/service/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {});
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
