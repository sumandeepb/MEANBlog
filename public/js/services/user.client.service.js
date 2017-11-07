/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

angular.module('user').factory('Authentication', [
    function () {
        this.user = window.user;
        return {
            user: this.user
        };
    }
]);

angular.module('user').factory('UserAPI', ['$resource',
    function ($resource) {
        return $resource('api/user/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
