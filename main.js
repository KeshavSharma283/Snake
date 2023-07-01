const gameArea = document.querySelector(".game-area");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controlsElement = document.querySelectorAll(".controls i");
// const snakeProps = document.querySelector(".game-area .snake");



let foodX , foodY;
let snakeX=10 , snakeY=10;
let snakeBody = [];  
let directionX=0 , directionY=0;
let gameOver=false;
let setIntervalId;
let score=0;

let highscore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highscore}`;


const handleGameOver = () => {
    clearInterval(setIntervalId); //necessary to reload using OK in alert //clearing the timer
    alert("GameOver!!! Press OK to restart");
    location.reload();
}

// const leftArrow = document.querySelector(".fa.fa-arrow-left");
// const righttArrow = document.querySelector(".fa.fa-arrow-right");
// const upArrow = document.querySelector(".fa.fa-arrow-up");
// const downArrow = document.querySelector(".fa.fa-arrow-down");

// leftArrow.addEventListener("click",() => {
//     directionX=-1;
//     directionY=0;
// })

// righttArrow.addEventListener("click",() => {
//     directionX=1;
//     directionY=0;
// })

// upArrow.addEventListener("click",() => {
//     directionX=0;
//     directionY=-1;
// })

// downArrow.addEventListener("click",() => {
//     directionX=0;
//     directionY=1;
// })


const changeDirection = (e) => {
    if(e.key === "ArrowUp" && directionY!=1)
    {
        directionX=0;
        directionY=-1;
    }

    else if(e.key === "ArrowRight" && directionX!=-1)
    {
        directionX=1;
        directionY=0;
    }

    else if(e.key === "ArrowDown" && directionY!=-1)
    {
        directionX=0;
        directionY=1;
    }

    else if(e.key === "ArrowLeft" && directionX!=1)
    {
        directionX=-1;
        directionY=0;
    }
    
    initGame();

}   

controlsElement.forEach(key => {
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}));
})

const changeFoodPosition = () =>{
    foodX = Math.floor(Math.random()*30)+1;
    foodY = Math.floor(Math.random()*30)+1;
    return;
}


const initGame = () => {

    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area : ${foodY} / ${foodX}"></div>`;
    
    if(foodX === snakeX && foodY === snakeY)
    {
        changeFoodPosition();
        snakeBody.push([snakeX,snakeY]);

        score++;
        if(score>highscore)
        {
            highscore=score; 
            localStorage.setItem("high-score",highscore);    
            highScoreElement.innerText = `High Score: ${highscore}`;
        }
    
        scoreElement.innerText = `Score: ${score}`;
    }

    if(snakeX>30 || snakeX<0 || snakeY>30 || snakeY<0)
    {
        gameOver=true;
    }

    for(let i=snakeBody.length-1;i>0;i--)
    {
        snakeBody[i]=snakeBody[i-1];
    }

    snakeBody[0]=[snakeX,snakeY];

    snakeX+=directionX;
    snakeY+=directionY;

    for(let i=1;i<snakeBody.length;i++)
    {
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1])
        gameOver=true;
    }
    
    for(let i=0;i<snakeBody.length;i++)
    {
        htmlMarkup += `<div class="snake" style="grid-area : ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; 
    }
    gameArea.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown",changeDirection);





