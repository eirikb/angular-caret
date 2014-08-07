angular.module('eb.caret', [])

.directive('ebCaret', function() {

  function getPos(element) {
    if ('selectionStart' in element) {
      return element.selectionStart;
    } else if (document.selection) {
      element.focus();
      var sel = document.selection.createRange();
      var selLen = document.selection.createRange().text.length;
      sel.moveStart('character', -element.value.length);
      return sel.text.length - selLen;
    }
  }

  function setPos(element, caretPos) {
    if (element.createTextRange) {
      var range = element.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else {
      element.focus();
      if (element.selectionStart !== undefined) {
        element.setSelectionRange(caretPos, caretPos);
      }
    }
  }

  return {
    restrict: 'A',
    scope: {
      ebCaret: '='
    },
    link: function(scope, element, attrs) {
      element.on('keyup click', function(event) {
        scope.$apply(function() {
          scope.ebCaret = getPos(element[0]);
        });
      });
      scope.$watch('ebCaret', function(newVal) {
        if (typeof newVal === 'undefined') return;
        setPos(element[0], newVal);
      });
    }
  };
});
