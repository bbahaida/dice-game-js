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


var scores, roundScore, activePlayer, winningScore;

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
        updateUI('current-',activePlayer,roundScore);
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
    updateUI('score-',activePlayer, scores[activePlayer]);

    // Check if player won the game
    if(scores[activePlayer] >= winningScore){

        addClass('player-'+activePlayer+'-panel','winner');
        removeClass('player-'+activePlayer+'-panel','active');

        updateUI('name-',activePlayer,'WINNER');
        
        disableBtns(true);
    }else{
        nextPlayer();
    }

    
});

// New game event handling
document.querySelector('.btn-new').addEventListener('click',function(){
    if(confirm('You want to play a new game?')){
        init();
    }
});

//#endregion


//#region functions

function init(){

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    winningScore = 100;

    updateUI('score-',0,0);
    updateUI('score-',1,0);
    updateUI('current-',0,0);
    updateUI('current-',1,0);

    hideDiceImage();
    disableBtns(false);

    removeClass('player-0-panel','winner');
    removeClass('player-1-panel','winner');

    removeClass('player-0-panel','active');
    removeClass('player-1-panel','active');

    addClass('player-0-panel','active');

    var player_1 = prompt('player 1 name ? ');
    var player_2 = prompt('player 2 name ? ');

    player_1 = player_1 !== '' ? player_1 : 'Player 1'; 
    player_2 = player_2 !== '' ? player_2 : 'Player 2'; 

    updateUI('name-',0,player_1);
    updateUI('name-',1,player_2);

}

function hideDiceImage(){
    document.querySelector('.dice').style.display = 'none';
}

function updateUI(element,id,data){
    document.getElementById(element+id).textContent = data;
}

function nextPlayer(){
    activePlayer = activePlayer ? 0 : 1;
    roundScore = 0;
    updateUI('current-',0,0);
    updateUI('current-',1,0);

    toggleClass('player-0-panel','active');
    toggleClass('player-1-panel','active');
}

function disableBtns(bool){
    document.querySelector('.btn-roll').disabled = Boolean(bool);
    document.querySelector('.btn-hold').disabled = Boolean(bool);
}

function addClass(htmlElementClass,cssClass){
    document.querySelector('.'+htmlElementClass).classList.add(cssClass);
}
function removeClass(htmlElementClass,cssClass){
    document.querySelector('.'+htmlElementClass).classList.remove(cssClass);
}
function toggleClass(htmlElementClass,cssClass){
    document.querySelector('.'+htmlElementClass).classList.toggle(cssClass);
}

//#endregion
