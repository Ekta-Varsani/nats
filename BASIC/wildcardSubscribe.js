const { connect, StringCodec } = require("nats");

connect({ servers: "localhost:4222" })
  .then(async (nc) => {
    console.log("Connected to NATS server");
    
    const sc = StringCodec();

    const s1 = nc.subscribe("help.*.system");
    (async () => {
      for await (const msg of s1) {
        console.log(`Received message for ${s1.getSubject()}: ${msg.data}`);
        
      }
    })().catch((err) => {
      console.error("Error:", err);
    });

    
    const s3 = nc.subscribe("help.info.system");
    (async () => {
      for await (const msg of s3) {
        console.log(`Received message for s3 ${s3.getSubject()}: ${msg.data}`);
        
      }
    })().catch((err) => {
      console.error("Error:", err);
    });

    // Full token wildcard subscription
    const s2 = nc.subscribe("help.>");
    (async () => {
      for await (const msg of s2) {
        console.log(`Received message for ${s2.getSubject()}: ${msg.data}`);
      }
    })().catch((err) => {
      console.error("Error:", err);
    });

  })
  .catch((err) => {
    console.error("Failed to connect to NATS server:", err);
  });
