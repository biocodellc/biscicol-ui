import angular from 'angular';

const ngEnter = () => ({
  restrict: 'A',
  link(scope, element, attrs) {
    element.bind('keydown keypress', $event => {
      if ($event.which === 13) {
        if (
          !('ngEnterDisabled' in attrs) ||
          !scope.$eval(attrs.ngEnterDisabled)
        ) {
          scope.$apply(() => scope.$eval(attrs.ngEnter));
        }
        $event.preventDefault();
      }
    });
  },
});

export default angular.module('fims.ngEnter', []).directive('ngEnter', ngEnter)
  .name;
