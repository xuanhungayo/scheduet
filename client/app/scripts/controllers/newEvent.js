'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the new event
 */
const colorMap = {
  purple: '#605ca8',
  aqua: '#00c0ef',
  blue: '#0073b7',
  black: '#111111',
  green: '#00a65a',
  gray: '#d2d6de',
  yellow: '#f39c12',
  orange: '#ff851b',
  red: '#dd4b39',
  muted: '#7a869d',
  navy: '#001f3f'
};

angular.module('app.calendar')
  .controller('NewEventCtrl', function ($scope, $uibModalInstance, shareData) {
    var reformatEvent = function(event) {
      event.start = new Date(event.startDate.getFullYear(), event.startDate.getMonth(), 
        event.startDate.getDay(), event.startTime.getHours(), event.startTime.getMinutes());
      event.end = new Date(event.endDate.getFullYear(), event.endDate.getMonth(), 
        event.endDate.getDay(), event.endTime.getHours(), event.endTime.getMinutes());
      return event;
    };

    $scope.colors = ['aqua', 'blue', 'teal', 'green', 'gray', 'yellow', 'orange', 'red', 'purple', 
    'navy'];

    $scope.color = colorMap['purple'];
    $scope.startDatePickerOpened = false;
    $scope.endDatePickerOpened = false;

    $scope.$watch(
      function() {return shareData.getModifyingEvent()}, 
      function (newValue, oldValue) {
        $scope.newEvent = newValue;
    });

    if ($scope.newEvent === null)
      $scope.newEvent = {
        textColor: 'white',
        startDate: new Date(),
        endDate: new Date(),
        startTime: new Date(0),
        endTime: new Date(0),
        color: $scope.color,
      }

    $scope.addEvent = function() {
      if ($scope.eventForm.$valid)
    	 $uibModalInstance.close(reformatEvent($scope.newEvent));
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    }

    $scope.toggleStartDatePicker = function() {
      $scope.startDatePickerOpened = !$scope.startDatePickerOpened;
    }

    $scope.toggleEndDatePicker = function() {
      $scope.endDatePickerOpened = !$scope.endDatePickerOpened;
    }

    $scope.changeColor = function(color) {
      $scope.color = colorMap[color];
      $scope.newEvent.color = $scope.color;
    }
  });