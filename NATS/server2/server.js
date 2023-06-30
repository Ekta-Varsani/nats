const express = require('express');
const { connect, StringCodec } = require('nats');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
require('./model')
const User = require('../server1/model')
const Order = require('mongoose').model('order')

const sc = StringCodec();

// Connect to NATS server
connect({ servers: 'localhost:4222' })
  .then(async (nc) => {
    console.log('Connected to NATS server');

    // try {
    //     await mongoose.connect("mongodb://127.0.0.1:27017/server2", {
    //       useNewUrlParser: true,
    //       useUnifiedTopology: true,
    //     });
    //     await mongoose.connect("mongodb://127.0.0.1:27017/server1", {
    //       useNewUrlParser: true,
    //       useUnifiedTopology: true,
    //     });
    //     console.log("Connected to MongoDB");
    //   } catch (error) {
    //     console.error("Failed to connect to MongoDB:", error);
    //   }
    // Subscribe to a subject--------------------------------------
    const subscription = nc.subscribe('api.events');
    (async function () {
      for await (const m of subscription) {
        // Handle incoming messages
        const data = sc.decode(m.data);
        console.log('Received message:', data);
      }
    })().catch((err) => {
      console.error('Error handling NATS subscription:', err);
    });

    // const subscriptionadduser = nc.subscribe('api.adduser');
    // (async function () {
    //   for await (const m of subscriptionadduser) {
    //     // Handle incoming messages
    //     const data = sc.decode(m.data);
    //     console.log('Received message:', data);
    //     const newUser = new User({
    //       username: 'foo',
    //       password: '123456'
    //     })
    //     const u = await newUser.save()
    //     console.log(u);
    //   }
    // })().catch((err) => {
    //   console.error('Error handling NATS subscription:', err);
    // });

    // add order
    // app.post("/api/addorder", async(req, res) => {
    //     const eventData = req.body;
  
    //     const order = new Order({
    //       orderid: eventData.orderid,
    //       urderid: eventData.urderid
    //     })
  
    //     const newOrder = await order.save()
  
    //     nc.publish("api.neworder", sc.encode(JSON.stringify(newOrder)));
  
    //     res.status(200).json({ message: "Event published successfully" });
    //   });

    // Start the server
    const port = 5001;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to NATS server:', err);
  });
