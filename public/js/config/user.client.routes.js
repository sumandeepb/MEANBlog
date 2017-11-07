/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

angular.module('user').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/user/list', {
            templateUrl: 'js/views/user-list.client.view.html'
        });
    }
]);
