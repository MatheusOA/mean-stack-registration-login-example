(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.add = addQuestion;
        vm.remove = removeQuestion; 
        vm.update = updateQuestion;


        initController();

        function initController() {
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
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }
})();