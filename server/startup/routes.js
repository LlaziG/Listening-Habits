const express = require('express');
const { user, track, search, playlist } = require('../routes/index');
const { error } = require('../middleware/index');
const cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use('/api/user', user);
    app.use('/api/track', track);
    app.use('/api/search', search);
    app.use('/api/playlist', playlist);

    app.use(error);
}