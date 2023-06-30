const stan = require('node-nats-streaming');

// Connect to NATS streaming server
const clusterID = 'test-cluster';
const clientID = 'test-client';
const serverURL = 'nats://localhost:6100'; // Update with the appropriate server URL

async function st() {
  const sc = await stan.connect(clusterID, clientID, { url: serverURL });
  // sc.then((result) => console.log(result)).catch((error) => console.log(error))
  // Handle connection events
  sc.on('connect', () => {
    console.log('Connected to NATS streaming server');
  
    // Perform publish-subscribe operations or other actions here
  });
  
  sc.on('error', (err) => {
    console.error('NATS error:', err);
  });
  
  sc.on('close', () => {
    console.log('Connection to NATS streaming server closed');
  });

}
st()
