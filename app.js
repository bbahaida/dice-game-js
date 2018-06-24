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

const scoreTag = 'score';
const currentTag = 'current';
const nameTag = 'name';
const prefixPlayerPanelTag = 'player';
const sefixPlayerPanelTag = 'panel';
const scoreInputTag = 'final-score';

var scores, roundScore, prevDice, activePlayer, winningScore, changeScoreAllowed;

init();


//#region EVENT Handling

// Roll the dice event handling
document.querySelector('.btn-roll').addEventListener('click',function(){

    // 1. Random number
    if(changeScoreAllowed){
        if(!confirm('you want to perceed the game with the winning score = '+winningScore+'?')){
            return;
        }
        document.getElementById(scoreInputTag).value = winningScore;
        changeScoreAllowed = false;
    }
    var dice = Math.floor(Math.random() *6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';

    // 3. Update the score IF the rolled number was NOT 1 
    if(dice === 6 && prevDice[activePlayer] === 6){
        // Player looses score
        roundScore = 0;
        scores[activePlayer] = 0;
        updateUI(scoreTag,activePlayer,0);
        nextPlayer();
        hideDiceImage();
    }else if(dice !== 1){
        // Add score
        roundScore += dice;
        prevDice[activePlayer] = dice;
        updateUI(currentTag,activePlayer,roundScore);
    }else{
        // Next player
        nextPlayer();
        hideDiceImage();
    }
});

// Hold the score event handling
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(!changeScoreAllowed){
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        updateUI(scoreTag,activePlayer, scores[activePlayer]);

        // Check if player won the game
        if(scores[activePlayer] >= winningScore){

            addClass(prefixPlayerPanelTag+'-'+activePlayer+'-'+sefixPlayerPanelTag,'winner');
            removeClass(prefixPlayerPanelTag+'-'+activePlayer+'-'+sefixPlayerPanelTag,'active');

            updateUI(nameTag,activePlayer,'WINNER');
            
            disableBtns(true);
        }else{
            nextPlayer();
        }
    }  
});

// New game event handling
document.querySelector('.btn-new').addEventListener('click',function(){
    if(confirm('You want to play a new game?')){
        init();
    }
});

document.querySelector('.btn-score').addEventListener('click',function(){
    if(changeScoreAllowed){
        var score = Number(document.getElementById(scoreInputTag).value).valueOf();
        if(typeof score !== 'number' || isNaN(score)){
            alert('impossible');
        }else if(score<=0){
            alert('score must be > 0');
        }
        else if(confirm('You want to set score to '+score+'?')){
            winningScore = score;
            changeScoreAllowed = false;
        }
        
    }
});

//#endregion


//#region functions

function init(){

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    prevDice = [0,0];
    winningScore = 100;
    changeScoreAllowed = true;


    document.getElementById(scoreInputTag).value = '';

    updateUI(scoreTag,0,0);
    updateUI(scoreTag,1,0);
    updateUI(currentTag,0,0);
    updateUI(currentTag,1,0);

    hideDiceImage();
    disableBtns(false);

    removeClass(prefixPlayerPanelTag+'-0-'+sefixPlayerPanelTag,'winner');
    removeClass(prefixPlayerPanelTag+'-1-'+sefixPlayerPanelTag,'winner');

    removeClass(prefixPlayerPanelTag+'-0-'+sefixPlayerPanelTag,'active');
    removeClass(prefixPlayerPanelTag+'-1-'+sefixPlayerPanelTag,'active');

    addClass(prefixPlayerPanelTag+'-0-'+sefixPlayerPanelTag,'active');

    //var player_1 = prompt('player 1 name ? ');
    //var player_2 = prompt('player 2 name ? ');
    var player_1 = 'Player 1'
    var player_2 = 'Player 2'

    //player_1 = player_1 ? player_1 : 'Player 1'; 
    //player_2 = player_2 ? player_2 : 'Player 2'; 

    updateUI(nameTag,0,player_1);
    updateUI(nameTag,1,player_2);

}

function hideDiceImage(){
    document.querySelector('.dice').style.display = 'none';
}

function updateUI(element,id,data){
    document.getElementById(element+'-'+id).textContent = data;
}

function nextPlayer(){
    activePlayer = activePlayer ? 0 : 1;
    roundScore = 0;
    prevDice = [0,0];
    updateUI(currentTag,0,0);
    updateUI(currentTag,1,0);

    toggleClass(prefixPlayerPanelTag+'-0-'+sefixPlayerPanelTag,'active');
    toggleClass(prefixPlayerPanelTag+'-1-'+sefixPlayerPanelTag,'active');
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
