const stan = require('node-nats-streaming');

const clusterID = 'test-cluster';
const clientID = 'test-client1';
const serverURL = 'nats://localhost:6100 '; // Update with the appropriate server URL

async function st() {
  const sc = await stan.connect(clusterID, clientID, { url: serverURL }, { connectTimeout: 5000});
  sc.on('connect', () => {
    console.log('Connected to NATS Streaming Server')
  
    const publishSubject = 'demo.subject'
    const message = Buffer.from('Hello NATS Streaming!');
  
    sc.publish(publishSubject, message, (err, guid, ) => {
      if (err) {
        console.error('Error publishing message:', err)
      } else {
        console.log(`Published message with GUID: ${guid}`)
        console.log(data);
      }
      // sc.close()
    })
  })
  
  sc.on('error', (err) => {
    console.error('Error connecting to NATS Streaming Server:', err)
  })
}
st()
