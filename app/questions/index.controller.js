(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

<<<<<<< HEAD
    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.add = addQuestion;
        vm.remove = removeQuestion; 
        vm.update = updateQuestion;

=======
    function Controller($window, QuestionService, FlashService) {
        var vm = this;

        vm.question = null;
        vm.saveQuestion = saveQuestion;
        vm.deleteQuestion = deleteQuestion;
>>>>>>> 56bf03d62f532fa312bf882ce49b8a6f471a4635

        initController();

        function initController() {
<<<<<<< HEAD
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }


        function addQuestion()
        {
            updateQuestion(true);
            document.getElementById("newQuestion").value = "";
        }

        function removeQuestion(id)
        {
            document.getElementById(id).value = "";
            updateQuestion(false);
        }

        function updateQuestion(updateOrDelete)
        {
            var count = 1;
            var questions = [];
            var qList = document.getElementsByClassName("questionTextBox");
            for(var q of qList)
            {
                if(q.value && q.value != "")
                {
                    if(q.id == "newQuestion" && updateOrDelete)
                    {
                        var questionToSave = {
                            id: count,
                            value: q.value
                        };
                        questions.push(questionToSave);
                        count++;
                    }
                    else
                    {
                        var questionToDelete = {
                            id: count,
                            value: q.value
                        };
                        questions.push(questionToDelete);
                        count++;
                    }
                }        
            }
            vm.user.questions = questions;
            saveQuestion();
        }

        function saveQuestion()
        {
            UserService.Update(vm.user)
                .then(function () {
                    //FlashService.Success('User updated');
=======
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
>>>>>>> 56bf03d62f532fa312bf882ce49b8a6f471a4635
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }
<<<<<<< HEAD
=======

>>>>>>> 56bf03d62f532fa312bf882ce49b8a6f471a4635
})();