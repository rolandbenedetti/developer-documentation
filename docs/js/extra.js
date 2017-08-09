/* Display caption when image has title attribute. Based on http://jsfiddle.net/8kWCd/1/ */
$(document).ready(function() {
    $('img').each(function() {
        if ($(this).attr('title')) {
            $(this).wrap( "<figure></figure>" );
            $(this).after( "<figcaption>" + $(this).attr('title') + "</figcaption>" );
        }
    });
});

$(document).ready(function() {
    var self = $(this);

    var toggleCurrent = function (elem) {
        var parent_li = elem.closest('li');

        parent_li.siblings('li.current').removeClass('current');
        parent_li.siblings().find('li.current').removeClass('current');
        parent_li.find('> ul li.current').removeClass('current');
        parent_li.toggleClass('current');
    };

    // Set up javascript UX bits
    $(document)
    // Shift nav in mobile when clicking the menu.
        .on('click', "[data-toggle='wy-nav-top']", function() {
            $("[data-toggle='wy-nav-shift']").toggleClass("shift");
            $("[data-toggle='rst-versions']").toggleClass("shift");
        })

        // Nav menu link click operations
        .on('click', ".wy-menu-vertical .current ul li a", function() {
            var target = $(this);
            // Close menu when you click a link.
            $("[data-toggle='wy-nav-shift']").removeClass("shift");
            $("[data-toggle='rst-versions']").toggleClass("shift");
            // Handle dynamic display of l3 and l4 nav lists
            //toggleCurrent(target);
        })
        .on('click', "[data-toggle='rst-current-version']", function() {
            $("[data-toggle='rst-versions']").toggleClass("shift-up");
        })
    ;

    // Add expand links to all parents of nested ul
    $('.wy-menu-vertical ul').not('.simple').each(function () {
        if ($(this).children('li').length > 1) {
            $(this).siblings('a').each(function () {
                var link = $(this),
                    expand = $('<span class="toctree-expand"></span>');
                expand.on('click', function (ev) {
                    toggleCurrent(link);
                    ev.stopPropagation();
                    return false;
                });

                link.before(expand);
            });
        }
    });

    $('body').scrollspy({
        target: '.wy-menu-vertical .current .current .current'
    });
});
