$(function () {
    // alert("I'm ready")
    // Page Logic
    height = $(".header").height();
    $(".mainContainer").css("top", height);
    $(".slider").click(function (e) { 
        e.preventDefault();
        // alert()
        $(".rightSide").toggleClass("sideLength");
    });
    

    // Exam Logic
    viewdiv = 1
    answers = {
        "Question1": "2",
        "Question2": "3",
        "Question3": "4"
    }
    createDivs()
    createQNo()
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
            $(".Questions").append(`<div class="Question">
            <div class="row ml-1 pb-2 w-100" style="border-bottom: 1px solid #25b5e9;color: #333;">
                <div class="w-50 font-weight-bold">Question No: `+index+`</div>
                <div class="w-50 text-right font-weight-bold">Single Choice Type Question</div>
            </div>
            <div class="row w-100 ml-1">
                <img class="QuestionImg" src="assets/images/questions/`+index+`.png" alt="">
                <table class="table table-borderless mt-2">
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
            </div>
        </div>`);
        }
    }

    function createQNo() {
        for(let index = 1; index <= 90; index++) {
            if(index<=9)
            {
                $(".QnOwrapper").append(`<td class="btn Quebtn unseen" data-div="`+index+`">&nbsp;`+index+`</td>`);
            }else{
                $(".QnOwrapper").append(`<td class="btn Quebtn unseen" data-div="`+index+`">`+index+`</td>`);
            }
        }
    }

    function showdiv() {
        $(".Question").css("display", "none");
        $(".Question:nth-child(" + viewdiv + ")").css("display", "block");
        if (!$(".QueNo tbody td.btn:nth-child(" + viewdiv + ")").hasClass("attempted") ||
            !$(".QueNo tbody td.btn:nth-child(" + viewdiv + ")").hasClass("review") || !$(".queNo tbody td.btn:nth-child(" + viewdiv + ")").hasClass("Ansreview")) {
                // alert()
            $(".QueNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("unattempted");
        }
    }

    function saveNreview() {
        if ($(".Question:nth-child(" + viewdiv + ") table tbody td input").is(":checked")) {
            $(".QueNo tbody td.btn:nth-child(" + viewdiv + ")").removeClass("unseen unattempted");
            $(".QueNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("Ansreview");
            viewdiv = +viewdiv + 1
            showdiv()
        } else {
            $(".QueNo tbody td.btn:nth-child(" + viewdiv + ")").removeClass("unseen unattempted");
            $(".QueNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("review");
            viewdiv = +viewdiv + 1
            showdiv()
        }
    }

    // subject selection buttons 
    $(".phybtn").click(function (e) {
        e.preventDefault();
        viewdiv = 1
        $(".btnrow2 .btn").removeClass("active");
        $(this).addClass("active");
        showdiv()
    });
    $(".chembtn").click(function (e) {
        e.preventDefault();
        viewdiv = 31
        $(".btnrow2 .btn").removeClass("active");
        $(this).addClass("active");
        showdiv()
    });
    $(".biobtn").click(function (e) {
        e.preventDefault();
        viewdiv = 61
        $(".btnrow2 .btn").removeClass("active");
        $(this).addClass("active");
        showdiv()
    });
    // Save Answer Button
    $(".saveAnsbtn").click(function (e) {
        e.preventDefault();
        if ($(".Question:nth-child(" + viewdiv + ") table tbody td input").is(":checked")) {
            $(".QueNo tbody td.btn:nth-child(" + viewdiv + ")").removeClass("unattempted");
            $(".QueNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("attempted");
            viewdiv = +viewdiv + 1
            showdiv()
        } else {
            alert("Select answer first to save it")
        }
    });
    // Clear response
    $(".clearAns").click(function (e) {
        e.preventDefault();
        if ($(".Question:nth-child(" + viewdiv + ") input").is(":checked")) {
            $(".Question:nth-child(" + viewdiv + ") input").prop("checked", false);
        }
        $(".QueNo tbody td.btn:nth-child(" + viewdiv + ")").removeClass("unseen attempted unattempted review Ansreview")
        $(".QueNo tbody td.btn:nth-child(" + viewdiv + ")").addClass("unattempted")
    });

    // review button to mark question
    $(".reviewbtn").click(function (e) {
        e.preventDefault();
        saveNreview()
    });

    // Question selection 
    $(".Quebtn").click(function (e) {
        e.preventDefault();
        viewdiv = $(this).attr("data-div");
        if (!$(this).hasClass("attempted")&&!$(this).hasClass("review")&&!$(this).hasClass("Ansreview")) {
            $(this).addClass("unattempted")
            // alert(viewdiv)
        }
        $(".Question").css("display", "none");
        $(".Question:nth-child(" + viewdiv + ")").css("display", "block");
    });

    // Submit the test for result
    // $(".submit").click(function (e) {
    //     e.preventDefault();
    //     data = $(".question input").serialize()
    //     data = data.split("&")
    //     // alert(data)
    //     result = {}
    //     $.each(data, function (index, val) {
    //         question = val.split("=")[0];
    //         answer = val.split("=")[1]
    //         // alert(question+":"+answer)
    //         result["" + question + ""] = "" + answer + "";
    //         // alert(JSON.stringify(result))
    //     });
    // });
});