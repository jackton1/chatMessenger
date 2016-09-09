/**
 * Created by jtony on 2016-09-09.
 */
(function (ng) {
   "use strict";
    var app = ng.module('dailog', []);

    app.directive('popupWindow', [function () {
      return {
          restrict: 'E',
          replace: true,
          link: function (scope, element, attribute) {
              scope.hideModal = function () {
                  element.modal('hide');
              };

              scope.showModal = function () {
                  element.modal('show');
              };
          },
          templateUrl: '../html/dialog/dialog.html'
        };
    }]);
})(angualar);