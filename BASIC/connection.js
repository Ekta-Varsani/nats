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

// async function publishAndSubscribe() {
//   // Connect to NATS server
//   const nc = await connect({ url: 'nats://localhost:4222' })
//   console.log(`Connected to ${nc.getServer()}`);

//   nc.close();
// }

// publishAndSubscribe().catch((err) => {
//   console.error('Error:', err);
// });