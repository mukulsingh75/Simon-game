let gameSeq = [];
let userSeq = [];

let btns = ["pink","purple","green","yellow"];
let highestScore = 0;

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

let h3 = document.querySelector('h3');


document.addEventListener('keypress',function(){
    if(started===false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);
};

function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    },250);
};

function levelUp(){

    userSeq=[];
    level++;
    highestScore = Math.max(highestScore,level);
    h2.innerText = `Level ${level}`;


    //random button choose
    let ranIdx = Math.floor(Math.random()*3);
    let ranCol = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranCol}`);
    gameSeq.push(ranCol);
    console.log("gameSeq",gameSeq);

    //btn flash
    gameFlash(ranBtn);
};

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = "white";
        },250);
        resetGame();
    }
};

function buttonPress(){
    let btn = this;   //store which button is pressed
    userFlash(btn);
    let col = btn.getAttribute('id');
    userSeq.push(col);
    console.log("userSeq: ",userSeq);

    checkAns(userSeq.length-1);
};

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener('click',buttonPress);
};

function resetGame(){
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
    displayHigh();
};

function displayHigh(){
    h3.innerText = `Highest score ${highestScore}`;
}

// Game completes //