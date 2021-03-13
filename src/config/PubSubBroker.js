const redis = require("redis");
const subscriber = redis.createClient({ url: process.env.REDIS_URL });
const publisher = subscriber.duplicate();

module.exports = {
    subscriber, publisher
}