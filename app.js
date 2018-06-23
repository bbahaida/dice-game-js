/*
Author: Brahim Bahaida
Version: 1.0

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer;

init();


// Roll the dice event handling
document.querySelector('.btn-roll').addEventListener('click',function(){
    // 1. Random number
    var dice = Math.floor(Math.random() *6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';

    // 3. Update the score IF the rolled number was NOT 1 
    if(dice !== 1){
        // Add score
        roundScore += dice;
        document.getElementById('current-'+activePlayer).textContent = roundScore;
    }else{
        // Next player
        
        activePlayer = activePlayer ? 0 : 1;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        hideDice();
    }
});


//#region functions

function init(){

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    hideDice();
}

function hideDice(){
    document.querySelector('.dice').style.display = 'none';
}

//#endregion
