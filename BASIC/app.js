// const { connect } = require('nats');
// // Connect to NATS server
// const nc = connect({
//   url: 'nats://0.0.0.0:6100',
// });

// async function start () {
//   // Callback executed when connected successfully
//   await nc.on('connect', () => {
//     console.log('Connected to NATS server.');
  
//     // Subscribe to a subject
//     const subscription = nc.subscribe('my-subject');
    
//     // Callback executed when a message is received
//     subscription.on('message', (msg) => {
//       console.log('Received message:', msg.data);
//     });
  
//     // Publish a message to the subject
//     nc.publish('my-subject', 'Hello, NATS!');
//   });
// }
// start()
// // Callback executed if an error occurs
// nc.on('error', (err) => {
//   console.log('Error:', err);
// });

// // Callback executed when disconnected from the server
// nc.on('close', () => {
//   console.log('Disconnected from NATS server.');
// });

//-------------------------------

const { connect } = require('nats');

async function getServerVersion() {
  const nc = await connect();

  const options = {
    timeout: 5000, // Increase the timeout to 5 seconds (adjust as needed)
  };

  const response = await nc.request('INFO', undefined, options);
  const serverInfo = JSON.parse(response.data);

  console.log('Server version:', serverInfo.server_version);

  nc.close();
}

getServerVersion().catch((err) => {
  console.error('Error:', err);
});







