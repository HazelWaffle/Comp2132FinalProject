/**
 * various jquery and javascript selectors 
 */
const delayslide = 100;
const delay      = 500;
var $popup       = $(".popup");
var $popup1      = $(".popup1");
var $show        = $("#placeholder");
let $startRound  = $("#start");
let $waffledice1 = $("#wafflesdice1");
let $waffledice2 = $("#wafflesdice2");
let $hazeldice1  = $("#hazeldice1");
let $hazeldice2  = $("#hazeldice2");
let $poppic      = $("#poppic");
let $popupmsg    = $("#popupmsg");
let $popupline1  = $("#popupline1");
let $popupline2  = $("#popupline2");
let $wobbler     = $(".wobbler");
let $wobblestop  = $(".wobbleractive");

let $usertotal      = $("#usertotal");
let $opponenttotal  = $("#opponenttotal");
let $userround      = $("#userround");
let $opponentround  = $("#opponentround");
let timedelay;


const start1       = document.getElementById("start");
const reset        = document.getElementById("reset");
const gameInfo     = document.getElementById("gameinfo");
const closed1      = document.getElementById("close");
const reset1       = document.getElementById("reset1");

const initialScore = 0;
const totalRounds  = 3;
let roundNumber = 1;
const diceFaces = [1,2,3,4,5,6];

let totalScoreHazel   = 0;
let totalScoreWaffles = 0;
let $dieSumPlayer = $(".player1");
let $dieSumCat    = $(".player2");

/**
 * Custom Player object that keeps track of user name,player score, validates username. Contains getters for use in functions below.
 */
class Player
{
    constructor(userName, scoreTotal)
    {
        if(userName.length > initialScore)
        {
            this.userName = userName;
        }
        
        scoreTotal = 0;
        this.scoreTotal = scoreTotal;
       
        let firstDie = 1;
        let secondDie = 1;
        
        this.first = firstDie;
        this.second = secondDie;

    } 
  
    addToScore = function(scoreToAdd)
    {
        this.scoreTotal += scoreToAdd;
    }
    
    /**
     * Class method that rolls and modifies dice images, userscore, displays.
     */
    rollDice = function()
    {
        let face1 = diceFaces[Math.floor(Math.random() * diceFaces.length)];
        let face2 = diceFaces[Math.floor(Math.random() * diceFaces.length)];
        this.first  = face1;
        this.second = face2;
        let scoreToAdd = 0;
        
        if(face1 == 1
            || face2 == 1)
        {
            
            this.scoreTotal += scoreToAdd;
            if(this.userName == "Waffles")
                {
                    $userround.text(`Your score for round ${roundNumber} is ${scoreToAdd}`);
                }
                else if(this.userName == "Hazel")
                {
                    $opponentround.text(`Your score for round ${roundNumber} is ${scoreToAdd}`);
                }
        }
        else
        {
            if(face1 == face2)
            {
                

                scoreToAdd += 2*(face1 + face2);
                this.scoreTotal += scoreToAdd;
                if(this.userName == "Waffles")
                {
                    $userround.text(`Your score for round ${roundNumber} is ${scoreToAdd}`);
                }
                else if(this.userName == "Hazel")
                {
                    $opponentround.text(`Your score for round ${roundNumber} is ${scoreToAdd}`);
                }
            }
            else if(face1 != face2)
            {
               
                scoreToAdd += (face1 + face2);
                this.scoreTotal += scoreToAdd;
                if(this.userName == "Waffles")
                {
                    $userround.text(`Your score for round ${roundNumber} is ${scoreToAdd}`);
                }
                else if(this.userName == "Hazel")
                {
                    $opponentround.text(`Your score for round ${roundNumber}  is ${scoreToAdd}`);
                }
            }
        }
    }
  
    /**
     * gets user score
     */
    get getScore()
    {
        return this.scoreTotal;
    }

    /**
     * gets first dice
     */
    get getFirst()
    {
        return this.first;
    }

