/**
 * Created by Administrator on 16-8-17.
 */
var app=angular.module("shelleyApp",['ui.router','socket']);
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
            templateUrl:'./public/views/contect.html'
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
});
/**
 * Created by Administrator on 16-8-28.
 */
//contect controller
app.controller("contectCtler",function($scope){
    console.log("contectCtler");
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
app.directive('charRoom',function(){
    return {
        redirect:"E",
        replace:"true",
        scope:{},
        controller:"contectCtler",
        link:function(scope,elem,attrs,controllerinstance){}
    };
});
/**
 * Created by Administrator on 16-8-11.
 */
console.log('util');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXIuanMiLCJkaXJlY3RpdmUuanMiLCJ1dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pIQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzaGVsbGV5ZnJhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBBZG1pbmlzdHJhdG9yIG9uIDE2LTgtMTcuXHJcbiAqL1xyXG52YXIgYXBwPWFuZ3VsYXIubW9kdWxlKFwic2hlbGxleUFwcFwiLFsndWkucm91dGVyJywnc29ja2V0J10pO1xyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCdkZWZhdWx0Jyk7XHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIud2hlbignJywnZGVmYXVsdCcpO1xyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLndoZW4oJy8nLCdkZWZhdWx0Jyk7XHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSgnZGVmYXVsdCcse1xyXG4gICAgICAgICAgICB1cmw6Jy9kZWZhdWx0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6XCIuL3B1YmxpYy92aWV3cy9kZWZhdWx0Lmh0bWxcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdleGFtcGxlJyx7XHJcbiAgICAgICAgICAgIHVybDonL2V4YW1wbGUnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDonLi9wdWJsaWMvdmlld3MvZXhhbXBsZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdpbnRyb2R1Y2UnLHtcclxuICAgICAgICAgICAgdXJsOicvaW50cm9kdWNlJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6Jy4vcHVibGljL3ZpZXdzL2ludHJvZHVjZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdjb250ZWN0Jyx7XHJcbiAgICAgICAgICAgIHVybDonL2NvbnRlY3QnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDonLi9wdWJsaWMvdmlld3MvY29udGVjdC5odG1sJ1xyXG4gICAgICAgIH0pO1xyXG59KTtcclxuLy9ib2R5IGNvbnRyb2xsZXIgc2hlbGxleUFwcENvbnRyb2xsZXJcclxuYXBwLmNvbnRyb2xsZXIoJ3NoZWxsZXlBcHBDb250cm9sbGVyJyxmdW5jdGlvbigkc2NvcGUpe1xyXG4gICAgJHNjb3BlLnRpdGxlPVwic2hlbGxleWZyYW1lXCI7XHJcbiAgICAkc2NvcGUubGlzdERhdGE9W1xyXG4gICAgICAgIHtuYW1lOlwibGlzdGl0ZW0xXCIsaWNvbjpcImljb24tbGlzdFwiLGFycm93OidpY29uLWFuZ2xlLXJpZ2h0JyxzZWNvbmQ6W1xyXG4gICAgICAgICAgICB7bmFtZTonc2Vjb25kLTEnfSxcclxuICAgICAgICAgICAge25hbWU6J3NlY29uZC0yJ30sXHJcbiAgICAgICAgICAgIHtuYW1lOidzZWNvbmQtMyd9XHJcbiAgICAgICAgXX0sXHJcbiAgICAgICAge25hbWU6XCJsaXN0aXRlbTJcIixpY29uOlwiaWNvbi1pbmZvLXNpZ25cIixhcnJvdzonaWNvbi1hbmdsZS1yaWdodCcsc2Vjb25kOltcclxuICAgICAgICAgICAge25hbWU6J3NlY29uZC0xJ30sXHJcbiAgICAgICAgICAgIHtuYW1lOidzZWNvbmQtMid9LFxyXG4gICAgICAgICAgICB7bmFtZTonc2Vjb25kLTMnfVxyXG4gICAgICAgIF19LFxyXG4gICAgICAgIHtuYW1lOlwibGlzdGl0ZW0zXCIsaWNvbjpcImljb24taW5mby1zaWduXCIsYXJyb3c6J2ljb24tYW5nbGUtcmlnaHQnLHNlY29uZDpbXHJcbiAgICAgICAgICAgIHtuYW1lOidzZWNvbmQtMSd9LFxyXG4gICAgICAgICAgICB7bmFtZTonc2Vjb25kLTInfSxcclxuICAgICAgICAgICAge25hbWU6J3NlY29uZC0zJ31cclxuICAgICAgICBdfSxcclxuICAgICAgICB7bmFtZTpcImxpc3RpdGVtNFwiLGljb246XCJpY29uLWluZm8tc2lnblwiLGFycm93OidpY29uLWFuZ2xlLXJpZ2h0JyxzZWNvbmQ6W1xyXG4gICAgICAgICAgICB7bmFtZTonc2Vjb25kLTEnfSxcclxuICAgICAgICAgICAge25hbWU6J3NlY29uZC0yJ30sXHJcbiAgICAgICAgICAgIHtuYW1lOidzZWNvbmQtMyd9XHJcbiAgICAgICAgXX1cclxuICAgIF07XHJcbiAgICAvKiRzY29wZS5saXN0RGF0YT1bXHJcbiAgICAgICAge25hbWU6XCJsaXN0aXRlbTFcIixpY29uOlwiaWNvbi1saXN0XCIsYXJyb3c6J2ljb24tYW5nbGUtcmlnaHQnfSxcclxuICAgICAgICB7bmFtZTpcImxpc3RpdGVtMlwiLGljb246XCJpY29uLWluZm8tc2lnblwiLGFycm93OidpY29uLWFuZ2xlLXJpZ2h0J30sXHJcbiAgICAgICAge25hbWU6XCJsaXN0aXRlbTNcIixpY29uOlwiaWNvbi1pbmZvLXNpZ25cIixhcnJvdzonaWNvbi1hbmdsZS1yaWdodCd9LFxyXG4gICAgICAgIHtuYW1lOlwibGlzdGl0ZW00XCIsaWNvbjpcImljb24taW5mby1zaWduXCIsYXJyb3c6J2ljb24tYW5nbGUtcmlnaHQnfVxyXG4gICAgXTsqL1xyXG4gICAgLyokc2NvcGUubGlzdERhdGE9W1xyXG4gICAgIHtuYW1lOlwibGlzdGl0ZW0xXCJ9LFxyXG4gICAgIHtuYW1lOlwibGlzdGl0ZW0yXCJ9LFxyXG4gICAgIHtuYW1lOlwibGlzdGl0ZW0zXCJ9LFxyXG4gICAgIHtuYW1lOlwibGlzdGl0ZW00XCJ9XHJcbiAgICAgXTsqL1xyXG4gICAgLyokc2NvcGUubGlzdERhdGE9W1xyXG4gICAgIHtuYW1lOlwibGlzdGl0ZW0xXCIsaWNvbjpcImljb24tbGlzdFwifSxcclxuICAgICB7bmFtZTpcImxpc3RpdGVtMlwiLGljb246XCJpY29uLWluZm8tc2lnblwifSxcclxuICAgICB7bmFtZTpcImxpc3RpdGVtM1wiLGljb246XCJpY29uLWluZm8tc2lnblwifSxcclxuICAgICB7bmFtZTpcImxpc3RpdGVtNFwiLGljb246XCJpY29uLWluZm8tc2lnblwifVxyXG4gICAgIF07Ki9cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWRtaW5pc3RyYXRvciBvbiAxNi04LTI4LlxyXG4gKi9cclxuLy9jb250ZWN0IGNvbnRyb2xsZXJcclxuYXBwLmNvbnRyb2xsZXIoXCJjb250ZWN0Q3RsZXJcIixmdW5jdGlvbigkc2NvcGUpe1xyXG4gICAgY29uc29sZS5sb2coXCJjb250ZWN0Q3RsZXJcIik7XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFkbWluaXN0cmF0b3Igb24gMTYtOC0yMC5cclxuICovXHJcbi8qKlxyXG4gKiBuYXZUb3BcclxuICogKi9cclxuYXBwLmRpcmVjdGl2ZSgnbmF2VG9wJyxmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJueyBcclxuICAgICAgICByZXN0cmljdDonRScsXHJcbiAgICAgICAgcmVwbGFjZTp0cnVlLFxyXG4gICAgICAgIHNjb3BlOntcclxuICAgICAgICAgICAgdGl0bGU6Jz1uYXZ0b3BUaXRsZScsXHJcbiAgICAgICAgICAgIGljb25yaWdodDonPWljb25yaWdodCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlbXBsYXRlOic8bmF2IGNsYXNzPVwiZmxleC1ib3ggbmF2dG9wXCI+JytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImZsZXgtaXRlbSBpY29ucmViYWNrIGljb24tYW5nbGUtbGVmdFwiIG5nLWNsaWNrPVwicmV0dXJuYmFjaygpXCI+PC9kaXY+JytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImZsZXgtaXRlbSB0aXRsZVwiPnt7dGl0bGV9fTwvZGl2PicrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gaWNvbnJpZ2h0XCI+e3tpY29ucmlnaHR9fTwvZGl2PicrXHJcbiAgICAgICAgJzwvbmF2PicsXHJcbiAgICAgICAgbGluazpmdW5jdGlvbihzY29wZSxlbGVtLGF0dHJzLGNvbnRyb2xsZXJpbnN0YW5jZSl7XHJcbiAgICAgICAgICAgIHNjb3BlLnJldHVybmJhY2s9ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuLy9tZW51Ym90dG9tXHJcbmFwcC5kaXJlY3RpdmUoJ25hdkJvdHRvbScsZnVuY3Rpb24oKXtcclxuICAgIHJldHVybntcclxuICAgICAgICByZXN0cmljdDonRUEnLFxyXG4gICAgICAgIHJlcGxhY2U6dHJ1ZSxcclxuICAgICAgICBzY29wZTp7fSxcclxuICAgICAgICB0ZW1wbGF0ZTonPG5hdiBjbGFzcz1cImZsZXgtYm94IG5hdmJvdHRvbVwiPicrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gZmxleC1ib3gtdmVyXCIgdWktc3JlZj1cImRlZmF1bHRcIj4nK1xyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiaWNvbi1ob21lIGZsZXgtYm94XCI+PC9kaXY+JytcclxuICAgICAgICAnPHAgY2xhc3M9XCJmbGV4LWJveFwiPummlumhtTwvcD4nK1xyXG4gICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtYm94LXZlclwiIHVpLXNyZWY9XCJleGFtcGxlXCI+JytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImljb24tbGlzdCBmbGV4LWJveFwiPjwvZGl2PicrXHJcbiAgICAgICAgJzxwIGNsYXNzPVwiZmxleC1ib3hcIj7kuL7kvos8L3A+JytcclxuICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImZsZXgtaXRlbSBmbGV4LWJveC12ZXJcIiB1aS1zcmVmPVwiaW50cm9kdWNlXCI+JytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImljb24taW5mby1zaWduIGZsZXgtYm94XCI+PC9kaXY+JytcclxuICAgICAgICAnPHAgY2xhc3M9XCJmbGV4LWJveFwiPuivtOaYjjwvcD4nK1xyXG4gICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtYm94LXZlclwiIHVpLXNyZWY9XCJjb250ZWN0XCI+JytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImljb24tY29tbWVudHMgZmxleC1ib3hcIj48L2Rpdj4nK1xyXG4gICAgICAgICc8cCBjbGFzcz1cImZsZXgtYm94XCI+6IGU57O7PC9wPicrXHJcbiAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgJzwvbmF2PicsXHJcbiAgICAgICAgbGluazpmdW5jdGlvbihzY29wZSxlbGVtLGF0dHJzLGNvbnRyb2xsZXJpbnN0YW5jZSl7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSk7XHJcbi8vbGlzdFxyXG5hcHAuZGlyZWN0aXZlKCdsaXN0VmlldycsZnVuY3Rpb24oKXtcclxuICAgIHJldHVybntcclxuICAgICAgICByZXN0cmljdDonRScsXHJcbiAgICAgICAgcmVwbGFjZTp0cnVlLFxyXG4gICAgICAgIHNjb3BlOntcclxuICAgICAgICAgICAgbGlzdERhdGE6Jz0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZW1wbGF0ZTonPHVsIGNsYXNzPVwibGlzdHZpZXdcIiBuZy1jbGljaz1cInNob3dOZXh0TGV2ZWwoJGV2ZW50KVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cIml0ZW1cIiBuZy1yZXBlYXQ9XCJsaXN0aXRlbSBpbiBsaXN0RGF0YSB0cmFjayBieSAkaW5kZXhcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpY29uIHt7bGlzdGl0ZW0uaWNvbn19XCI+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3t7bGlzdGl0ZW0ubmFtZX19JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJhcnJvdyB7e2xpc3RpdGVtLmFycm93fX1cIj48L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHVsIGNsYXNzPVwic2Vjb25kbGV2ZWxcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJzZWNvbmRpdGVtXCIgbmctcmVwZWF0PVwic2Vjb25kIGluIGxpc3RpdGVtLnNlY29uZCB0cmFjayBieSAkaW5kZXhcIj57e3NlY29uZC5uYW1lfX08L2xpPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3VsPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvbGk+JytcclxuICAgICAgICAgICAgICAgICc8L3VsPicsXHJcbiAgICAgICAgbGluazpmdW5jdGlvbihzY29wZSxlbGVtLGF0dHJzLGNvbnRyb2xsZXJpbnN0YW5jZSl7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBqdWRnZSB3aGljaCBraW5kIG9mIGxpc3R2aWV3IHRvIHNob3dcclxuICAgICAgICAgICAgICogaGFzSWNvbiBtZWFucyBsaXN0dmlldyBpdGVtIGhhcyBpY29uIG9uIGxlZnRcclxuICAgICAgICAgICAgICogaGFzQXJyb3cgbWVhbnMgbGlzdHZpZXcgaXRlbSBoYXMgYXJyb3cgb24gcmlnaHQgYW5kIHdpbGwgaGF2ZSBjaGlsZCBsZXZlbFxyXG4gICAgICAgICAgICAgKiAqKi9cclxuICAgICAgICAgICAgdmFyIGhhc0ljb249ZmFsc2UsaGFzQXJyb3c9ZmFsc2U7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5saXN0RGF0YSxmdW5jdGlvbihpdGVtLGluZGV4KXtcclxuICAgICAgICAgICAgICAgIGlmKGl0ZW0uaWNvbiYmZWxlbVswXS5jbGFzc05hbWUuaW5kZXhPZignaGFzSWNvbicpPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0ljb249dHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGl0ZW0uYXJyb3cmJmVsZW1bMF0uY2xhc3NOYW1lLmluZGV4T2YoJ2hhc0Fycm93Jyk8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzQXJyb3c9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKGhhc0ljb24pe1xyXG4gICAgICAgICAgICAgICAgZWxlbVswXS5jbGFzc05hbWU9ZWxlbVswXS5jbGFzc05hbWUrXCIgaGFzSWNvblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGhhc0Fycm93KXtcclxuICAgICAgICAgICAgICAgIGVsZW1bMF0uY2xhc3NOYW1lPWVsZW1bMF0uY2xhc3NOYW1lK1wiIGhhc0Fycm93XCI7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5zaG93TmV4dExldmVsPWZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuc3JjRWxlbWVudCk7Ly9zaGlqaWFuZGFpbGkgemhhb2Rhb2NodWZhc2hpamlhbnl1YW5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgb0xpPSBlLnNyY0VsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9VbFNlY29uZD0gZS5zcmNFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWNvbmRsZXZlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG9VbFNlY29uZC5jbGFzc05hbWUuaW5kZXhPZignYWN0aXZlJyk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9VbFNlY29uZC5jbGFzc05hbWU9b1VsU2Vjb25kLmNsYXNzTmFtZS5zcGxpdCgnIGFjdGl2ZScpLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhTGk9ZWxlbVswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtJyksbGVuPWFMaS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8bGVuO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb1NlY1VsPWFMaVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9TZWNVbC5jbGFzc05hbWUuaW5kZXhPZignYWN0aXZlJyk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1NlY1VsLmNsYXNzTmFtZT1vU2VjVWwuY2xhc3NOYW1lLnNwbGl0KCcgYWN0aXZlJykuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvVWxTZWNvbmQuY2xhc3NOYW1lKz1cIiBhY3RpdmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5hcHAuZGlyZWN0aXZlKCdjaGFyUm9vbScsZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVkaXJlY3Q6XCJFXCIsXHJcbiAgICAgICAgcmVwbGFjZTpcInRydWVcIixcclxuICAgICAgICBzY29wZTp7fSxcclxuICAgICAgICBjb250cm9sbGVyOlwiY29udGVjdEN0bGVyXCIsXHJcbiAgICAgICAgbGluazpmdW5jdGlvbihzY29wZSxlbGVtLGF0dHJzLGNvbnRyb2xsZXJpbnN0YW5jZSl7fVxyXG4gICAgfTtcclxufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEFkbWluaXN0cmF0b3Igb24gMTYtOC0xMS5cbiAqL1xuY29uc29sZS5sb2coJ3V0aWwnKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
