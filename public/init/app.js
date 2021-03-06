/**
 * Created by Administrator on 16-8-17.
 */
var app=angular.module("shelleyApp",['ui.router']);
app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('default');
    $urlRouterProvider.when('','default');
    $urlRouterProvider.when('/','default');
    $stateProvider
        .state('default',{
            url:'/default',
            templateUrl:"./public/views/default.html"
        })
        .state('example',{
            url:'/example',
            templateUrl:'./public/views/example.html'
        })
        .state('introduce',{
            url:'/introduce',
            templateUrl:'./public/views/introduce.html'
        })
        .state('contect',{
            url:'/contect',
            templateUrl:'./public/views/contect.html',
            contorller:'ContectCtrl'
        });
});
//body controller shelleyAppController
app.controller('shelleyAppController',function($scope){
    $scope.title="shelleyframe";
    $scope.listData=[
        {name:"listitem1",icon:"icon-list",arrow:'icon-angle-right',second:[
            {name:'second-1'},
            {name:'second-2'},
            {name:'second-3'}
        ]},
        {name:"listitem2",icon:"icon-info-sign",arrow:'icon-angle-right',second:[
            {name:'second-1'},
            {name:'second-2'},
            {name:'second-3'}
        ]},
        {name:"listitem3",icon:"icon-info-sign",arrow:'icon-angle-right',second:[
            {name:'second-1'},
            {name:'second-2'},
            {name:'second-3'}
        ]},
        {name:"listitem4",icon:"icon-info-sign",arrow:'icon-angle-right',second:[
            {name:'second-1'},
            {name:'second-2'},
            {name:'second-3'}
        ]}
    ];
    /*$scope.listData=[
        {name:"listitem1",icon:"icon-list",arrow:'icon-angle-right'},
        {name:"listitem2",icon:"icon-info-sign",arrow:'icon-angle-right'},
        {name:"listitem3",icon:"icon-info-sign",arrow:'icon-angle-right'},
        {name:"listitem4",icon:"icon-info-sign",arrow:'icon-angle-right'}
    ];*/
    /*$scope.listData=[
     {name:"listitem1"},
     {name:"listitem2"},
     {name:"listitem3"},
     {name:"listitem4"}
     ];*/
    /*$scope.listData=[
     {name:"listitem1",icon:"icon-list"},
     {name:"listitem2",icon:"icon-info-sign"},
     {name:"listitem3",icon:"icon-info-sign"},
     {name:"listitem4",icon:"icon-info-sign"}
     ];*/
    console.log($scope);
});