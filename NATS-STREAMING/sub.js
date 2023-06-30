const stan = require('node-nats-streaming');

// Connect to NATS streaming server
const clusterID = 'test-cluster';
const clientID = 'test-client';
const serverURL = 'nats://localhost:6100 '; // Update with the appropriate server URL

async function st() {
  const sc = await stan.connect(clusterID, clientID, { url: serverURL });
  sc.on('connect', () => {
    console.log('Connected to NATS Streaming Server')
  
    const subscribeSubject = 'demo.subject'
  
    const subscription = sc.subscribe(subscribeSubject)
    subscription.on('message', (msg) => {
      const sequence = msg.getSequence()
      const message = msg.getData()
  
      console.log(`Received message [${sequence}]: ${message}`)
  
      // Perform any necessary processing or actions
  
      // msg.ack({success: true})
      console.log('subscribed');
    })
  })
  
  sc.on('error', (err) => {
    console.error('Error connecting to NATS Streaming Server:', err)
  })
}
st()
