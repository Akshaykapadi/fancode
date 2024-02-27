const News = require('../controllers/news');

module.exports = function(app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            return res.json(await News.createNews(req.body));
        } catch (err) {
            return next(err);
        }
    });
    // all the below endpoint can be clubbed together by accepting one more param type but need to add condition while query
    app.route('/news/:matchId/match').get(async (req, res, next) => {
        try {
            const {matchId} = req.params;
            return res.json(await News.getNewsByMatchId(matchId));
        } catch (err) {
            return next(err);
        }
    });

    app.route('/news/:tourId/tour').get(async (req, res, next) => {
        try {
            const {tourId} = req.params;
            return res.json(await News.getNewsByTourId(tourId));
        } catch (err) {
            return next(err);
        }
    });
    app.route('/news/:sportId/sport').get(async (req, res, next) => {
        try {
            const {sportId} = req.params;
            return res.json(await News.getNewsBySportId(sportId));
        } catch (err) {
            return next(err);
        }
    });
}