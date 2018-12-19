var clickNumber = 0;
var signs = ["O", "X"];
var winCombinations = ["123", "147", "159", "258", "357", "369", "456", "789"];
var firstPlayer = {
    name: "First Player",
    choices: [],
    sign: 0
    };

var secondPlayer = {
    name: "Second Player",
    choices: [],
    get sign(){ return 1 - firstPlayer.sign;},
    };

var game = {
    won:false, 
    pattern:null,
    lastTurn: null,
    nextTurn: null,
    };

function clicked(boxid) {
    if(game.won){return;}
    if (document.getElementById(boxid).innerHTML!="") {return;}
    clickNumber++;
    updateTurns();
    game.lastTurn.choices.push(boxid);
    document.getElementById(boxid).innerHTML=signs[game.lastTurn.sign];
    updateGameStatus();
    if (game.won) {
        gameStatus="WON";
        document.getElementById("gameStatus").innerHTML=game.lastTurn.name+" WON";
        var boxes = game.pattern.split("");
        for(var i = 0; i<boxes.length;i++) {
            document.getElementById(boxes[i]).style.background="grey";
        }
        
        
    }
    else if(clickNumber==9) {document.getElementById("gameStatus").innerHTML="Game Draw";}
    else {document.getElementById("gameStatus").innerHTML="<table><tr><td>Last move by:</td><td>"+game.lastTurn.name+"</td></tr><tr><td> Next turn is of:</td><td>"+game.nextTurn.name+"</td></tr></table>";}
}

function updateGameStatus() {
    var player=game.lastTurn;
    if(player.choices.length<3){return;}
    
    for(var i=0; i<winCombinations.length; i++){
        var matchfound =0;
        for(var j=0; j<player.choices.length; j++){
            if(winCombinations[i].indexOf(player.choices[j])!=-1){matchfound++}
        }
        if (matchfound>2){game.won=true, game.pattern=winCombinations[i]; return;}
    }
    
    return;
}


function updateTurns(){
     if (clickNumber%2==1) {
         game.lastTurn= firstPlayer;
         game.nextTurn= secondPlayer;
    }
    else {
        game.lastTurn = secondPlayer;
        game.nextTurn= firstPlayer;
        
    }
}
window.onload = function(){
    document.getElementById("setting").onclick = function(){
        document.getElementById("setting-div").className="show";
    };
    
    document.getElementById("cancel").onclick = function(){ 
       document.getElementById("myDIV").style.animation
        document.getElementById("setting-div").className="hide";
    };
    
    document.getElementById("save").onclick = function() { 
        //gets value of first name field and updates the name if the field is not blank
       var firstPlayerName= document.getElementById("firstPlayer").value;
        if(firstPlayerName!="") firstPlayer.name=firstPlayerName;
       //gets value of second name field and updates the name if the field is not blank 
      var secondPlayerName= document.getElementById("secondPlayer").value;
        if(secondPlayerName!="") secondPlayer.name=secondPlayerName;
        //updates the value of first players sign;
        firstPlayer.sign= document.getElementById("firstplayersign").value;
        
        document.getElementById("setting-div").className="hide";
    };
    
    document.getElementById("reload").onclick = function(){
        clickNumber = 0;
        game.won = false;
        game.pattern = null;
        firstPlayer.choices = [];
        secondPlayer.choices = [];
        document.getElementById("gameStatus").innerHTML="Game reloaded";
        for(var i = 1; i<=9; i++){
            document.getElementById(i).innerHTML="";
            document.getElementById(i).style.background="pink";
        }
    };
    
};
