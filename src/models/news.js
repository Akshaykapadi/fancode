const mysql = require('../lib/mysql');

const create = async (payload) => {
    const statement = 'insert into news(title, description, match_id, tour_id, sport_id) VALUES (?,?,?,?,?)';
    const parameters = [payload?.title, payload?.description, payload?.matchId || null, payload?.tourId || null, payload?.sportId || null]
    return await mysql.query(statement, parameters);
}

const getNewsByMatchId = async (matchId) => {
    const statement = 'select id as newsId, title, description, createdAt from news WHERE match_id = ?';
    const parameters = [matchId]
    return await mysql.query(statement, parameters);
}

const getNewsByTourId = async (tourId) => {
    const statement = 'select id as newsId, title, description, createdAt from news WHERE tour_id = ?';
    const parameters = [tourId]
    return await mysql.query(statement, parameters);
}

const getNewsBySportId = async (sportId) => {
    const statement = 'select id as newsId, title, description, createdAt from news WHERE sport_id = ?';
    const parameters = [sportId]
    return await mysql.query(statement, parameters);
}

module.exports = {
    create: create,
    getNewsByMatchId: getNewsByMatchId,
    getNewsBySportId: getNewsBySportId,
    getNewsByTourId : getNewsByTourId
}