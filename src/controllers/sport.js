const Sport = require('../models/sport');
const helper = require("../lib/helper");

const getAllSportsToursAndMatches = async () => {
    const matches = await Sport.getAllSportsToursAndMatches();
    const res = {};
    matches.forEach(match => {
        const { sportName, tourName, matchName, matchId, startTime, format } = match;
        if (!res[sportName]) {
            res[sportName] = {};
        }
        if (!res[sportName][tourName]) {
            res[sportName][tourName] = [];
        }
        const formattedStartTime = helper.getDateFormat(startTime);
        res[sportName][tourName].push({matchId, matchName, startTime : formattedStartTime, format});
    });
    return res;
}

module.exports = {
    getAllSportsToursAndMatches: getAllSportsToursAndMatches
}