/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

angular.module('index').controller('IndexController', ['$scope', 'Authentication',
    function ($scope, Authentication) {
        $scope.authentication = Authentication;
    }
]);
