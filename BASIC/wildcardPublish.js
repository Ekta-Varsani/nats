const { connect, StringCodec } = require("nats");


connect({ servers: "localhost:4222" })
  .then(async (nc) => {
    console.log("Connected to NATS server");
    // const nc = await connect({ servers: 'demo.nats.io:4222' });

    const sc = StringCodec();

    // Publish messages to subjects
    nc.publish("help.info.system", sc.encode("Info message"));
    nc.publish("help.error.system", sc.encode("Error message"));
    nc.publish("help.analytics", sc.encode("Analytics message"));
    // const response = nc.ack()
    console.log(response);
    // Close the connection
    // nc.close();
  })
  .catch((err) => {
    console.error("Failed to connect to NATS server:", err);
  });

