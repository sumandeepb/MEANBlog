/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

exports.render = function (req, res) {
    res.render('index', {
        title: 'MEAN Blog Template',
        user: JSON.stringify(req.user)
    });
};
