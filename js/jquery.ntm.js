/* jQuery Nxeed's Tree Menu v1 | (c) 2014 Nxeed | https://github.com/nxeed */

(function($) {
    var defaults = {
        autoParentDetection: true,
        autoActiveDetection: true,
        itemsUniqueClasses: true,
        parentClass: 'parent',
        activeClass: 'active',
        selectedClass: 'selected',
        expandClass: 'opened',
        collapseClass: 'closed',
        spoilerButtonClickMinX: 4,
        spoilerButtonClickMaxX: 20,
        spoilerButtonClickMinY: 8,
        spoilerButtonClickMaxY: 24,
        slideEffect: true
    };

    var methods = {
        init: function(params) {
            var options = $.extend({}, defaults, params);
            var items = this.find('li');
            var item;
            var content;

            function toggler(item, content) {
                item.toggleClass(options.expandClass).toggleClass(options.collapseClass);

                if (options.slideEffect) {
                    content.slideToggle();
                } else {
                    content.toggle();
                }
            }

            $.each(items, function(num, item) {
                item = $(item);

                if (options.autoParentDetection) {
                    if (item.has('ul')[0]) {
                        item.addClass(options.parentClass);
                    }
                }

                if (options.itemsUniqueClasses) {
                    item.addClass('item-' + num);
                }

            });

            var parents = this.find('.' + options.parentClass);

            $.each(parents, function(num, parent) {
                parent = $(parent);

                parent.addClass(options.collapseClass);

                if (parent.has('.' + options.selectedClass)[0]) {
                    parent.removeClass(options.collapseClass).addClass(options.expandClass);

                    if (options.autoActiveDetection) {
                        parent.addClass(options.activeClass);
                    }
                }

                if (parent.hasClass(options.selectedClass)) {
                    parent.removeClass(options.activeClass).removeClass(options.collapseClass).addClass(options.expandClass);
                }
            });

            $('.' + options.collapseClass + ' > ul', this).hide();

            $('.' + options.parentClass + ' > a', this).on('click',function(e) {
                item = $(this).parent('li');
                content = $(this).parent('li').children('ul');
                toggler(item, content);
                e.preventDefault();
            });

            $('.' + options.parentClass + ' > a', this).on('keydown',function(e) {
                console.log('keydown');
                if (e.keyCode === 13) {
                    console.log('13');
                    item = $(this).parent('li');
                    content = $(this).parent('li').children('ul');
                    toggler(item, content);
                }
                e.preventDefault();
            });
        }
    };

    $.fn.ntm = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method "' + method + '" does not have jQuery.ntm plugin');
        }
    };
})(jQuery);