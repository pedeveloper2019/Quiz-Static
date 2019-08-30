$(function () {
    // alert("I'm ready")
    $(".toggleTop").click(function (e) { 
        e.preventDefault();
        // alert()
        // $(".CadDetails").css("display", "none");
        $(".topVertical").toggleClass("d-None")
        $(".topBar").toggle();
        $(".thinBar").toggleClass("d-inlineBlock")
    });
    viewdiv = 1
    answers = {
        "Question1": "2",
        "Question2": "3",
        "Question3": "4"
    }
    createDivs()
    showdiv()

    // Counter
    var initialSecs = 10800;
    var currentSecs = initialSecs;
    setTimeout(decrement, 1000);

    function decrement() {
        var displayedSecs = currentSecs % 60;
        var displayedMin = Math.floor(currentSecs / 60) % 60;
        var displayedHrs = Math.floor(currentSecs / 60 / 60);
        if (displayedMin <= 9) displayedMin = "0" + displayedMin;
        if (displayedSecs <= 9) displayedSecs = "0" + displayedSecs;
        currentSecs--;
        $(".remainCounter").html("["+displayedHrs + ":" + displayedMin + ":" +
            displayedSecs+"]");
        if (currentSecs !== -1) setTimeout(decrement, 1000);
    }

    function createDivs(){
        for(let index = 1; index <= 90; index++) {
            $(".questions").append(`<div class="question" style="border: 0px solid red;">
            <h4 class="p-2" style="border-bottom: 1px solid black;">Question `+index +` : </h4>
            <img class="w-50" src="assets/images/questions/`+index+`.png" alt="">
            <table class="table table-borderless mt-2 p-5"
                style="border-bottom: 1px solid black;">
                <tbody>
                    <tr>
                        <td> 1 ) <input type="radio" value="1" name="Question`+index+`" id="rOption1_1">
                           
                        </td>
                        <td> 2 ) <input type="radio" value="2" name="Question`+index+`" id="rOption1_1">
                            
                        </td>
                        <td> 3 ) <input type="radio" value="3" name="Question`+index+`" id="rOption1_1">
                            
                        </td>
                        <td> 4 ) <input type="radio" value="4" name="Question`+index+`" id="rOption1_1">
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`);
        }
    }
    function showdiv() {
        $(".question").css("display", "none");
        $(".question:nth-child(" + viewdiv + ")").css("display", "block");
        if (!$(".queNo tbody td.btn:nth-child(" + viewdiv + ")").hasClass("bg-success") ||
            !$(".queNo tbody td.btn:nth-child(" + viewdiv + ")").hasClass("bg-greenblue") || !$(".queNo tbody td.btn:nth-child(" + viewdiv + ")").hasClass("bg-purple")) {
            $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("bg-deepyellow");
        }
    }

    function saveNreview() {
        if ($(".question:nth-child(" + viewdiv + ") table tbody td input").is(":checked")) {
            $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").removeClass("bg-deepyellow");
            $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("bg-greenblue");
            viewdiv = +viewdiv + 1
            showdiv()
        } else {
            $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").removeClass("bg-deepyellow");
            $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("bg-purple");
            viewdiv = +viewdiv + 1
            showdiv()
        }
    }

    // subject selection buttons 
    $(".phybtn").click(function (e) {
        e.preventDefault();
        viewdiv = 1
        showdiv()
    });
    $(".chembtn").click(function (e) {
        e.preventDefault();
        viewdiv = 31
        showdiv()
    });
    $(".mathsbtn").click(function (e) {
        e.preventDefault();
        viewdiv = 61
        showdiv()
    });
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
        saveNreview()
    });

    // Clear response
    $(".clearAns").click(function (e) {
        e.preventDefault();
        if ($(".question:nth-child(" + viewdiv + ") input").is(":checked")) {
            $(".question:nth-child(" + viewdiv + ") input").prop("checked", false);
        }
        $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").removeClass("bg-greenblue bg-purple bg-success text-light")
        $(".queNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("bg-deepyellow")
    });

    // review button to mark question
    $(".reviewbtn").click(function (e) {
        e.preventDefault();
        saveNreview()
    });

    // back/next question buttons
    $(".nextbtn").click(function (e) {
        e.preventDefault();
        viewdiv = +viewdiv + 1
        showdiv()
    });

    $(".backbtn").click(function (e) {
        e.preventDefault();
        viewdiv = +viewdiv - 1
        showdiv()
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