    /**
     * gets second dice
     */
    get getSecond()
    {
        return this.second;
    }

    /**
     * unusued score-setter, was used for testing conditions.
     * @param {*} newScore - score to set 
     */
    setScore(newScore)
    {
        if (newScore > initialScore) {
            this.scoreTotal = newScore;
        }
    }

}

/**
 * the two players, Waffles and Hazel. Set with playerNames and initial scores of 0. 
 */
const playerHazel   = new Player("Hazel", initialScore);
const playerWaffles = new Player("Waffles", initialScore);

/**
 * Function that is run when "Start" button is clicked. Checks for round number, wobbles and stops wobbling the dice after a delay,
 * present round score, user total score. When round number reaches 3, executes same iteration once, disables start button (!), displays popup
 * reflective of victory or defeat.  
 * @returns - a variety of implementations.
 */
function PlayRoundOnButtonClick() {
    if(roundNumber < totalRounds)
    {
       
        console.log($wobbler);
        $wobbler.addClass("wobbleractive");
        console.log($wobbler);
        
        playerHazel.rollDice();
        playerWaffles.rollDice();
        // console.log(playerHazel.getScore);
        // console.log(playerWaffles.getScore);
        

        $waffledice1.prop("src", `gallery/dice-six-faces-${playerWaffles.getFirst}.png`);
        $waffledice2.prop("src", `gallery/dice-six-faces-${playerWaffles.getSecond}.png`);
        $hazeldice1.prop("src", `gallery/dice-six-faces-${playerHazel.getFirst}.png`);
        $hazeldice2.prop("src", `gallery/dice-six-faces-${playerHazel.getSecond}.png`);

        

        $usertotal.text(`Your total score is: ${playerWaffles.getScore}`);
        $opponenttotal.text(`Your total score is: ${playerHazel.getScore}`);
        setTimeout(function()
        {
            $wobbler.removeClass("wobbleractive");
        }, delay);
        roundNumber ++;
    }
    else
    {
        $wobbler.addClass("wobbleractive");
        playerHazel.rollDice();
        playerWaffles.rollDice();
        // console.log(playerHazel.getScore);
        // console.log(playerWaffles.getScore);
        

        $waffledice1.prop("src", `gallery/dice-six-faces-${playerWaffles.getFirst}.png`);
        $waffledice2.prop("src", `gallery/dice-six-faces-${playerWaffles.getSecond}.png`);
        $hazeldice1.prop("src", `gallery/dice-six-faces-${playerHazel.getFirst}.png`);
        $hazeldice2.prop("src", `gallery/dice-six-faces-${playerHazel.getSecond}.png`);

        

        $usertotal.text(`Your total score is: ${playerWaffles.getScore}`);
        $opponenttotal.text(`Your total score is: ${playerHazel.getScore}`);
        setTimeout(function()
        {
            $wobbler.removeClass("wobbleractive");
        }, delay);
        totalScoreHazel   = playerHazel.getScore;
        totalScoreWaffles = playerWaffles.getScore;
        start1.innerText = "Game complete!";
        start1.disabled = true;
        
        if(totalScoreHazel > totalScoreWaffles)
        {
            console.log("you lose..");
            $popupmsg.text("A Deathly Pall");
            $popupline1.text("You watch wordlessly as your demesne is pillaged by the invader")
            winningPopUp("defeat");
            closed1.innerText = "Defeat...";
            $popup.css("background-color", "darkred");
            reset1.style.visibility = "visible";
            return $popupline2.text("Warmth has fled these lands..");
        }        
        else if (totalScoreHazel == totalScoreWaffles)
        {
            console.log("the struggle continues");
            $popupmsg.text("Help!");
            $popupline1.text("There is no justice in this world...");
            winningPopUp("draw");
            $popup.css("background-color", "black");
            closed1.innerText = "Draw";
            reset1.style.visibility = "visible";
            return $popupline2.text("The light of hope is dim indeed.");
        }
        else
        {
            console.log("triumph!");
            $popupmsg.text("All is Right in the World Again.");
            $popupline1.text("You have overcome the menace, for now...");
            winningPopUp("victory");
            $popup.css("background-color", "darkgreen");
            closed1.innerText = "Victory";
            reset1.style.visibility = "visible";
            return $popupline2.text("A moment of respite");
        }
    }
}

