(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller($window, QuestionService, FlashService) {
        var vm = this;

        vm.question = null;
        vm.saveQuestion = saveQuestion;
        vm.deleteQuestion = deleteQuestion;

        initController();

        function initController() {
            // get current Question
            QuestionService.GetCurrent().then(function (Question) {
                vm.Question = Question;
            });
        }

        function saveQuestion() {
            let questionToBeSaved = {
                question: vm.question
            }
            QuestionService.Create(questionToBeSaved)
                .then(function () {
                    FlashService.Success('Question updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteQuestion() {
            QuestionService.Delete(vm.Question._id)
                .then(function () {
                    // log Question out
                    $window.location = '/app';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();