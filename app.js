$(document).ready(function(){
    var scrollspeed = 500; // px per second
    var minScrollTime = 150;
    var maxScrollTime = 1000;

    function scrollToDiv(selector) {
        var targetDiv = $(selector);
        if (targetDiv.length) {
            var targetTop = targetDiv.offset().top;
            var current = $(document).scrollTop();
            var scrollTime = Math.max(Math.min(1000 * Math.abs(targetTop - current) / scrollspeed, maxScrollTime), minScrollTime);

            $("html,body").animate({
                scrollTop: targetTop
            }, scrollTime);
        } else {
            return false;
        }
    }

    $(".click-projects").on("click", function(){scrollToDiv("#projects")});
    $(".click-contact").on("click", function(){scrollToDiv("#contact")});
});