const News = require('../models/news');

const createNews = async (payload) => {
    const { title, description, matchId, tourId, sportId } = payload;
    if (!title || !description || (!matchId && !tourId && !sportId)) {
         throw new Error('Missing required parameter: title, description');
    }
    await News.create(payload);
    return {message: 'News created successfully'};
}

const getNewsByMatchId = async (matchId) => {
    if (!matchId) {
         throw new Error('Missing required parameter: match id');
    }
    const news = await News.getNewsByMatchId(Number(matchId));
    return news;
}

const getNewsByTourId = async (tourId) => {
    if (!tourId) {
         throw new Error('Missing required parameter: tour id');
    }
    const news = await News.getNewsByTourId(Number(tourId));
    return news;
}

const getNewsBySportId = async (sportId) => {
    if (!sportId) {
         throw new Error('Missing required parameter: sport id');
    }
    const news = await News.getNewsBySportId(Number(sportId));
    return news;
}


module.exports = {
    createNews: createNews,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId:getNewsByTourId,
    getNewsBySportId : getNewsBySportId
}