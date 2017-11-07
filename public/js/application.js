/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

var appName = 'mean-blog';
var app = angular.module(appName, ['ngResource', 'ngRoute', 'index', 'user']);

app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

if (window.location.hash === '#_=_')
    window.location.hash = '#!';

angular.element(document).ready(function () {
    angular.bootstrap(document, [appName]);
});