// function wobbleDice()
// {
//     wobbler.forEach(function(dice)
//     {
//         dice.classList.add("wobble");
//     });
//     // setTimeout(function()
//     // {
//     //     $wobbler.classList.remove(".rolldice");
//     // }, 1500);
// }

start1.addEventListener("click", PlayRoundOnButtonClick);


/**
 * Somewhat poorly named function to handle changes to the pop-up upon winning, losing, or drawing. 
 * @param condition - win, lose, draw, etc. 
 */
function winningPopUp(condition)
{
    $poppic.prop("src", `gallery/${condition}.jpg`);    
    $show.toggle("show");
    $popup.prop("display", "block");
    
}


/**
 * closes popup.
 */
closed1.addEventListener("click", function()
{
    $show.toggle("placeholder");
    $popup.prop("display", "none");
    
});

/**
 * resets game from popup
 */
reset1.addEventListener("click", function()
{
    $show.toggle("placeholder");
    $popup.prop("display", "none");
    playerHazel.setScore(initialScore);
    playerWaffles.setScore(initialScore);
    totalScoreHazel = 0;
    totalScoreWaffles = 0;
    roundNumber = 1;
    $userround.text("");
    $opponentround.text("");
    start1.innerText = "Start";
    start1.disabled = false;
    closed1.innerText = "Close";
    
    $opponenttotal.text(" ");
    $usertotal.text(" ");
    $waffledice1.prop("src", `gallery/dice-six-faces-${roundNumber}.png`);
    $waffledice2.prop("src", `gallery/dice-six-faces-${roundNumber}.png`);
    $hazeldice1.prop("src", `gallery/dice-six-faces-${roundNumber}.png`);
    $hazeldice2.prop("src", `gallery/dice-six-faces-${roundNumber}.png`);
});

/**
 * resets game on main site
 */
reset.addEventListener("click", function()
{
    
    playerHazel.setScore(initialScore);
    playerWaffles.setScore(initialScore);
    totalScoreHazel = 0;
    totalScoreWaffles = 0;
    roundNumber = 1;
    $userround.text("");
    $opponentround.text("");
    start1.innerText = "Start";
    start1.disabled = false;
    closed1.innerText = "Close";
    $popup.prop("display", "none");
    $opponenttotal.text(" ");
    $usertotal.text(" ");
    $waffledice1.prop("src", `gallery/dice-six-faces-${roundNumber}.png`);
    $waffledice2.prop("src", `gallery/dice-six-faces-${roundNumber}.png`);
    $hazeldice1.prop("src", `gallery/dice-six-faces-${roundNumber}.png`);
    $hazeldice2.prop("src", `gallery/dice-six-faces-${roundNumber}.png`);

   
});


closed1.addEventListener("click", function()
{
   
    $popup.prop("display", "none");
});


/**
 * Displays generic popup
 */
gameInfo.addEventListener("click", function()
    {
        $popupmsg.text("You are Waffles, and this is your house.");
        $popupline1.text("Or at least, it used to be until this beast showed up.")
        $poppic.prop("src", `gallery/PawAllen.jpg`); 
        $popupline2.text("Today is a nice sunny day, but between you and your favourite sunbeam stands the horrible Hazel." + "\n" + "Out-roll the beastie to reclaim your spot!" + "\n" + "Rules : Two dice are rolled, and their sums are added provided neither shows a 1. If two dice show the same value, multiply their sum by 2!");
        reset1.style.visibility = "hidden";
        closed1.innerText = "Close";
        $popup.css("background-color", "black") 
        $show.toggle("show");
        $popup.prop("display", "block");
    }
);





