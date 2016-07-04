$(document).ready(function(){
    var generatedSequence = []; // initiated by user
    var count = 0;  
    var initialSequence = []; // initiated by computer
    var initialSequenceCopy = [];
    var game;
    var strictmode = false;
    var highScore = 0;
    var buttonaudio1 = new Howl({
        urls:['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3?callback=?']
    });
    var buttonaudio2 = new Howl({
        urls:['https://s3.amazonaws.com/freecodecamp/simonSound2.mp3?callback=?']
    });
    var buttonaudio3 = new Howl({
        urls:['https://s3.amazonaws.com/freecodecamp/simonSound3.mp3?callback=?']
    });
    var buttonaudio4 = new Howl({
        urls:['https://s3.amazonaws.com/freecodecamp/simonSound4.mp3?callback=?']
    });
    var gameover = new Howl({
        urls:['https://0.s3.envato.com/files/141341277/preview.mp3?callback=?']
    });
    function soundandlighteffects(buttonValue,time){
        switch(buttonValue){
            case "1":
                buttonaudio1.play();
                $("#top-left").addClass("light");
                window.setTimeout(function(){
                    $("#top-left").removeClass("light");
                },time);
                break;
            case "2":
                buttonaudio2.play();
                $("#top-right").addClass("light");
                window.setTimeout(function(){
                    $("#top-right").removeClass("light");
                },time);
                break;
            case "3":
                buttonaudio3.play();
                $("#bottom-right").addClass("light");
                window.setTimeout(function(){
                    $("#bottom-right").removeClass("light");
                },time);
                break;
            case "4":
                buttonaudio4.play();
                $("#bottom-left").addClass("light");
                window.setTimeout(function(){
                    $("#bottom-left").removeClass("light");
                },time);
                break;
        }
    };
    function displaySequence(sequence){
        $(".game-buttons").prop("disabled",true);
        var i =0;
        var interval = setInterval(function() {
            soundandlighteffects(sequence[i].toString(),800);
            i++;
            if (i >= sequence.length) {
                $(".game-buttons").prop("disabled",false);
                clearInterval(interval);
            }
        }, 900);
    };
    function makeSequence(){
        initialSequence = [].concat(initialSequenceCopy);
        initialSequence.push(Math.ceil(Math.random()*4));
        initialSequenceCopy = initialSequence.slice();
        displaySequence(initialSequenceCopy);

    };
    function displayScore(number){
        $("#currentScore").html("Score: " + number);
        if(number> highScore){
            $("#highScore").html(number);
        }
        if(number >= 20){
            restartGame();

        }
    }
    function checkSequence(value){
        if(value == initialSequence[0]){
            soundandlighteffects(value,300);
            initialSequence.shift();
            if(initialSequence.length === 0){
                count += 1;
                setTimeout(makeSequence(),1000);
            }
        }
        else{
            gameover.play();
            if(strictmode === true){
                game = false;
                initialSequence = [];
                initialSequenceCopy = [];
                count = 0;
            }
            else{
                initialSequence = [].concat(initialSequenceCopy);
                displaySequence(initialSequenceCopy);
            }
        }
        displayScore(count);
    };
    function restartGame(){
        initialSequenceCopy = [];
        initialSequence= [];
        count = 0;
        displayScore(count);
        makeSequence();

    };
    $(".game-buttons").click(function(){
        if(game === true){
            checkSequence(this.value);
        }
    });
    $("#startgameToggle").click(function(){
        game = true;
        makeSequence();
        $("#startgameToggle").addClass("hidden");
    });
    $("#restartgameToggle").click(function(){
        game = true;
        restartGame();
    });
    $("#strictmodeToggle").click(function(){
        switch(strictmode){
            case true:
                strictmode = false;
                $("#strictmodeToggle").removeClass("btn-success");
                $("#strictmodeToggle").addClass("btn-default");
                break;
            case false:
                strictmode = true;
                $("#strictmodeToggle").removeClass("btn-default");
                $("#strictmodeToggle").addClass("btn-success");
                break;
        }
    })
});