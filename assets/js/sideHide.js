$(function () {
    $(".hider").click(function (e) { 
        e.preventDefault();
        $(".Qselect").toggle();
        $(".QWrapper").toggleClass("col-md-12");
        $(".QWrapper .question img").toggleClass("w-50");
    });
    
});