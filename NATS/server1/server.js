const express = require("express");
require('./model')
const mongoose = require("mongoose");
const { connect, StringCodec } = require("nats");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const User = require('mongoose').model('user')

const sc = StringCodec();

// Connect to NATS server
connect({ servers: "localhost:4222" })
  .then(async (nc) => {
    console.log("Connected to NATS server");

    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/server1", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }

    // Subscribe to a subject
    const subscription = nc.subscribe("api.events");
    (async function () {
      for await (const m of subscription) {
        // Handle incoming messages
        const data = sc.decode(m.data);
        console.log("Received message:", data);
      }
    })().catch((err) => {
      console.error("Error handling NATS subscription:", err);
    });

    // API endpoint-------------------------
    app.post("/api/event", async(req, res) => {
      const eventData = req.body;

      nc.publish("api.events", sc.encode(JSON.stringify(eventData)));

      res.status(200).json({ message: "Event published successfully" });
    });
    
    // add user-----------------
    app.post("/api/adduser", async(req, res) => {
        const eventData = req.body;
  
        const newUser = new User({
          username: eventData.name,
          password: eventData.password
        })
  
        const users = await newUser.save()
  
        nc.publish("api.adduser", sc.encode(JSON.stringify(users)));
  
        res.status(200).json({ message: "Event published successfully" });
      });

    // Start the server
    const port = 3001;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to NATS server:", err);
  });
