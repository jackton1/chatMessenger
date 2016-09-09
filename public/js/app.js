(function (ng){
    var SEND_MSG = 'send:message';
    var INIT = 'init';
    var CHANGE_NAME = 'change:name';
    var USER_JOIN = 'user:join';
    var USER_LEFT = 'user:left';
    var CHAT_ROOM = 'chatroom';
    var ERR_CHANGING_NAME = 'There was an error changing your name';

    var app = ng.module('app', ['services', 'custom-filters']);

    app.controller('FromController', ['$scope', 'socket', function($scope, socket){
        $scope.message = "";
        $scope.messages = [];
        $scope.friends = [];

        //Initialize the socket listeners
        socket.on(INIT, function(data){
           $scope.name = data.name;
            $scope.friends = data.friends;
        });

        socket.on(SEND_MSG, function(msg){
            $scope.messages.push(msg);
        });

        socket.on(CHANGE_NAME, function(data){
           changeName(data.prevName, data.currentName);
        });

        socket.on(USER_JOIN, function(data){
            $scope.messages.push({
                user: CHAT_ROOM,
                text: 'User ' + data.name + ' has joined'
            });
            $scope.friends.push(data.name);
        });

        //Add message to the conversation when a user is disconnected or leaves the chat room.
        socket.on(USER_LEFT, function(data){
            $scope.messages.push({
                user: CHAT_ROOM,
                text: 'User ' + data.name + ' has left'
            });

            var i=0, friend = '';

            for(i; i< $scope.friends.length; i++){
                friend = $scope.friends[i];
                if(friend === data.name){
                    $scope.friends.slice(i, 1);
                    break;
                }
            }
        });

        var changeName = function (prevName, currentName) {
            var i = 0;

            for(i; i < $scope.users.length; i++){
                if($scope.friends[i] === prevName){
                    $scope.friends[i] = currentName;
                    break;
                }
            }

            $scope.messages.push({
                user: CHAT_ROOM,
                text: 'Username changed from ' + prevName + 'to '+currentName + ' successfully'
            });
        };

        $scope.changeName = function () {
            socket.emit(CHANGE_NAME, {
               name: $scope.currentName
            }, function (result) {
                 if(!result){
                     alert(ERR_CHANGING_NAME);
                 }else{
                     changeName($scope.name, $scope.currentName);

                     $scope.name = $scope.currentName;
                     $scope.currentName = '';
                 }
            });
        };

        $scope.submit = function () {
            socket.emit(SEND_MSG, {msg: $scope.message});

            $scope.messages.push({
                user: $scope.name,
                text: $scope.message
            });

            $scope.message = '';
        }

    }]);

})(angular);

