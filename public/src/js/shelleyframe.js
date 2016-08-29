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
/**
 * Created by Administrator on 16-8-28.
 */
//contect controller
app.controller("ContectCtrl",function($scope){
    console.log($scope);
    /*var socket=io.connect("http://127.0.0.1:3002");
    socket.on('nameResult', function(result) {
        var message;
        if (result.success) {
            message = 'you are now known as ' + result.name + '.';
            console.log('message=', message);
            document.getElementById('guestname').innerHTML = message;
        } else {
            message = result.message;
        }
    });
    socket.on('joinResult', function(result) {
        document.getElementById('room').innerHTML = result.room;
    });
    $scope.sendMessage = function() {
        var message = {
            room: 'Lobby',
            text: document.getElementById('user_input').value
        };
        socket.emit('message', message);
    };

    socket.on('message', function(message) {
        var p = document.createElement('p');
        p.innerHTML = message.text;
        document.getElementById('message').appendChild(p);
    });*/

});
/**
 * Created by Administrator on 16-8-20.
 */
/**
 * navTop
 * */
app.directive('navTop',function(){
    return{ 
        restrict:'E',
        replace:true,
        scope:{
            title:'=navtopTitle',
            iconright:'=iconright'
        },
        template:'<nav class="flex-box navtop">'+
        '<div class="flex-item iconreback icon-angle-left" ng-click="returnback()"></div>'+
        '<div class="flex-item title">{{title}}</div>'+
        '<div class="flex-item iconright">{{iconright}}</div>'+
        '</nav>',
        link:function(scope,elem,attrs,controllerinstance){
            scope.returnback=function(){
                window.history.go(-1);
            };
        }
    };
});
//menubottom
app.directive('navBottom',function(){
    return{
        restrict:'EA',
        replace:true,
        scope:{},
        template:'<nav class="flex-box navbottom">'+
        '<div class="flex-item flex-box-ver" ui-sref="default">'+
        '<div class="icon-home flex-box"></div>'+
        '<p class="flex-box">首页</p>'+
        '</div>'+
        '<div class="flex-item flex-box-ver" ui-sref="example">'+
        '<div class="icon-list flex-box"></div>'+
        '<p class="flex-box">举例</p>'+
        '</div>'+
        '<div class="flex-item flex-box-ver" ui-sref="introduce">'+
        '<div class="icon-info-sign flex-box"></div>'+
        '<p class="flex-box">说明</p>'+
        '</div>'+
        '<div class="flex-item flex-box-ver" ui-sref="contect">'+
        '<div class="icon-comments flex-box"></div>'+
        '<p class="flex-box">联系</p>'+
        '</div>'+
        '</nav>',
        link:function(scope,elem,attrs,controllerinstance){
        }
    };
});
//list
app.directive('listView',function(){
    return{
        restrict:'E',
        replace:true,
        scope:{
            listData:'='
        },
        template:'<ul class="listview" ng-click="showNextLevel($event)">'+
                    '<li class="item" ng-repeat="listitem in listData track by $index">' +
                        '<div class="icon {{listitem.icon}}"></div>'+
                        '{{listitem.name}}'+
                        '<div class="arrow {{listitem.arrow}}"></div>'+
                        '<ul class="secondlevel">' +
                            '<li class="seconditem" ng-repeat="second in listitem.second track by $index">{{second.name}}</li>'+
                        '</ul>'+
                    '</li>'+
                '</ul>',
        link:function(scope,elem,attrs,controllerinstance){
            /**
             * judge which kind of listview to show
             * hasIcon means listview item has icon on left
             * hasArrow means listview item has arrow on right and will have child level
             * **/
            var hasIcon=false,hasArrow=false;
            angular.forEach(scope.listData,function(item,index){
                if(item.icon&&elem[0].className.indexOf('hasIcon')<0){
                    hasIcon=true;
                }
                if(item.arrow&&elem[0].className.indexOf('hasArrow')<0){
                    hasArrow=true;
                }
            });
            if(hasIcon){
                elem[0].className=elem[0].className+" hasIcon";
            }
            if(hasArrow){
                elem[0].className=elem[0].className+" hasArrow";
                scope.showNextLevel=function(e){
                    console.log(e.srcElement);//shijiandaili zhaodaochufashijianyuan
                    var oLi= e.srcElement,
                        oUlSecond= e.srcElement.querySelector('.secondlevel');
                    if(oUlSecond.className.indexOf('active')>0){
                        oUlSecond.className=oUlSecond.className.split(' active').join("");
                    }else{
                        var aLi=elem[0].getElementsByClassName('item'),len=aLi.length;
                        for(var i=0;i<len;i++){
                            var oSecUl=aLi[i].getElementsByTagName('ul')[0];
                            if(oSecUl.className.indexOf('active')>0){
                                oSecUl.className=oSecUl.className.split(' active').join("");
                            }
                        }
                        oUlSecond.className+=" active";
                    }
                }
            }
        }
    }
});
app.directive('chatRoom',function(){
    return {
        redirect:"E",
        scope:{},
        link:function(scope,elem,attrs,controllerinstance){
            var socket=io.connect("http://127.0.0.1:3002");
            socket.on('nameResult', function(result) {
                var message;
                if (result.success) {
                    message = 'you are now known as ' + result.name + '.';
                    console.log('message=', message);
                    document.getElementById('guestname').innerHTML = message;
                } else {
                    message = result.message;
                }
            });
            socket.on('joinResult', function(result) {
                document.getElementById('room').innerHTML = result.room;
            });
            scope.sendMessage = function() {
                var message = {
                    room: 'Lobby',
                    text: document.getElementById('user_input').value
                };
                socket.emit('message', message);
            };

            socket.on('message', function(message) {
                var p = document.createElement('p');
                p.innerHTML = message.text;
                document.getElementById('message').appendChild(p);
            });
        }
    };
});
/**
 * Created by Administrator on 16-8-11.
 */
