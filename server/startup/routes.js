const express = require('express');
const { authorization } = require('../routes/index');
const { error } = require('../middleware/index');
const cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use('/api/auth', authorization);
    
    app.use(error);
}