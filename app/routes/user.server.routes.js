/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

module.exports = function (app) {
    var user = require('../../app/controllers/user.server.controller'),
            passport = require('passport');

    app.route('/api/user')
            .post(user.create)
            .get(user.requiresLogin, user.requiresAdmin, user.list);

    app.route('/api/user/:userId')
            .get(user.read)
            .put(user.requiresLogin, user.requiresAdmin, user.update)
            .delete(user.requiresLogin, user.requiresAdmin, user.delete);

    app.param('userId', user.userByID);

    app.route('/register')
            .get(user.renderRegister)
            .post(user.register);

    app.route('/login')
            .get(user.renderLogin)
            .post(passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true
            }));

    app.get('/logout', user.logout);
};
