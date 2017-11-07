/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

var config = require('./config'),
        express = require('express'),
        bodyParser = require('body-parser'),
        passport = require('passport'),
        flash = require('connect-flash'),
        session = require('express-session'),
        multipart = require('connect-multiparty');

module.exports = function () {
    var app = express();

    app.use(express.static('./public'));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'OurSuperSecretCookieSecret'
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(multipart({
            uploadDir: config.uploadPath
    }));

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/user.server.routes.js')(app);

    return app;
};

