const { connect } = require('nats')

async function run() {
  // Connect to the first NATS server
  const nc1 = await connect({ servers: ['localhost:4222'] });

  // Subscribe to a subject on the first server
  nc1.subscribe('subject1', (msg) => {
    console.log(`Received message on subject1: ${msg.data}`);
  });

  // Connect to the second NATS server
  const nc2 = await connect({ servers: ['localhost:4222'] });

  // Publish a message to a subject on the second server
  const payload = Buffer.from('Hello from server2!');
  nc2.publish('subject2', payload);

  // Subscribe to a subject on the second server
  nc2.subscribe('subject2', (msg) => {
    console.log(`Received message on subject2: ${msg.data}`);
  });

  // Publish a message to a subject on the first server
  const payload2 = Buffer.from('Hello from server1!');

  nc1.publish('subject1', payload2);

  // Close the connections
  nc1.close();
  nc2.close();
}

run().catch((err) => {
  console.error('Error:', err);
});
