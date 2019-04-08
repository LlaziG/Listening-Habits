const { logger } = require('../startup/logger');

function error(err, req, res, next) {
    logger.error(err.message, err);

    res.status(500).send('Something Failed.');
}
module.exports = error;