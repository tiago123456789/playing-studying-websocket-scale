const cacheConfig = require("../config/Cache");

class Cache {

    exists(key) {
        return new Promise((resolve, reject) => {
            cacheConfig.exists(key, function (err, reply) {
                if (reply === 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        })
    }

    get(key) {
        return new Promise((resolve, reject) => {
            cacheConfig.get(key, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(JSON.parse(data));
            });
        })
    }

    set(key, value) {
        return new Promise((resolve, reject) => {
            cacheConfig.set(key, JSON.stringify(value), function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        })
    }
}

const cache = new Cache();
module.exports = cache;