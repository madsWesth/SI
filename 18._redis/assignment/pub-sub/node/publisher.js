import { createClient } from "redis";

const r = createClient();

await r.connect();

await r.publish("myEvents", "testEvent");

r.disconnect();