console.log('util');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXIuanMiLCJkaXJlY3RpdmUuanMiLCJ1dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkpBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNoZWxsZXlmcmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFkbWluaXN0cmF0b3Igb24gMTYtOC0xNy5cclxuICovXHJcbnZhciBhcHA9YW5ndWxhci5tb2R1bGUoXCJzaGVsbGV5QXBwXCIsWyd1aS5yb3V0ZXInXSk7XHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJ2RlZmF1bHQnKTtcclxuICAgICR1cmxSb3V0ZXJQcm92aWRlci53aGVuKCcnLCdkZWZhdWx0Jyk7XHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIud2hlbignLycsJ2RlZmF1bHQnKTtcclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlKCdkZWZhdWx0Jyx7XHJcbiAgICAgICAgICAgIHVybDonL2RlZmF1bHQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDpcIi4vcHVibGljL3ZpZXdzL2RlZmF1bHQuaHRtbFwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2V4YW1wbGUnLHtcclxuICAgICAgICAgICAgdXJsOicvZXhhbXBsZScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOicuL3B1YmxpYy92aWV3cy9leGFtcGxlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2ludHJvZHVjZScse1xyXG4gICAgICAgICAgICB1cmw6Jy9pbnRyb2R1Y2UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDonLi9wdWJsaWMvdmlld3MvaW50cm9kdWNlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2NvbnRlY3QnLHtcclxuICAgICAgICAgICAgdXJsOicvY29udGVjdCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOicuL3B1YmxpYy92aWV3cy9jb250ZWN0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250b3JsbGVyOidDb250ZWN0Q3RybCdcclxuICAgICAgICB9KTtcclxufSk7XHJcbi8vYm9keSBjb250cm9sbGVyIHNoZWxsZXlBcHBDb250cm9sbGVyXHJcbmFwcC5jb250cm9sbGVyKCdzaGVsbGV5QXBwQ29udHJvbGxlcicsZnVuY3Rpb24oJHNjb3BlKXtcclxuICAgICRzY29wZS50aXRsZT1cInNoZWxsZXlmcmFtZVwiO1xyXG4gICAgJHNjb3BlLmxpc3REYXRhPVtcclxuICAgICAgICB7bmFtZTpcImxpc3RpdGVtMVwiLGljb246XCJpY29uLWxpc3RcIixhcnJvdzonaWNvbi1hbmdsZS1yaWdodCcsc2Vjb25kOltcclxuICAgICAgICAgICAge25hbWU6J3NlY29uZC0xJ30sXHJcbiAgICAgICAgICAgIHtuYW1lOidzZWNvbmQtMid9LFxyXG4gICAgICAgICAgICB7bmFtZTonc2Vjb25kLTMnfVxyXG4gICAgICAgIF19LFxyXG4gICAgICAgIHtuYW1lOlwibGlzdGl0ZW0yXCIsaWNvbjpcImljb24taW5mby1zaWduXCIsYXJyb3c6J2ljb24tYW5nbGUtcmlnaHQnLHNlY29uZDpbXHJcbiAgICAgICAgICAgIHtuYW1lOidzZWNvbmQtMSd9LFxyXG4gICAgICAgICAgICB7bmFtZTonc2Vjb25kLTInfSxcclxuICAgICAgICAgICAge25hbWU6J3NlY29uZC0zJ31cclxuICAgICAgICBdfSxcclxuICAgICAgICB7bmFtZTpcImxpc3RpdGVtM1wiLGljb246XCJpY29uLWluZm8tc2lnblwiLGFycm93OidpY29uLWFuZ2xlLXJpZ2h0JyxzZWNvbmQ6W1xyXG4gICAgICAgICAgICB7bmFtZTonc2Vjb25kLTEnfSxcclxuICAgICAgICAgICAge25hbWU6J3NlY29uZC0yJ30sXHJcbiAgICAgICAgICAgIHtuYW1lOidzZWNvbmQtMyd9XHJcbiAgICAgICAgXX0sXHJcbiAgICAgICAge25hbWU6XCJsaXN0aXRlbTRcIixpY29uOlwiaWNvbi1pbmZvLXNpZ25cIixhcnJvdzonaWNvbi1hbmdsZS1yaWdodCcsc2Vjb25kOltcclxuICAgICAgICAgICAge25hbWU6J3NlY29uZC0xJ30sXHJcbiAgICAgICAgICAgIHtuYW1lOidzZWNvbmQtMid9LFxyXG4gICAgICAgICAgICB7bmFtZTonc2Vjb25kLTMnfVxyXG4gICAgICAgIF19XHJcbiAgICBdO1xyXG4gICAgLyokc2NvcGUubGlzdERhdGE9W1xyXG4gICAgICAgIHtuYW1lOlwibGlzdGl0ZW0xXCIsaWNvbjpcImljb24tbGlzdFwiLGFycm93OidpY29uLWFuZ2xlLXJpZ2h0J30sXHJcbiAgICAgICAge25hbWU6XCJsaXN0aXRlbTJcIixpY29uOlwiaWNvbi1pbmZvLXNpZ25cIixhcnJvdzonaWNvbi1hbmdsZS1yaWdodCd9LFxyXG4gICAgICAgIHtuYW1lOlwibGlzdGl0ZW0zXCIsaWNvbjpcImljb24taW5mby1zaWduXCIsYXJyb3c6J2ljb24tYW5nbGUtcmlnaHQnfSxcclxuICAgICAgICB7bmFtZTpcImxpc3RpdGVtNFwiLGljb246XCJpY29uLWluZm8tc2lnblwiLGFycm93OidpY29uLWFuZ2xlLXJpZ2h0J31cclxuICAgIF07Ki9cclxuICAgIC8qJHNjb3BlLmxpc3REYXRhPVtcclxuICAgICB7bmFtZTpcImxpc3RpdGVtMVwifSxcclxuICAgICB7bmFtZTpcImxpc3RpdGVtMlwifSxcclxuICAgICB7bmFtZTpcImxpc3RpdGVtM1wifSxcclxuICAgICB7bmFtZTpcImxpc3RpdGVtNFwifVxyXG4gICAgIF07Ki9cclxuICAgIC8qJHNjb3BlLmxpc3REYXRhPVtcclxuICAgICB7bmFtZTpcImxpc3RpdGVtMVwiLGljb246XCJpY29uLWxpc3RcIn0sXHJcbiAgICAge25hbWU6XCJsaXN0aXRlbTJcIixpY29uOlwiaWNvbi1pbmZvLXNpZ25cIn0sXHJcbiAgICAge25hbWU6XCJsaXN0aXRlbTNcIixpY29uOlwiaWNvbi1pbmZvLXNpZ25cIn0sXHJcbiAgICAge25hbWU6XCJsaXN0aXRlbTRcIixpY29uOlwiaWNvbi1pbmZvLXNpZ25cIn1cclxuICAgICBdOyovXHJcbiAgICBjb25zb2xlLmxvZygkc2NvcGUpO1xyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBZG1pbmlzdHJhdG9yIG9uIDE2LTgtMjguXHJcbiAqL1xyXG4vL2NvbnRlY3QgY29udHJvbGxlclxyXG5hcHAuY29udHJvbGxlcihcIkNvbnRlY3RDdHJsXCIsZnVuY3Rpb24oJHNjb3BlKXtcclxuICAgIGNvbnNvbGUubG9nKCRzY29wZSk7XHJcbiAgICAvKnZhciBzb2NrZXQ9aW8uY29ubmVjdChcImh0dHA6Ly8xMjcuMC4wLjE6MzAwMlwiKTtcclxuICAgIHNvY2tldC5vbignbmFtZVJlc3VsdCcsIGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgIHZhciBtZXNzYWdlO1xyXG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICBtZXNzYWdlID0gJ3lvdSBhcmUgbm93IGtub3duIGFzICcgKyByZXN1bHQubmFtZSArICcuJztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21lc3NhZ2U9JywgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdndWVzdG5hbWUnKS5pbm5lckhUTUwgPSBtZXNzYWdlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXN1bHQubWVzc2FnZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHNvY2tldC5vbignam9pblJlc3VsdCcsIGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb29tJykuaW5uZXJIVE1MID0gcmVzdWx0LnJvb207XHJcbiAgICB9KTtcclxuICAgICRzY29wZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0ge1xyXG4gICAgICAgICAgICByb29tOiAnTG9iYnknLFxyXG4gICAgICAgICAgICB0ZXh0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcl9pbnB1dCcpLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzb2NrZXQuZW1pdCgnbWVzc2FnZScsIG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzb2NrZXQub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgICAgICAgdmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgcC5pbm5lckhUTUwgPSBtZXNzYWdlLnRleHQ7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UnKS5hcHBlbmRDaGlsZChwKTtcclxuICAgIH0pOyovXHJcblxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBZG1pbmlzdHJhdG9yIG9uIDE2LTgtMjAuXHJcbiAqL1xyXG4vKipcclxuICogbmF2VG9wXHJcbiAqICovXHJcbmFwcC5kaXJlY3RpdmUoJ25hdlRvcCcsZnVuY3Rpb24oKXtcclxuICAgIHJldHVybnsgXHJcbiAgICAgICAgcmVzdHJpY3Q6J0UnLFxyXG4gICAgICAgIHJlcGxhY2U6dHJ1ZSxcclxuICAgICAgICBzY29wZTp7XHJcbiAgICAgICAgICAgIHRpdGxlOic9bmF2dG9wVGl0bGUnLFxyXG4gICAgICAgICAgICBpY29ucmlnaHQ6Jz1pY29ucmlnaHQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZW1wbGF0ZTonPG5hdiBjbGFzcz1cImZsZXgtYm94IG5hdnRvcFwiPicrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gaWNvbnJlYmFjayBpY29uLWFuZ2xlLWxlZnRcIiBuZy1jbGljaz1cInJldHVybmJhY2soKVwiPjwvZGl2PicrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gdGl0bGVcIj57e3RpdGxlfX08L2Rpdj4nK1xyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGljb25yaWdodFwiPnt7aWNvbnJpZ2h0fX08L2Rpdj4nK1xyXG4gICAgICAgICc8L25hdj4nLFxyXG4gICAgICAgIGxpbms6ZnVuY3Rpb24oc2NvcGUsZWxlbSxhdHRycyxjb250cm9sbGVyaW5zdGFuY2Upe1xyXG4gICAgICAgICAgICBzY29wZS5yZXR1cm5iYWNrPWZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSk7XHJcbi8vbWVudWJvdHRvbVxyXG5hcHAuZGlyZWN0aXZlKCduYXZCb3R0b20nLGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgcmVzdHJpY3Q6J0VBJyxcclxuICAgICAgICByZXBsYWNlOnRydWUsXHJcbiAgICAgICAgc2NvcGU6e30sXHJcbiAgICAgICAgdGVtcGxhdGU6JzxuYXYgY2xhc3M9XCJmbGV4LWJveCBuYXZib3R0b21cIj4nK1xyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtYm94LXZlclwiIHVpLXNyZWY9XCJkZWZhdWx0XCI+JytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImljb24taG9tZSBmbGV4LWJveFwiPjwvZGl2PicrXHJcbiAgICAgICAgJzxwIGNsYXNzPVwiZmxleC1ib3hcIj7pppbpobU8L3A+JytcclxuICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImZsZXgtaXRlbSBmbGV4LWJveC12ZXJcIiB1aS1zcmVmPVwiZXhhbXBsZVwiPicrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJpY29uLWxpc3QgZmxleC1ib3hcIj48L2Rpdj4nK1xyXG4gICAgICAgICc8cCBjbGFzcz1cImZsZXgtYm94XCI+5Li+5L6LPC9wPicrXHJcbiAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gZmxleC1ib3gtdmVyXCIgdWktc3JlZj1cImludHJvZHVjZVwiPicrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJpY29uLWluZm8tc2lnbiBmbGV4LWJveFwiPjwvZGl2PicrXHJcbiAgICAgICAgJzxwIGNsYXNzPVwiZmxleC1ib3hcIj7or7TmmI48L3A+JytcclxuICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImZsZXgtaXRlbSBmbGV4LWJveC12ZXJcIiB1aS1zcmVmPVwiY29udGVjdFwiPicrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJpY29uLWNvbW1lbnRzIGZsZXgtYm94XCI+PC9kaXY+JytcclxuICAgICAgICAnPHAgY2xhc3M9XCJmbGV4LWJveFwiPuiBlOezuzwvcD4nK1xyXG4gICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICc8L25hdj4nLFxyXG4gICAgICAgIGxpbms6ZnVuY3Rpb24oc2NvcGUsZWxlbSxhdHRycyxjb250cm9sbGVyaW5zdGFuY2Upe1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pO1xyXG4vL2xpc3RcclxuYXBwLmRpcmVjdGl2ZSgnbGlzdFZpZXcnLGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgcmVzdHJpY3Q6J0UnLFxyXG4gICAgICAgIHJlcGxhY2U6dHJ1ZSxcclxuICAgICAgICBzY29wZTp7XHJcbiAgICAgICAgICAgIGxpc3REYXRhOic9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGVtcGxhdGU6Jzx1bCBjbGFzcz1cImxpc3R2aWV3XCIgbmctY2xpY2s9XCJzaG93TmV4dExldmVsKCRldmVudClcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJpdGVtXCIgbmctcmVwZWF0PVwibGlzdGl0ZW0gaW4gbGlzdERhdGEgdHJhY2sgYnkgJGluZGV4XCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaWNvbiB7e2xpc3RpdGVtLmljb259fVwiPjwvZGl2PicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd7e2xpc3RpdGVtLm5hbWV9fScrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYXJyb3cge3tsaXN0aXRlbS5hcnJvd319XCI+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cInNlY29uZGxldmVsXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwic2Vjb25kaXRlbVwiIG5nLXJlcGVhdD1cInNlY29uZCBpbiBsaXN0aXRlbS5zZWNvbmQgdHJhY2sgYnkgJGluZGV4XCI+e3tzZWNvbmQubmFtZX19PC9saT4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC91bD4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L2xpPicrXHJcbiAgICAgICAgICAgICAgICAnPC91bD4nLFxyXG4gICAgICAgIGxpbms6ZnVuY3Rpb24oc2NvcGUsZWxlbSxhdHRycyxjb250cm9sbGVyaW5zdGFuY2Upe1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICoganVkZ2Ugd2hpY2gga2luZCBvZiBsaXN0dmlldyB0byBzaG93XHJcbiAgICAgICAgICAgICAqIGhhc0ljb24gbWVhbnMgbGlzdHZpZXcgaXRlbSBoYXMgaWNvbiBvbiBsZWZ0XHJcbiAgICAgICAgICAgICAqIGhhc0Fycm93IG1lYW5zIGxpc3R2aWV3IGl0ZW0gaGFzIGFycm93IG9uIHJpZ2h0IGFuZCB3aWxsIGhhdmUgY2hpbGQgbGV2ZWxcclxuICAgICAgICAgICAgICogKiovXHJcbiAgICAgICAgICAgIHZhciBoYXNJY29uPWZhbHNlLGhhc0Fycm93PWZhbHNlO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUubGlzdERhdGEsZnVuY3Rpb24oaXRlbSxpbmRleCl7XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmljb24mJmVsZW1bMF0uY2xhc3NOYW1lLmluZGV4T2YoJ2hhc0ljb24nKTwwKXtcclxuICAgICAgICAgICAgICAgICAgICBoYXNJY29uPXRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmFycm93JiZlbGVtWzBdLmNsYXNzTmFtZS5pbmRleE9mKCdoYXNBcnJvdycpPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0Fycm93PXRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZihoYXNJY29uKXtcclxuICAgICAgICAgICAgICAgIGVsZW1bMF0uY2xhc3NOYW1lPWVsZW1bMF0uY2xhc3NOYW1lK1wiIGhhc0ljb25cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihoYXNBcnJvdyl7XHJcbiAgICAgICAgICAgICAgICBlbGVtWzBdLmNsYXNzTmFtZT1lbGVtWzBdLmNsYXNzTmFtZStcIiBoYXNBcnJvd1wiO1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuc2hvd05leHRMZXZlbD1mdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLnNyY0VsZW1lbnQpOy8vc2hpamlhbmRhaWxpIHpoYW9kYW9jaHVmYXNoaWppYW55dWFuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9MaT0gZS5zcmNFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvVWxTZWNvbmQ9IGUuc3JjRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2Vjb25kbGV2ZWwnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihvVWxTZWNvbmQuY2xhc3NOYW1lLmluZGV4T2YoJ2FjdGl2ZScpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvVWxTZWNvbmQuY2xhc3NOYW1lPW9VbFNlY29uZC5jbGFzc05hbWUuc3BsaXQoJyBhY3RpdmUnKS5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYUxpPWVsZW1bMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXRlbScpLGxlbj1hTGkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPGxlbjtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9TZWNVbD1hTGlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvU2VjVWwuY2xhc3NOYW1lLmluZGV4T2YoJ2FjdGl2ZScpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9TZWNVbC5jbGFzc05hbWU9b1NlY1VsLmNsYXNzTmFtZS5zcGxpdCgnIGFjdGl2ZScpLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb1VsU2Vjb25kLmNsYXNzTmFtZSs9XCIgYWN0aXZlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuYXBwLmRpcmVjdGl2ZSgnY2hhdFJvb20nLGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlZGlyZWN0OlwiRVwiLFxyXG4gICAgICAgIHNjb3BlOnt9LFxyXG4gICAgICAgIGxpbms6ZnVuY3Rpb24oc2NvcGUsZWxlbSxhdHRycyxjb250cm9sbGVyaW5zdGFuY2Upe1xyXG4gICAgICAgICAgICB2YXIgc29ja2V0PWlvLmNvbm5lY3QoXCJodHRwOi8vMTI3LjAuMC4xOjMwMDJcIik7XHJcbiAgICAgICAgICAgIHNvY2tldC5vbignbmFtZVJlc3VsdCcsIGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ3lvdSBhcmUgbm93IGtub3duIGFzICcgKyByZXN1bHQubmFtZSArICcuJztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWVzc2FnZT0nLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3Vlc3RuYW1lJykuaW5uZXJIVE1MID0gbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IHJlc3VsdC5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc29ja2V0Lm9uKCdqb2luUmVzdWx0JywgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vbScpLmlubmVySFRNTCA9IHJlc3VsdC5yb29tO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2NvcGUuc2VuZE1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvb206ICdMb2JieScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJfaW5wdXQnKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtZXNzYWdlJywgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzb2NrZXQub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAgICAgICAgIHAuaW5uZXJIVE1MID0gbWVzc2FnZS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UnKS5hcHBlbmRDaGlsZChwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEFkbWluaXN0cmF0b3Igb24gMTYtOC0xMS5cbiAqL1xuY29uc29sZS5sb2coJ3V0aWwnKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
