'use strict';

describe('aaDatepickerLib', function() {
  beforeEach(angular.mock.module('aaDatepickerLib'));

  describe('aaDatepicker', function() {
    var element;
    describe('Given a datepicker element with a placeholder and the model set to null', function() {
      beforeEach(angular.mock.inject(function($compile, $rootScope) {
        $rootScope.dateModel = null;
        element = $compile("<aa-datepicker placeholder='Choose a Date' ng-model='dateModel' />")($rootScope);
        $rootScope.$digest();
      }));
      it('should show the placeholder text in the button', function() {
        var button = angular.element(element[0].querySelector('.aa-datepicker-button'));
        expect(button.text()).toEqual('Choose a Date');
      });
    });
    describe('Given a datpicker tag with ng-model set to a date object', function() {
      beforeEach(angular.mock.inject(function($compile, $rootScope) {
        $rootScope.dateModel = new Date(2013, 9, 25);
        element = $compile("<aa-datepicker placeholder='Choose a Date' ng-model='dateModel' />")($rootScope);
        $rootScope.$digest();
      }));
      it('should show the date string in MM/DD/YYYY format on the button', function() {
        var button = angular.element(element[0].querySelector('.aa-datepicker-button'));
        expect(button.text()).toEqual('10/25/2013');
      });
      it('should give the date input field the date string in MM/DD/YYYY format', function() {
        var dateTextInput = angular.element(element[0].querySelector('.aa-date-text-input'));
        expect(dateTextInput.val()).toEqual('10/25/2013');
      });
    });
  });
});