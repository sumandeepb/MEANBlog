/* 
 * MEAN Blog Template
 * Copyright (c) 2017 Sumandeep Banerjee
 * MIT License
 */

angular.module('user').controller('UserController', ['$scope', '$routeParams', '$location', 'Authentication', 'UserAPI',
    function ($scope, $routeParams, $location, Authentication, UserAPI) {
        $scope.authentication = Authentication;

        $scope.find = function () {
            console.log("in user.client.controller::find");
            $scope.users = UserAPI.query();
        };

        $scope.findOne = function () {
            console.log("in user.client.controller::findOne");
            $scope.user = UserAPI.get({
                userId: $routeParams.userId
            });
        };

        $scope.update = function (user, approved) {
            console.log("in user.client.controller::update");
            if (user) {
                user.approvedReq = approved;
                user.$update(function () {
                    user.approved = approved;
                    $location.path('user/list');
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            } else {
                $scope.user.$update(function () {
                    $location.path('user/list');
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }
        };

        $scope.delete = function (user) {
            console.log("in user.client.controller::delete");
            if (user) {
                user.$remove(function () {
                    for (var i in $scope.users) {
                        if ($scope.users[i] === user) {
                            $scope.users.splice(i, 1);
                        }
                    }
                    $location.path('user/list');
                });
            } else {
                $scope.user.$remove(function () {
                    $location.path('user/list');
                });
            }
        };
    }
]);
