/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

var serverip = 'localhost';
var port = 3000;

module.exports = {
    port: port,
    db: 'mongodb://' + serverip + '/mean-blog',
    clientPath: 'public/data'
};
