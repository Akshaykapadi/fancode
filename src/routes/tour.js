const Tour = require('../controllers/tour');

module.exports = function(app) {
    app.route('/tours').get(async (req, res, next) => {
        try {
            return res.json(await Tour.getAllTours());
        } catch (err) {
            return next(err);
        }
    });
    // task 1

    app.route('/tour/matches').get(async (req, res, next) => {
        try {
           
            // implemented caching to increase the performance
            // paginated the result
            // db col index is already there
            // In future if request are high then we can implement horizontal scaling

            let params = req.query;
            const prom = [
                Tour.getMatchesByTourName(params),
                Tour.getTourMatchesCount(params)
            ];
            const [matchResult, tourMatchesCount] = await Promise.all(prom);
            return res.json({matches: matchResult, meta: {page : Number(params.page), total: tourMatchesCount, per_page : 10}});
        } catch (err) {
            return next(err);
        }
    });
}