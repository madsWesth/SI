import redis from "redis";

const redisClient = redis.createClient();

redisClient.on("error", (err) => {
    console.log("Error " + err);
}
);

redisClient.on("connect", () => {
    console.log("Redis is ready");
}
);

redisClient.connect();

await redisClient.set("foo", "bar");

const value = await redisClient.get("foo");

console.log(value);
