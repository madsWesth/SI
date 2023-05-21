import { createClient } from "redis";

const r = createClient();

await r.connect();

await r.subscribe("myEvents", (msg, channel) => {
  console.log(`From channel ${channel} \n msg: ${msg}`);
});
