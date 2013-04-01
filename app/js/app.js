'use strict';


// Declare app level module which depends on filters, and services
angular.module('laputin', ['laputin.filters', 'laputin.services', 'laputin.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/files.html', controller: FilesCtrl});
    $routeProvider.when('/files/:fileId', {templateUrl: 'partials/single_file.html', controller: SingleFileCtrl});
    $routeProvider.when('/tags/', {templateUrl: 'partials/tags.html', controller: TagsCtrl});
    $routeProvider.when('/tags/:tagId', {templateUrl: 'partials/single_tag.html', controller: SingleTagCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
