'use strict';

/* Directives */


angular.module('laputin.directives', []).
    directive('fileTagListing', function () {
        return {
            restrict: 'E',
            scope: 'isolate',
            template: '{{ tagListing }}',

            link: function (scope, element, attrs) {
                scope.$watch("file", function (newValue, oldValue) {
                    if (typeof scope.file !== "undefined") {
                        var tagNames = _.pluck(scope.file.tags, "name");
                        scope.tagListing = tagNames.sort().join(", ");
                    }
                }, true);
            }
        };
    })
    .directive('onEnter', [function () {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.onEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    }])
    // Source: https://github.com/twitter/bootstrap/blob/master/js/bootstrap-typeahead.js
    .directive('bsTypeahead', ['$parse', function($parse) {
        'use strict';

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function postLink(scope, element, attrs, controller) {

                var getter = $parse(attrs.bsTypeahead),
                    setter = getter.assign,
                    value = getter(scope);

                // Watch bsTypeahead for changes
                scope.$watch(attrs.bsTypeahead, function(newValue, oldValue) {
                    if(newValue !== oldValue) {
                        value = newValue;
                    }
                });

                element.attr('data-provide', 'typeahead');
                element.typeahead({
                    source: function(query) { return angular.isFunction(value) ? value.apply(null, arguments) : value; },
                    minLength: attrs.minLength || 1,
                    items: attrs.items,
                    updater: function(value) {
                        // If we have a controller (i.e. ngModelController) then wire it up
                        if(controller) {
                            scope.$apply(function () {
                                controller.$setViewValue(value);
                            });
                        }
                        return value;
                    }
                });

                // Bootstrap override
                var typeahead = element.data('typeahead');
                // Fixes #2043: allows minLength of zero to enable show all for typeahead
                typeahead.lookup = function (ev) {
                    var items;
                    this.query = this.$element.val() || '';
                    if (this.query.length < this.options.minLength) {
                        return this.shown ? this.hide() : this;
                    }
                    items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source;
                    return items ? this.process(items) : this;
                };

                // Support 0-minLength
                if(attrs.minLength === "0") {
                    setTimeout(function() { // Push to the event loop to make sure element.typeahead is defined (breaks tests otherwise)
                        element.on('focus', function() {
                            element.val().length === 0 && setTimeout(element.typeahead.bind(element, 'lookup'), 200);
                        });
                    });
                }

            }
        };
    }])
    // Source: http://stackoverflow.com/a/14691170/27736
    .directive('blur', function () {
        return function (scope, element, attrs) {
            scope.$watch(attrs.blur, function () {
                element[0].blur();
            });
        };
    });
