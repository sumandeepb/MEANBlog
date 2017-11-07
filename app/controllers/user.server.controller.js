/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

var User = require('mongoose').model('User'),
        passport = require('passport');

var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};

exports.renderLogin = function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Log-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderRegister = function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.register = function (req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function (err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/register');
            }

            req.login(user, function (err) {
                if (err)
                    return next(err);

                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.requiresLogin = function (req, res, next) {
    console.log("user.server.controller::requiresLogin");
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    } else if (req.user.approved === false) {
        return res.status(401).send({
            message: 'User approval is pending'
        });
    }

    next();
};

exports.requiresAdmin = function (req, res, next) {
    console.log("user.server.controller::requiresAdmin");
    if (!(req.user.permission === 'admin')) {
        return res.status(401).send({
            message: 'User is not an admin'
        });
    }
    next();
};

exports.create = function (req, res, next) {
    console.log("in user.server.controller::create");
    var auser = new User(req.body);
    auser.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(auser);
        }
    });
};

exports.list = function (req, res, next) {
    console.log("in user.server.controller::list");
    User.find({}, function (err, ausers) {
        if (err) {
            return next(err);
        } else {
            res.json(ausers);
        }
    });
};

exports.read = function (req, res, next) {
    console.log("in user.server.controller::read");
    res.json(req.auser);
};

exports.userByID = function (req, res, next, id) {
    console.log("in user.server.controller::userByID");
    User.findOne(
            {
                _id: id
            },
            function (err, auser) {
                if (err) {
                    return next(err);
                } else {
                    req.auser = auser;
                    next();
                }
            }
    );
};

exports.update = function (req, res, next) {
    console.log("in user.server.controller::update");
    req.body.approved = req.body.approvedReq;
    User.findByIdAndUpdate(req.auser.id, req.body,
            function (err, auser) {
                if (err) {
                    return next(err);
                } else {
                    res.json(auser);
                }
            }
    );
};

exports.delete = function (req, res, next) {
    console.log("in user.server.controller::delete");
    req.auser.remove(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.auser);
        }
    });
};
