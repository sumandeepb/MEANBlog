/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

var mongoose = require('mongoose'),
        crypto = require('crypto'),
        Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String, trim: true, unique: true
    },
    email: String,
    permission: {
        type: String,
        enum: ['admin', 'editor', 'blogger'],
        default: 'blogger'
    },
    password: String,
    provider: String,
    providerId: String,
    providerData: {},
    approved: {
        type: Boolean,
        default: false
    }
});

UserSchema.pre('save',
        function (next) {
            if (this.password) {
                var md5 = crypto.createHash('md5');
                this.password = md5.update(this.password).digest('hex');
            }
            /*else {
             next(new Error('No can do, sir!'));
             }*/
            next();
        }
);

UserSchema.methods.authenticate = function (password) {
    var md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');

    return this.password === md5;
};

UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne(
            {username: possibleUsername},
            function (err, user) {
                if (!err) {
                    if (!user) {
                        callback(possibleUsername);
                    } else {
                        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                    }
                } else {
                    callback(null);
                }
            }
    );
};

mongoose.model('User', UserSchema);
