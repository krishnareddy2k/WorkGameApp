/*  
 * Student Info: Name=KrishnaReddy Kalyanam, ID=13778 
 * Subject: CS557B_HW2_Summer_2015 
 * Author: KrishnaReddy 
 * Filename: game.js  
 * Date and Time: Jul 4, 2015 9:44:04 AM  
 * Project Name: WordGameApp  
 */

var wordList = ["chrome", "jquery", "github", "opera", "email", "cloud", "object", "google",
    "micro", "fruit", "module", "website", "banner", "screen", "mobile",
    "grape", "header", "laptop", "border", "compass", "grunt", "pixel", "choose",
    "smart", "python", "cherry", "light", "banana", "adobe", "apple", "google",
    "orange", "syntax", "flash", "phone", "software", "network", "server", "content",
    "socket", "background", "apache", "query", "proxy", "button"];

var seconds = 180;
var countDownCompleted = false;
var count = 0;
var currentWord = null;
var gameStartDate = null;
var gameEndDate = null;
var gameResult = null;
var currentUser = null;
var dragSrcEl_ = null;
var countdown;
var time;
Array.prototype.shuffle = function () {
    var i = this.length;
    if (i === 0)
        return this;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var a = this[i];
        var b = this[j];
        this[i] = b;
        this[j] = a;
    }
    return this;
};

function startGame() {
    //creating start date and assign to global variable
    var str = new Date().toString();
    count = 0;
    gameStartDate = str.substring(0, str.indexOf(" GMT"));
    //get word randomly and shuffle the characters
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    var word = currentWord.split('').shuffle();
    var remainingLetters = word.length;
    while (remainingLetters > 0) {
        var dropDiv = document.getElementById("dropDiv");
        var dragDiv = document.getElementById("dragDiv");
        for (var i = 0; i < word.length; i++) {
            createDragElements(dragDiv, "drag_" + i, word[i]);
            createDropElements(dropDiv, "drop_" + i);
            remainingLetters--;
        }
    }
    document.getElementById("newGame").disabled = true;
    countdown_init();
}

function clearGame() {
    var myNode1 = document.getElementById("dragDiv");
    while (myNode1.firstChild) {
        myNode1.removeChild(myNode1.firstChild);
    }
    var myNode2 = document.getElementById("dropDiv");
    while (myNode2.firstChild) {
        myNode2.removeChild(myNode2.firstChild);
    }
    document.getElementById("newGame").disabled = false;
    countdown_clear();
}
function quitGame() {
    //creating start date and assign to global variable
    var str = new Date().toString();
    gameEndDate = str.substring(0, str.indexOf(" GMT"));
    gameResult = "Cancelled";
    savePlayer();
    clearGame();
}

function createDragElements(el, id, ch) {
    var letterSpan = document.createElement('span');
    letterSpan.setAttribute('id', id);
    letterSpan.className = "dragPlates";
    letterSpan.setAttribute('draggable', true);
    letterSpan.addEventListener('dragstart', this.handleDragStart, false);
    letterSpan.addEventListener('dragover', this.handleDragOver, false);
    letterSpan.addEventListener('drop', this.handleDrop, false);
    letterSpan.addEventListener('dragend', this.handleDragEnd, false);
    //for touch devices
    letterSpan.addEventListener("touchstart", this.handleDragStart, false);
    letterSpan.addEventListener("touchend", this.handleDragOver, false);
    letterSpan.addEventListener("touchcancel", this.handleDrop, false);
    letterSpan.addEventListener("touchleave", this.handleDragEnd, false);
//    letterSpan.addEventListener("touchmove", this.handleDragStart, false);

    letterSpan.innerHTML = ch;
    el.appendChild(letterSpan);
}

