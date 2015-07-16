/*  
 * Student Info: Name=KrishnaReddy Kalyanam, ID=13778 
 * Subject: CS557B_HW2_Summer_2015 
 * Author: KrishnaReddy 
 * Filename: LogChart.js  
 * Date and Time: Jul 4, 2015 11:50:08 PM  
 * Project Name: WordGameApp  
 */

window.onload = function () {
    var ctx = document.getElementById("myChart").getContext("2d");
    window.myBar = new Chart(ctx).Bar(barChartData, {
        responsive: true,
        showTooltips: true
    });
};

var barChartData = {
    labels: ["No of Games", "Games Won", "Games Lost", "Games Cancelled"],
    datasets: [
        {
            label: getUserName(),
            fillColor: "rgba(220,120,120,0.5)",
            strokeColor: "rgba(220,200,200,0.8)",
            highlightFill: "rgba(220,200,200,0.75)",
            highlightStroke: "rgba(220,200,260,1)",
            data: getPlayersData()
        }
    ]
};

function getUserName() {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    return (user !== null || user !== "undefined") ? (user.username) : "NA";
}
function getPlayersData() {
    var players = JSON.parse(localStorage.getItem('players'));
    var user = JSON.parse(localStorage.getItem("currentUser"));
    var won = 0;
    var lost = 0;
    var cancelled = 0;
    var count = 0;
    var data = [];
    for (var p = 0; p < players.length; p++) {
        console.log("player : " + JSON.stringify(players[p]));
        if (user.username === players[p].name) {
            count++;
            if (players[p].result === "Won") {
                won++;
            } else if (players[p].result === "Lost") {
                lost++;
            } else {
                cancelled++;
            }
        }
    }

    data.push(count);
    data.push(won);
    data.push(lost);
    data.push(cancelled);
    return data;
}

