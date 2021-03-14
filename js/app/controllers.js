angular.module('meuModulo')
.controller('indexController', function($scope) {
    $scope.titulo = 'Sistema com AngularJS';
    $scope.alunos = [
        {id: 1, nome: 'Camila', email: 'camila@mail.com', nota1: 65, nota2: 80, nota3: 55},
        {id: 2, nome: 'Pedro', email: 'pedro@mail.com', nota1: 75, nota2: 85, nota3: 100},
        {id: 3, nome: 'Murilo', email: 'murilo@mail.com', nota1: 10, nota2: 20, nota3: 70},
        {id: 4, nome: 'João', email: 'joao@mail.com', nota1: 50, nota2: 55, nota3: 60},
        {id: 5, nome: 'Ana', email: 'ana@mail.com', nota1: 75, nota2: 15, nota3: 95},
    ];
    $scope.editando = false;
    
    var init = function() {
        $scope.alunos.forEach(function(aluno) {
            aluno.media = calcularMedia(aluno);
        });
        limparForm();
    }

    var calcularMedia = function(aluno) {
        var nota1 = aluno.nota1 ? parseInt(aluno.nota1) : 0;
        var nota2 = aluno.nota2 ? parseInt(aluno.nota2) : 0;
        var nota3 = aluno.nota3 ? parseInt(aluno.nota3) : 0;
        return ((nota1 + nota2 + nota3) / 3).toFixed(2);
    }

    $scope.abrirModalAdicao = function() {
        $scope.editando = false;
        limparForm();
        getModal().open();
    }

    $scope.adicionar = function() {
        $scope.aluno.id = $scope.alunos.length + 1;
        $scope.aluno.media = calcularMedia($scope.aluno);
        $scope.alunos.push($scope.aluno);
        limparForm();
        getModal().close();
    }

    $scope.abrirModalEdicao = function(aluno) {
        $scope.editando = true;
        //$scope.aluno = aluno;
        $scope.aluno = angular.copy(aluno);
        getModal().open();
    }

    $scope.salvar = function() {
        var idAluno = parseInt($scope.aluno.id);
        var idx = $scope.alunos.findIndex(a => parseInt(a.id) === idAluno);
        if (idx >= 0) {
            $scope.aluno.media = calcularMedia($scope.aluno);
            $scope.alunos[idx] = $scope.aluno;
        } 
        getModal().close();
    }

    $scope.excluir = function(id) {
        var idx = $scope.alunos.findIndex(a => a.id === id);
        if (idx >= 0) {
            $scope.alunos.splice(idx, 1);
        }
    }

    var getModal = function() {
        var modal = $('.modal').modal();
        return M.Modal.getInstance(modal);
    }

    var limparForm = function() {
        $scope.aluno = {};
    }

    init();
});