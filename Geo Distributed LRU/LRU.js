const redis = require('redis');
const redisClient = redis.createClient();

const defaultTTL = 1000 * 3600 * 12;
class LRUCache {
    constructor(capacity, ttl = defaultTTL) {
        this.capacity = capacity;
        this.cache = new Map();
        this.ttl = ttl;
        redisClient.connect();
    }

    get(key) {
        if (!this.cache.has(key)) {
            redisClient.get(key, (err, result) => {
                if (err || result === null) {
                    reject('Cache miss');
                }
                redisClient.expire(key, ttl, () => {
                    this.cache.set(key, value);
                    resolve(results);
                })
            });
        } else {
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        } 
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size === this.capacity) {
            this.cache.delete(this.cache.keys().next().value); // Remove the least recently used item
        }
        this.cache.set(key, value);
        redisClient.set(key, value);
        redisClient.expire(key, this.ttl/1000);
        setTimeout(() => this.cache.delete(key), this.ttl);
    }
}