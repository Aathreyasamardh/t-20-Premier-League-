const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1100;
canvas.height = 500;

let score = 0;
let wickets = 0;
let balls = 0;

let currentLanguage = 0;

const languages = ["english","telugu","hindi"];

const commentary = {
  english:[
    "What a massive six!",
    "Beautiful cover drive!",
    "Excellent timing!",
    "Clean bowled!"
  ],

  telugu:[
    "అద్భుతమైన సిక్స్!",
    "సూపర్ షాట్!",
    "బౌల్డ్ అయ్యాడు!",
    "అద్భుతమైన టైమింగ్!"
  ],

  hindi:[
    "क्या शानदार शॉट!",
    "गज़ब का छक्का!",
    "क्लीन बोल्ड!",
    "शानदार टाइमिंग!"
  ]
};

const ball = {
  x:550,
  y:100,
  radius:10,
  speed:5
};

function drawGround(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Ground
  ctx.fillStyle = "#2e8b57";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // Pitch
  ctx.fillStyle = "#c2b280";
  ctx.fillRect(500,100,100,300);

  // Crease
  ctx.fillStyle = "white";
  ctx.fillRect(545,320,10,80);

  // Circle
  ctx.beginPath();
  ctx.arc(550,250,200,0,Math.PI*2);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.stroke();

  drawBall();
}

function drawBall(){

  ctx.beginPath();
  ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();

}

function animateBall(){

  ball.y += ball.speed;

  if(ball.y > 400){
    ball.y = 100;
  }

  drawGround();

  requestAnimationFrame(animateBall);

}

function playShot(){

  let run = Math.floor(Math.random()*8);

  if(run === 7){

    wickets++;

  }else{

    score += run;

  }

  balls++;

  document.getElementById("score").innerText = score;
  document.getElementById("wickets").innerText = wickets;

  let over = Math.floor(balls/6);
  let ballCount = balls%6;

  document.getElementById("overs").innerText =
  `${over}.${ballCount}`;

  updateCommentary();

  if(balls >= 12){

    setTimeout(()=>{
      alert(`Match Finished!\nScore: ${score}/${wickets}`);
    },300);

  }

}

function updateCommentary(){

  let lang = languages[currentLanguage];

  let lines = commentary[lang];

  let randomLine =
  lines[Math.floor(Math.random()*lines.length)];

  document.getElementById("commentary").innerText =
  randomLine;

}

function changeLanguage(){

  currentLanguage++;

  if(currentLanguage >= languages.length){
    currentLanguage = 0;
  }

  updateCommentary();

}

function startGame(){

  document.getElementById("welcomeScreen").style.display = "none";

}

function showLiveScores(){

  document.getElementById("liveScores").style.display = "block";

}

function showMultiplayer(){

  document.getElementById("multiplayer").style.display = "block";

}

function closePopup(id){

  document.getElementById(id).style.display = "none";

}

function toggleTheme(){

  document.body.classList.toggle("night-mode");

}

drawGround();
animateBall();
