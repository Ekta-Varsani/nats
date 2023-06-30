// // import { connect } from "nats";
// const { connect } = require('nats')
// const servers = [
//   // {},
//   // { servers: ["demo.nats.io:4442", "demo.nats.io:4222"] },
//   // { servers: "demo.nats.io:4443" },
//   { port: 6100 },
//   { servers: "localhost:6100" },
// ];
// servers.forEach(async (v) => {
//   try {
//     const nc = await connect(v);
//     console.log(`connected to ${nc.getServer()}`);

//     nc.subscribe('demo.subject', (msg) => {
//       console.log('Received message:', msg);
//       console.log('ekta');
//       // console.log('Received message:', msg); console.flush();
//       nc.close();
//     });
  
//     const payload = Buffer.from('Hello NATS!');
//     nc.publish('demo.subject', payload);

//     // this promise indicates the client closed
//     const done = nc.closed();
//     // do something with the connection

//     // close the connection
//     await nc.close();
//     // check if the close was OK
//     const err = await done;
//     if (err) {
//       console.log(`error closing:`, err);
//     }
//   } catch (err) {
//     console.log(`error connecting to ${JSON.stringify(v)}`);
//   }
// });


//--------------------------------------------------------

// const { connect } = require('nats');

// async function connectAndSubscribe() {
//   const servers = [
//     { port: 6100 },
//     { servers: "localhost:6100" },
//   ];

//   for (const server of servers) {
//     try {
//       const nc = await connect(server);
//       console.log(`Connected to ${nc.getServer()}`);

//       // nc.subscribe('demo.subject', (msg) => {
//       //   console.log('Received message:', msg);
//       //   console.log('ekta');
//       //   nc.close();
//       // });

//       await new Promise((resolve) => {
//         nc.subscribe('demo.subject', (msg) => {
//           console.log('Received message:', msg);
//           console.log('ekta');
//           nc.close();
//           resolve();
//         });
//       });

//       const payload = Buffer.from('Hello NATS!');
//       nc.publish('demo.subject', payload);

//       await nc.closed();
//       console.log(`Closed connection to ${nc.getServer()}`);
//     } catch (err) {
//       console.log(`Error connecting to ${JSON.stringify(server)}`);
//     }
//   }
// }

// connectAndSubscribe().catch((err) => {
//   console.error('Error:', err);
// });


//----------------------------------

const { connect } = require('nats');

async function connectAndSubscribe() {
  const servers = [
    'localhost:4222',
    'demo.nats.io:4222'
  ];

  for (const server of servers) {
    try {
      const nc = await connect({ servers: [server] });
      console.log(`Connected to ${nc.getServer()}`);

      await nc.closed();
      console.log(`Closed connection to ${nc.getServer()}`);
    } catch (err) {
      console.log(`Error connecting to ${server}: ${err}`);
    }
  }
}

connectAndSubscribe().catch((err) => {
  console.error('Error:', err);
});


//--------------------------------------------------------

// const { connect } = require('nats');
  
// async function publishAndSubscribe() {
//   // Connect to NATS server
//   const nc = await connect({ url: 'nats://localhost:6100' });
//   console.log(`Connected to ${nc.getServer()}`);

//   // Subscribe to a subject
//   nc.subscribe('demo.subject', (msg) => {
//     console.log('Received message:', msg.data);
//   });

//   // Publish a message to the subject
//   const payload = Buffer.from('Hello NATS!');
//   nc.publish('demo.subject', payload);

//   // Close the connection
//   // nc.close();
// }

// publishAndSubscribe().catch((err) => {
//   console.error('Error:', err);
// });
