document.addEventListener("DOMContentLoaded",()=>{
    var width = screen.width;
var height = screen.height;

let startaudio=new Audio('gamestart.mp3');
let stopaudio=new Audio('gameover.mp3');

setTimeout(() => {
    startaudio.play();
}, 1000);

let isMobile = window.matchMedia("only screen and (max-width: 700px)").matches;
if(isMobile)
{
     character_width=0.12*height;
    character_height=0.18*height;
}
else
{
    character_width=0.3*height;
    character_height=0.4*height;
}


//for mobile devices
function process_touchstart(e) {
    let userelement = document.getElementsByClassName("user")[0];
    userelement.classList.add("jumpuser");
    setTimeout(() => {
        userelement.classList.remove("jumpuser");
    }, 800);
}
document.addEventListener("touchstart", process_touchstart, false);

let score=0;


//for computers
document.onkeydown = function (e) {
    if (e.key == "ArrowUp") {
        let userelement = document.getElementsByClassName("user")[0];
        userelement.classList.add("jumpuser");
        setTimeout(() => {
            userelement.classList.remove("jumpuser");
        }, 800);
    }
    else if (e.key == "ArrowRight") {
        let userelement = document.getElementsByClassName("user")[0];
        let user_x = parseInt(
            window.getComputedStyle(userelement, null).getPropertyValue("left")
            );
            
            //till the iron man goes to 75 % of screen
            let value = 0.75 * width;
            
            if (user_x <= value) {
                userelement.style.left = user_x + 0.1 * width + "px";
            }
        }
        
        else if (e.key == "ArrowLeft") {
            let userelement = document.getElementsByClassName("user")[0];
            let user_x = parseInt(
                window.getComputedStyle(userelement, null).getPropertyValue("left")
    );

    //till the iron man goes to 15 of width
    let value = 0.15 * width;

    if (user_x > value) {
      userelement.style.left = user_x - 0.1 * width + "px";
    }
  }
};

let lastchangedbg=0;
let lastchangedhero=0;
let countervariablebg=0;
let countervariablehero=0;

//Checking for collision
const mainfunctionthis=setInterval(() => {
    //getting user and enemy
    let user=document.getElementsByClassName("user")[0];
    let enemy=document.getElementsByClassName("enemy")[0];

    lastchangedbg+=50;
    lastchangedhero+=50;
    
    let maincontainer=document.getElementsByClassName("maincontainer")[0];


    if(lastchangedbg==5000)
    {
        lastchangedbg=0;
        countervariablebg++;
        countervariablebg%=11;
        if(countervariablebg==0)
        countervariablebg=1;
        let string="bg/bg"+countervariablebg+".jpg";
        maincontainer.style.backgroundImage='url('+string+')';
    }

    if(lastchangedhero==3000)
    {
        lastchangedhero=0;
        countervariablehero++;
        countervariablehero%=13;
        if(countervariablehero==0)
        countervariablehero=1;
        let string="hero"+countervariablehero+"-min.png";
        user.style.backgroundImage='url(avengers/'+string+')';
    }


    //current right value of user
    let user_x=parseInt(window.getComputedStyle(user,null).getPropertyValue('left'))
    let user_y=parseInt(window.getComputedStyle(user,null).getPropertyValue('bottom'))
    
    //current right value of user
    let enemy_x=parseInt(window.getComputedStyle(enemy,null).getPropertyValue('left'))
    let enemy_y=parseInt(window.getComputedStyle(enemy,null).getPropertyValue('bottom'));
    
    user_x+=character_width/2;
    enemy_x+=character_width/2;

    let distance_x=Math.abs(user_x-enemy_x);
    let distance_y=Math.abs(user_y-enemy_y);
    
    if(distance_x<character_width/2&&distance_y<character_height/3)
    {
        let gameover=document.getElementsByClassName("msg")[0];
        gameover.style.visibility= 'visible'; 
        enemy.classList.remove('enemyjumper');
        clearInterval(mainfunctionthis);
        startaudio.pause();
        stopaudio.play();
    }
    else
    {
        let scorer=document.getElementsByClassName("score")[0];
        score+=1;
        scorer.innerHTML='Your Score : '+score;
        enemymover=parseFloat(window.getComputedStyle(enemy,null).getPropertyValue('animation-duration'));
        enemy.style.animationDuration=enemymover-0.001;
    }
}, 50);



//Function for Replay Button
function replay()
{
    location="/"
    console.log(window.location)
    window.location.reload();
}


});