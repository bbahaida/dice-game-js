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


//#region EVENT Handling

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
        updateScoreUI('current-',activePlayer,roundScore);
    }else{
        // Next player
        nextPlayer();
        hideDiceImage();
    }
});

// Hold the score event handling
document.querySelector('.btn-hold').addEventListener('click',function(){
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    updateScoreUI('score-',activePlayer, scores[activePlayer]);

    // Check if player won the game
    if(scores[activePlayer] >= 100){
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.getElementById('name-'+activePlayer).textContent = 'WINNER'
        disableBtns();
    }else{
        nextPlayer();
    }

    
});

//#endregion

//#region functions

function init(){

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    updateScoreUI('score-',0,0);
    updateScoreUI('score-',1,0);
    updateScoreUI('current-',0,0);
    updateScoreUI('current-',1,0);

    hideDiceImage();
}

function hideDiceImage(){
    document.querySelector('.dice').style.display = 'none';
}

function updateScoreUI(id,player,score){
    document.getElementById(id+player).textContent = score;
}

function nextPlayer(){
    activePlayer = activePlayer ? 0 : 1;
    roundScore = 0;

    updateScoreUI('current-',0,0);
    updateScoreUI('current-',1,0);

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function disableBtns(){
    document.querySelector('.btn-roll').disabled = true;
    document.querySelector('.btn-hold').disabled = true;
}

//#endregion
