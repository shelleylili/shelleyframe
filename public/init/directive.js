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