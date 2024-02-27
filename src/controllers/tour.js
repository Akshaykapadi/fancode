const Tour = require('../models/tour');
const cache = require("../lib/caching");

const getAllTours = async () => {
    return await Tour.getAllTours();
}

const getMatchesByTourName = async params => {
    const { name, page="0" } = params;

    if (!name) {
        throw new Error('Missing required parameter: name');
    }

    const redisKey = `matches:${name}:${page}`;
    const cachedMatches = await cache.getFromCache(redisKey);
    if (cachedMatches) {
        return cachedMatches;
    }

    const matches = await Tour.getMatchesByTourName(params);
    cache.setInCache(redisKey, matches);

    return matches;
}

const getTourMatchesCount = async params => {
    const { name } = params;

    if (!name) {
        throw new Error('Missing required parameter: name');
    }

    const totalMatchCount = await Tour.getMatchesCountByTourName(params);
    return totalMatchCount?.[0]?.totalMatches || 0;
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName,
    getTourMatchesCount : getTourMatchesCount
}