function createDropElements(el, id) {
    var letterSpan = document.createElement('span');
    letterSpan.setAttribute('id', id);
    letterSpan.className = "dropPlates";
    letterSpan.setAttribute('draggable', true);
    letterSpan.addEventListener('dragstart', this.handleDragStart, false);
    letterSpan.addEventListener('dragover', this.handleDragOver, false);
    letterSpan.addEventListener('drop', this.handleDrop, false);
    letterSpan.addEventListener('dragend', this.handleDragEnd, false);
    
    //for touch devices
    letterSpan.addEventListener("touchstart", this.handleDragStart, false);
    letterSpan.addEventListener("touchend", this.handleDragOver, false);
    letterSpan.addEventListener("touchcancel", this.handleDrop, false);
    letterSpan.addEventListener("touchleave", this.handleDragEnd, false);
//    letterSpan.addEventListener("touchmove", this.handleDragStart, false);

    el.appendChild(letterSpan);
}

this.handleDragStart = function (e) {
//    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    dragSrcEl_ = this;
    this.style.opacity = '0.5';
    // this/e.target is the source node.
};
this.handleDragOver = function (e) {
    if (e.preventDefault) {
        e.preventDefault(); // Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
};

this.handleDrop = function (e) {
    // this/e.target is current target element.
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }
    // Don't do anything if we're dropping on the same letterSpan we're dragging.
    if (dragSrcEl_ !== this) {
        dragSrcEl_.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
};

//comparing the word guess word with original whenever an item is being dragged  (on dragEnd event)
this.handleDragEnd = function (e) {
    var guessWord = "";
    var droppedSpans = document.getElementsByClassName('dropPlates');
    loop1:
            if (!countDownCompleted) {
        for (var w = 0; w < droppedSpans.length; w++) {
            if (droppedSpans[w].innerHTML == "" || droppedSpans[w].innerHTML == "undefined") {
                break loop1;//exiting the loop if any of the drop area items contains empty character (hence word not matches with original)
            }
            guessWord += droppedSpans[w].innerHTML;
        }
        if (guessWord === currentWord) {
            alert("You won the game ... word is :" + currentWord);
            var str = new Date().toString();
            gameEndDate = str.substring(0, str.indexOf(" GMT"));
            gameResult = "Won";
            savePlayer();//save the player
            clearGame();//clear the game word and word drop boxes(drag & drop)
            document.getElementById("newGame").disabled = false;
        }
    } else
    {
        if (guessWord !== currentWord) {
            alert("You lost the game ... word is :" + currentWord);
            var str = new Date().toString();
            gameEndDate = str.substring(0, str.indexOf(" GMT"));
            gameResult = "Lost";
            savePlayer();
            clearGame();
        }
    }
};

//constructor for the player infomarion
function Player(name, startDate, endDate, word, result) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.word = word;
    this.result = result;
}

//saving the player info into localStorage
function savePlayer() {
    console.log("saving the player information");
    var player = new Player(currentUser.username, gameStartDate, gameEndDate, currentWord, gameResult);
    var players = JSON.parse(localStorage.getItem('players'));
    if (players === null) {
        players = [];
    }
    players.push(player);
    localStorage.setItem("players", JSON.stringify(players));
    console.log("Players :[ ");
    for (var p = 0; p < players.length; p++) {
        console.log("player : " + JSON.stringify(players[p]));
    }
    console.log(" ]");
}

function countdown_init() {
    time = 180;
    countdown_trigger();
}

function countdown_trigger() {
    var second = time % 60;
    var minute = Math.floor(time / 60) % 60;
    var hour = Math.floor(time / 3600) % 60;

    second = (second < 10) ? '0' + second : second;
    minute = (minute < 10) ? '0' + minute : minute;
    hour = (hour < 10) ? '0' + hour : hour;

    if (time > -1) {
        time--;
        document.getElementById('gameTimer').innerHTML = "Time Left: " + minute + ":" + second + " min";
        if (time > -1) {
            countdown = setTimeout('countdown_trigger()', 1000);
        }
        if (time === 0) {
            countDownCompleted = true;
            handleDragEnd();
        }
    }
}

function countdown_clear() {
    clearTimeout(countdown);
}


