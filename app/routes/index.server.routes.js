/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

module.exports = function (app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
};
