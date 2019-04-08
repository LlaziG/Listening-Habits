const { logger, writeLog } = require('./startup/logger');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

writeLog();
require('./startup/routes')(app);


app.listen(port, () => {
	logger.info(`Listening on Port ${port}...`);

});