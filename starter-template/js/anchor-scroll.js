
$(function () {
    var currentHash = "#";
    $(document).scroll(function () {
        $('.anchor_tags').each(function () {
            var top = window.pageYOffset;
            var distance = top - $(this).offset().top;
            var hash = $(this).attr('href');
            // 30 is an arbitrary padding choice, 
            // if you want a precise check then use distance===0
            if (distance < 30 && distance > -30 && currentHash != hash) {
                history.replaceState(null, null, hash);
                currentHash = hash;
            }
        });
    });
});