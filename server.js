/**
 * Created by jtony on 2016-09-09.
 */
'use strict';

var express = require('express');
var appHttp = require('http');
var server = require('socket.io');

var MessengerApi = function () {
    var self = this;
    self.init = function () {
      self.app = express() ;

        //for socket.io client to work
        //pointing to the static public/index.html
        self.app.use(express.static(__dirname + '/public'));

        self.http = appHttp.Server(self.app);

        //for socket.io.client to work
        self.io = server(appHttp);

    };//End of self.init
    self.startApp = function () {
        self.init();

        //For socket.io.client to work
        //Assigned the
        self.appServer = self.http.listen(3000, function () {
            console.log("listening on port: 3000");
        });
        self.startServerMessenger();

    };
    self.startServerMessenger = function () {
      var CONNECTION = 'connection';

        //For socket.io.client to work
        //io.listen should be passed on http Server Instance,
        //Hence http.Server instance returned by self.http.listen
        self.socket = self.io.listen(self.appServer);

        self.socket.on(CONNECTION, function (socket) {
           console.log('a user is connected');
            socket.on('disconnect', function () {
               console.log('user disconnected');
            });
        });
    }
}; //end of messengerApi

var s = new MessengerApi();
s.startApp();