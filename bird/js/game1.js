alert("Демо версия птички. Управление стрелками");
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();   
var box = new Image();   
var box2 = new Image();
var orig = new Image();


var boxes = [];
boxes[0] = {
	x: Math.floor(Math.random()*cvs.width),
	y: 0
}
var boxes2 = [];
boxes2[0] = {
	x: cvs.width,
	y: bg.height-fg.height-30
}


bird.src = "source/img/bird.png";
bg.src = "source/img/bg.png";
fg.src = "source/img/fg.png";
box.src = "source/img/box.png";
box2.src = "source/img/box.png";
orig.src = "source/img/orig.gif";

var xPos = 50;
var yPos = 150;
var grov = 1.25;
var step = 35;

function draw(){
	ctx.drawImage(bg, 0, 0);
	ctx.drawImage(bird, xPos, yPos);
	ctx.drawImage(fg, 0, bg.height-fg.height);
	
	for (var i = 0 ; i < boxes.length; i++)
	{
		ctx.drawImage(box, boxes[i].x, boxes[i].y);
		boxes[i].y++;
			
		if (boxes[i].y == 100)
		{
			boxes.push({
			x: Math.floor(Math.random()*cvs.width),
			y: 0
		});
		}
			
		if (xPos + bird.width >= boxes[i].x && 
			xPos<=boxes[i].x+box.width && 
			yPos + bird.height >= boxes[i].y && 
			yPos <=boxes[i].y+box.height)
			{
					ActionFire();
						
			}
	}
	
	for (var j = 0; j< boxes2.length; j++)
	{
		ctx.drawImage(box2, boxes2[j].x, boxes2[j].y);
		boxes2[j].x--;
		if (boxes2[j].x == 0)
		{
			boxes2.push({
				x: cvs.width,
				y: bg.height-fg.height-30
			});
		}
		if (xPos + bird.width >= boxes2[j].x && 
			xPos<=boxes2[j].x+box2.width && 
			yPos + bird.height >= boxes2[j].y && 
			yPos <=boxes2[j].y+box2.height)
			{
				ActionFire();
			}
		}
		if (yPos>=(bg.height-fg.height-25))
			yPos=(bg.height-fg.height-25);
		else if (yPos<=0)
		{	
			yPos=0;
			yPos+=grov;
		}
		else
		yPos+=grov;
	
		if (xPos<=0)
			xPos=0;
		else if (xPos>=(cvs.width-20))
			xPos=(cvs.width-20);
		requestAnimationFrame(draw);
	
	}
document.addEventListener("mousedown", moveUp);
document.addEventListener("keydown", move);
function move(e)
{
	var keyCode = e.keyCode;
		
		if(keyCode == 38)
		{
			moveUp();
		}	
		else if (keyCode == 37)
		{
			moveLeft();
		}
		else if (keyCode == 39)
		{
			moveRight();
		}
}
function moveUp(){
	yPos-=step;
}
function moveRight(){
	xPos+=30;
}
function moveLeft(){
	xPos-=30;
}
function moveStop(){
	xPos=this.xPos;
	yPos=this.yPos;
}
function ActionFire(){
	document.addEventListener("keydown", moveStop);
	yPos++;
	bird = orig;
	ctx.drawImage(orig, xPos-300, yPos-225);
	function ende(){
		location.reload();
	}
	setTimeout(ende, 1000);
}

bg.onload = draw;