/*  
 * Student Info: Name=KrishnaReddy Kalyanam, ID=13778 
 * Subject: CS557B_HW2_Summer_2015 
 * Author: KrishnaReddy 
 * Filename: logs.js.js  
 * Date and Time: Jul 4, 2015 5:45:19 PM  
 * Project Name: WordGameApp  
 */


function displayLogs() {
    var players = JSON.parse(localStorage.getItem('players'));
    for (var p = 0; p < players.length; p++) {
        console.log("player : " + JSON.stringify(players[p]));
        var tableBody = document.getElementById('logsTbody');
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
        
        //player name column
        var nameTd = document.createElement('TD');
        nameTd.width = '75';
        nameTd.appendChild(document.createTextNode(players[p].name));
        tr.appendChild(nameTd);
        //game startDate column
        var sdateTd = document.createElement('TD');
        sdateTd.width = '75';
        sdateTd.appendChild(document.createTextNode(players[p].startDate));
        tr.appendChild(sdateTd);
        //game endDate column
        var edateTd = document.createElement('TD');
        edateTd.width = '75';
        edateTd.appendChild(document.createTextNode(players[p].endDate));
        tr.appendChild(edateTd);
        //word name column
        var wordTd = document.createElement('TD');
        wordTd.width = '75';
        wordTd.appendChild(document.createTextNode(players[p].word));
        tr.appendChild(wordTd);
        //result column
        var resultTd = document.createElement('TD');
        resultTd.width = '75';
        resultTd.appendChild(document.createTextNode(players[p].result));
        tr.appendChild(resultTd);
    }
}
