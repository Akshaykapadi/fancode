const Redis = require('ioredis');

// Create Redis client
const redis = new Redis({
    host: 'redis://redis'
  });

// Cache expiration time in seconds (e.g., 1 hour)
const CACHE_EXPIRATION_TIME = 1800;

// Function to get data from cache
const getFromCache = async (key) => {
    try {
        const data = await redis.get(key);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error fetching data from cache:', error);
        return null;
    }
};

// Function to set data in cache
const setInCache = async (key, data) => {
    try {
        const jsonData = JSON.stringify(data);
        await redis.set(key, jsonData, 'EX', CACHE_EXPIRATION_TIME);
        console.log('Data cached successfully');
    } catch (error) {
        console.error('Error caching data:', error);
    }
};

module.exports = { getFromCache, setInCache };
