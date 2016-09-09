/**
 * Created by jtony on 2016-09-09.
 */
(function (ng) {
    "use strict";
    var app = ng.module('custom-filters', []);
    /*
    * Customize the filter to display the current user at the top of the user list.
    * */

    app.filter('moveCurrentUserToTop',[function () {
        return function (friends, name) {
            var newList = [];

            ng.forEach(friends, function (u) {
                if (u === name){
                    newList.unshift(u);
                }else{
                    newList.push(u);
                }
            });

            return newList;
        }
    }]);
})(angular);