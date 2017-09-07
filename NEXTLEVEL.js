$(document).ready(function () {
    // alert("hello");

    // first category array img 

    var ImgSource = [
        "Images/1.jpg", "Images/2.jpg", "Images/3.jpg", "Images/4.jpg", "Images/5.jpg", "Images/6.jpg",
        "Images/ex2.jpg","Images/ex4.jpeg","Images/k1.jpg", "Images/z1.jpg","Images/z2.png","Images/z3.jpg",];
    ImgSource = ImgSource.concat(ImgSource);

    // second category array img                                                                      
    var ImgSource2 = [
        "Images/7.jpg", "Images/8.jpg", "Images/9.jpg", "Images/10.jpg", "Images/11.jpg", "Images/12.jpg", "Images/z3.jpg",
        "Images/ex8.jpg","Images/ex9.jpg","Images/n1.jpg" ,"Images/z4.jpg", "Images/sz6.jpg","Images/z5.jpg" ];

    ImgSource2 = ImgSource2.concat(ImgSource2);
    
     // third category array img
    var ImgSource3 = [
         "Images/13.jpg", "Images/14.jpg", "Images/15.jpg", "Images/16.jpg", "Images/17.jpg", "Images/18.jpg",
         "Images/ex5.jpg","Images/ex6.png","Images/c1.jpg","Images/z8.jpg", "Images/z9.jpg","Images/z7.jpeg"];
    ImgSource3 = ImgSource3.concat(ImgSource3);

    // forth category array img                                                                               
    var ImgSource4 = [
        "Images/19.jpg", "Images/20.jpg", "Images/21.jpg", "Images/22.jpg", "Images/23.jpg", "Images/24.jpg",
        "Images/ex11.jpg", "Images/ex12.jpg", "Images/ex13.jpg", "Images/z10.jpg", "Images/z11.jpg", "Images/z12.jpg"];
    ImgSource4 = ImgSource4.concat(ImgSource4);                                                              



    /*=============================================================*/

    /**
     * Randomize array element .
    
     */
    function ShuffleArray(array) {
        for (var i = 0 ; i < array.length ; i++) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    /**
     * load function
     * 
     */
    function LoadImages(whichArray) {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 4; j++) {
                $('#b' + i + j)
                    .children('img')
                    .attr('src', whichArray[i * 3 + j + i])
                    .click(function () {
                        if (counter == 0) {
                            if ($(this).css('border').indexOf("rgb(255, 255, 255)") >= 0)
                                $(this).css("border", "solid 2px red");
                            else
                                $(this).css("border", "solid 2px white");

                            CheckImages();
                        }
                    });
            }
        }
    }

    /******************************************************* HIDE IMAGES *******************************************/

    function HideImages() {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 4; j++) {
                $('#b' + i + j).children('img').removeAttr('src');


            }
        }
        countdown(1);


    }
    /**************************************************************************************************/

    function UnCheckAllImages() {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 4; j++) {
                $('#b' + i + j).children('img').css("border", "solid 2px red");
            }
        }
    }
    /****************** CHECK IMAGES ********************************************************************************/

    function CheckImages() {
        var checkedElements = [];
        var checkedIndex = [];
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 4; j++) {
                var index = $('#b' + i + j).children('img').css('border').indexOf("rgb(255, 255, 255)"); //border white
                if (index >= 0) {
                    checkedElements.push($('#b' + i + j).children('img'));

                    checkedIndex.push(whichArray[i * 3 + j + i]);
                }

            }
        }

        if (checkedIndex.length == 2) {
            var firstElement = checkedIndex[0];
            var secondElement = checkedIndex[1];

            if (firstElement == secondElement) {
                checkedElements[0].attr('src', firstElement);
                checkedElements[0].unbind('click');
                checkedElements[1].attr('src', secondElement);
                checkedElements[1].unbind('click');

                CheckIfWin();

            }
            else {
                
                window.setTimeout(function () {
                    checkedElements[0].attr('src', firstElement);
                    checkedElements[1].attr('src', secondElement);

                    window.setTimeout(function () {
                        checkedElements[0].removeAttr('src');
                        checkedElements[1].removeAttr('src');
                        UnCheckAllImages();
                    }, 1000);
                }, 250);
            }





            window.setTimeout(function () {
                UnCheckAllImages();
            }, 250);
        }

       
    }
    /*************** CHECK IF WIN ***********************************************************************************/

    function CheckIfWin() {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 4; j++) {
                if (!$('#b' + i + j).children('img').attr('src')) {
                    return;
                }
            }
        }

        clearTimeout(x);
       
       
        $("#winText").append("<span>Congratulations, You win!</span><span id='continue' >Do you Want to play Next Level</span><p><input id='nextLevel' type='button' value='Next Level' /><input id='main' type='button' value='Main'/></p>");

        $("#main").click(function () {


            window.location.href = 'NEXTINDEX.html';
        });
        $("#nextLevel").click(function () {


              window.location.href = 'NextLEVEL2.html';
        });

    }


    /*=============================================================*/


    /*=============================================================*/


    var counter = 11;
    var whichArray = null;
    var whichOne = localStorage.getItem("whichOne");
    var personName = localStorage.getItem("personName");

    $('#welcomeText').text('Welcome , Lets Play the Game!');

    if (whichOne == 1) whichArray = ShuffleArray(ImgSource);
    else if (whichOne == 2) whichArray = ShuffleArray(ImgSource2);
    else if (whichOne == 3) whichArray = ShuffleArray(ImgSource3);
    else if (whichOne == 4) whichArray = ShuffleArray(ImgSource4);

    if (whichArray == null)
        $('#startGame').attr("disabled", true);


    $('#startGame').click(function () {


        var interval = setInterval(function () {
            counter--;
            $('#timer').text(counter + ' Seconds Remains!');
            if (counter == 0) {
                clearInterval(interval);
               
                HideImages();

            }
        }, 1000);
        $(this).attr("disabled", true);
        
        LoadImages(whichArray);

    });

    /****************************** COUNTER ********************************************************************/
    function countdown(minutes) {
        var seconds = 60;
        var mins = minutes
        function tick() {

            var counter = document.getElementById("timer");
            var current_minutes = mins - 1
            seconds--;
            counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);




            x = setTimeout(tick, 1000);
            if (seconds > 0) {

                x;
            }
            else {
                if (mins > 1) {
                    countdown(mins - 1);
                }
            }

            if (seconds == 0) {
                clearTimeout(x);

                $("#winText").append("<span></span>Sorry , You lose!<span id='continue' >Do you Want to play again</span><p><input id='again' type='button' value='Again' /><input id='main' type='button' value='Main'/></p>");

                $("#main").click(function () {


                    window.location.href = 'NEXTINDEX.html';
                });
                $("#again").click(function () {


                    window.location.href = 'NEXTLEVEL.html';
                });
            }
        }
        tick();
    }





});
