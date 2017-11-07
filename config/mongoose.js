/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

var config = require('./config'),
        mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);

    require('../app/models/user.server.model');

    return db;
};
