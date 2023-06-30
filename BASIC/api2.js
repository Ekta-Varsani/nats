const express = require('express');
const { connect, StringCodec } = require('nats');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const sc = StringCodec();

// Connect to NATS server
connect({ servers: 'localhost:4222' })
    .then(async (nc) => {
        console.log('Connected to NATS server');
        
        const subscription = nc.subscribe('api.events');
        (async function () {
            for await (const m of subscription) {
                const data = sc.decode(m.data);
                console.log('Received message:', data);
            }
        })().catch((err) => {
            console.error('Error handling NATS subscription:', err);
        });

        // API endpoint
        app.post('/api/event', (req, res) => {
            const eventData = req.body;
            nc.publish('api.events', sc.encode(JSON.stringify(eventData)));
            res.status(200).json({ message: 'Event published successfully' });
        });

        const port = 3000;
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to NATS server:', err);
    });
