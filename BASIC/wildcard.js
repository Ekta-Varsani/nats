// // import { connect, StringCodec } from "nats";
// const { connect } = require('nats')
// const { StringCodec } = require('nats')
// let nc
// async function fun1 () {
//      nc = await connect({ servers: "demo.nats.io:4222" });
//      const sc = StringCodec();
     
//      // subscriptions can have wildcard subjects
//      // the '*' matches any string in the specified token position
//      const s1 = nc.subscribe("help.*.system");
//      const s2 = nc.subscribe("help.me.*");
//      // the '>' matches any tokens in that position or following
//      // '>' can only be specified at the end of the subject
//      const s3 = nc.subscribe("help.>");
     
//      async function printMsgs(s) {
//        let subj = s.getSubject();
//        console.log(`listening for ${subj}`);
//        const c = (13 - subj.length);
//        const pad = "".padEnd(c);
//        for await (const m of s) {
//          console.log(
//            `[${subj}]${pad} #${s.getProcessed()} - ${m.subject} ${
//              m.data ? " " + sc.decode(m.data) : ""
//            }`,
//          );
//        }
//      }
     
//      printMsgs(s1);
//      printMsgs(s2);
//      printMsgs(s3);
     
//      // don't exit until the client closes
//      // await nc.closed();
// }
// fun1()

const { connect } = require('nats');
const { StringCodec } = require('nats');

async function fun1() {
  const nc = await connect({ servers: 'demo.nats.io:4222' });
  const sc = StringCodec();

  const s1 = nc.subscribe('help.*.system');
  const s2 = nc.subscribe('help.me.*');
  const s3 = nc.subscribe('help.>');

  async function printMsgs(subscription) {
    for await (const m of subscription) {
      console.log(`[${m.subject}] #${subscription.getProcessed()} - ${m.subject} ${m.data ? sc.decode(m.data) : ''}`);
    }
  }

  printMsgs(s1);
  printMsgs(s2);
  printMsgs(s3);
}

fun1().catch((err) => {
  console.error('Error:', err);
});
