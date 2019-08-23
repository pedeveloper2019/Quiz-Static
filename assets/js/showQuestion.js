$(function () {
    // alert("I'm ready")
    viewdiv = 1
    answers = {
        "Question1": "2",
        "Question2": "3",
        "Question3": "4"
    }
    showdiv()

    function showdiv() {
        $(".question").css("display", "none");
        $(".question:nth-child(" + viewdiv + ")").css("display", "block");
        if(!$(".queNo tbody td.btn:nth-child(" + viewdiv + ")").hasClass("bg-success") 
        || !$(".queNo tbody td.btn:nth-child(" + viewdiv + ")").hasClass("bg-greenblue") || !$(".queNo tbody td.btn:nth-child(" + viewdiv + ")").hasClass("bg-purple")){
            $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("bg-deepyellow");
        }
    }

    // Save Answer Button
    $(".saveAnsbtn").click(function (e) {
        e.preventDefault();
        if ($(".question:nth-child(" + viewdiv + ") table tbody td input").is(":checked")) {
            $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").removeClass("bg-deepyellow");
            $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("bg-success text-light");
            viewdiv = +viewdiv + 1
            showdiv()
        } else {
            alert("Select answer first to save it")
        }
    });

    // Question answered and review
    $(".saveAnsReview").click(function (e) { 
        e.preventDefault();
        if ($(".question:nth-child(" + viewdiv + ") table tbody td input").is(":checked")) {
            $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").removeClass("bg-deepyellow");
            $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("bg-greenblue");
            viewdiv = +viewdiv + 1
            showdiv()
        } else {
            alert("Select answer first to save it and review")
        }
    });

    // Question selection 
    $(".quebtn").click(function (e) {
        e.preventDefault();
        viewdiv = $(this).attr("data-div");
        if (!$(this).hasClass("bg-success")) {
            $(this).addClass("bg-deepyellow")
            // alert(viewdiv)
        }
        $(".question").css("display", "none");
        $(".question:nth-child(" + viewdiv + ")").css("display", "block");
    });

    // Submit the test for result
    $(".submit").click(function (e) {
        e.preventDefault();
        data = $(".question input").serialize()
        data = data.split("&")
        // alert(data)
        result = {}
        $.each(data, function (index, val) {
            question = val.split("=")[0];
            answer = val.split("=")[1]
            // alert(question+":"+answer)
            result["" + question + ""] = "" + answer + "";
            // alert(JSON.stringify(result))
        });
    });
});