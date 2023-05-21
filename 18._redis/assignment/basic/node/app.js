import { createClient } from "redis";

const client = createClient();
await client.connect();

await client.set("basic:myKey", "myValue");

console.log(`GET ${await client.get("basic:myKey")}`);

await client.del("basic:myKey");

await client.hSet("basic:hash", "myField", "myValue");
await client.hSet("basic:hash", "myField2", "myValue2");

console.log("HGET field", await client.hGet("basic:hash", "myField"));

const hGetAllResult = await client.hGetAll("basic:hash");
console.log("HGETALL", hGetAllResult);

await client.hDel("basic:hash", "myField");

console.log("after HDEL field");
console.log("HGETALL", await client.hGetAll("basic:hash"));

await client.del("basic:hash");

await client.disconnect();
