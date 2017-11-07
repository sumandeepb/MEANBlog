/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

angular.module('index').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'js/views/index.client.view.html'
        }).otherwise({
            redirectTo: '/'
        });
    }
]);
