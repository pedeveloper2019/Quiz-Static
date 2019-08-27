$(function () {
    $(".hider").click(function (e) { 
        e.preventDefault();
        $(".Qselect").toggle();
        $(".Qwrapper").toggleClass("col-md-12");
    });
    
});