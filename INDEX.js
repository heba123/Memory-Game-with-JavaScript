$(document).ready(function () {

    $("#startbtn").attr("disabled", true);

    $("#td1").click(function () {
        localStorage.setItem("whichOne", 1);
        $("#startbtn").removeAttr("disabled");

    });

    $("#td2").click(function () {
        localStorage.setItem("whichOne", 2);
        $("#startbtn").removeAttr("disabled");

    });

    $("#td3").click(function () {
        localStorage.setItem("whichOne", 3);
        $("#startbtn").removeAttr("disabled");

    });

    $("#td4").click(function () {
        localStorage.setItem("whichOne", 4);
        $("#startbtn").removeAttr("disabled");

    });

    $("#startbtn").click(function () {
        localStorage.setItem("personName", $('#playerName').val());
        window.location.href = 'GAME.html';
    });

});
