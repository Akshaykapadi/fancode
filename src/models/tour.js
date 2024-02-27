const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async params => {
    const limit = 10;
    const offset = limit * Number(params.page)
    const statement = `select 
            m.name, 
            m.status, 
            m.format, 
            m.startTime,
            m.endTime,
            m.id as matchId,
            t.name as tour_name,
            t.id as tourId 
        from matches as m 
        left join tours as t on m.tourId = t.id 
        where t.name = ? 
        LIMIT ?
        OFFSET ?`;
    const parameters = [ params.name , limit, offset];
    return await mysql.query(statement, parameters);
}

const getMatchesCountByTourName = async params => {
    const statement = `select count(*) as totalMatches
        from matches as m 
        left join tours as t on m.tourId = t.id 
        where t.name = ? `;
    const parameters = [ params.name];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName,
    getMatchesCountByTourName:getMatchesCountByTourName
}