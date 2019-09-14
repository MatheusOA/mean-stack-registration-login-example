(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetById = GetById;
        //service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/questions/current').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/questions/' + _id).then(handleSuccess, handleError);
        }


        function Create(question) {
            debugger;
            return $http.post('/api/questions/create', question).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/questions/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
