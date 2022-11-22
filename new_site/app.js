$(document).ready(function(){
    // Function for scrolling to specified div
    var scrollspeed = 500; // px per second
    var minScrollTime = 150;
    var maxScrollTime = 1000;

    function scrollToDiv(selector) {
        var targetDiv = $(selector);
        if (targetDiv.length) {
            var targetTop = targetDiv.offset().top - 120;
            var current = $(document).scrollTop();
            var scrollTime = Math.max(Math.min(1000 * Math.abs(targetTop - current) / scrollspeed, maxScrollTime), minScrollTime);

            $("html,body").animate({
                scrollTop: targetTop
            }, scrollTime);
        } else {
            return false;
        }
    }

    // Function for activating mobile menu
    function activateMobileMenu() {
        $("body").addClass("scroll-lock");
        $("#mobile-navbar ul").css("visibility", "visible");
        $("#navbar-toggle").addClass("activated");
        $("#mobile-navbar").addClass("activated");

        $("#mobile-navbar li").each(function(index) {
            var current = $(this)
            setTimeout(function() {
                $(current).css("opacity", "1");
            }, index * 150);
        });
    }

    // Function for deactivating mobile menu
    function deactivateMobileMenu() {
        $("body").removeClass("scroll-lock");
        $("#navbar-toggle").removeClass("activated");

        var navlength = $("#mobile-navbar li").length;
        setTimeout(function() {
            $("#mobile-navbar").removeClass("activated");
        }, (navlength + 1) * 80);

        $("#mobile-navbar li").each(function(index) {
            var current = $(this)
            setTimeout(function() {
                $(current).css("opacity", "0");
            }, (navlength - 1 - index) * 50);
        });

        setTimeout(function() {
            $("#mobile-navbar ul").css("visibility", "hidden");
        }, (navlength + 1) * 100);

        if ($("#mobile-navbar input").is(":checked")) {
            $("#mobile-navbar input").prop("checked", false);
        }
    }


    // TOGGLE BUTTON: Mobile menu
    $("#mobile-navbar input").on("click", function() {
        if ($(this).is(":checked")) {
            // Checked -- turn on mobile menu
            activateMobileMenu();
        } else {
            // Unchecked -- turn off mobile menu
            deactivateMobileMenu();
        }
    });

    // Mobile menu link click
    $("#mobile-navbar a").each(function(){
        $(this).on("click", function() {
            deactivateMobileMenu();
            scrollToDiv($(this).attr("href"));
        });
    });

    // Navbar link click
    $("#navbar a").each(function() {
        $(this).on("click", function() {
            scrollToDiv($(this).attr("href"));
        })
    })
});