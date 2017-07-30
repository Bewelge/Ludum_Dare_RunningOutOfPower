var width;
var height;
var topp;
var console;
var height;
var console;
var sides;
var width;
var hheight;
var hwidth;
var console;
var fieldSize;
var fieldHeight;
var upButSize;
var mouseX = 0;
var mouseY = 0;
var moved = false;
var tickSpeed = 20;
var mouseDown = false;
var bw;
var bh;
var maxmax;
var lng;
var imagesToLoad=1;
var earthImg;
function showMenu() {
	$("body").append(createStartMenu());
}
function checkImagesToLoad() {
	imagesToLoad--;
	if(!imagesToLoad) {
		//init();
		showMenu();
	}
}
function load() {
	earthImg = new Image();
    earthImg.src = "earth.png";
    earthImg.onload = function() {
      checkImagesToLoad();
    };
}
function init() {
	mouseX = 0;
	mouseY = 0;
	moved = false;
	tickSpeed = 20;
	mouseDown = false;
	starAmount = 1000;
	stars = [];
	
	
	ticker = 0;
	
	monsCD = 25;
	monsTicker = -000;
	renderTicker = 100;
	sunHeight = 20;
	earthHeight = 50;
	Energy=100;
	maxEnergy=100;
	EnergyTick=20;
	EnergyTicker=0;
	earthTemperature=25;
	endScreen=false;
	donMid = false;
	doneEnd = false;
	thePlayer=null;
	Enemies = [];
	curLevel = 1;
	lvlTick = 10;
	lvlTicker = 0;
	Power = 1000;
	maxPower = 1000;
	starRot = 0;
	starRotSpeed = 0.01;
	health = 100;
	maxHealth = 100;
	radius = 10;
	shapeMons = 5;
	fuseList=[];
	toShrink=[];
	killList=[];



$(".but").css("display","none");
	width = window.innerWidth || document.documentElement.clientWidth / 1 || document.body.clientWidth
	height = window.innerHeight || document.documentElement.clientHeight / 1 || document.body.clientHeight / 1;



	//diagLng=(width*height)/2


	bw = Math.floor(width / 2);
	bh = Math.floor(height / 2);
	maxmax = Math.floor(Math.sqrt(Math.pow(Math.max(bw, bh), 2) + Math.pow(Math.max(bw, bh), 2)));
	lng = Math.max(bw, bh);

	diagLng = Math.sqrt(Math.pow(lng * 2, 2) * 2);

	mouseX=bw;
	mouseY=bh;
	// let tempArr22 = document.getElementsByClassName("upBut");
	// for (let key in tempArr22) {
	// 	if (tempArr22[key].id != undefined) {
	// 		try {		
	// 			tempArr22[key].style.width = upButSize+"px";
	// 			//tempArr22[key].style.height = topp/3+"px";
	// 			tempArr22[key].style.marginTop = topp/2+"px";
	// 			tempArr22[key].style.fontSize = topp/4+"px";
	// 			//tempArr22[key].addEventListener("click",HUDclick);
	// 		} catch(e) {
	// 			console.log("fuckoff");
	// 		}
	// 	}
	// }



	//var top = (height-dim)/1.5;
	// gameCanvas = document.getElementById("Sieve");
	gameCanvasBG = document.getElementById("BG");
	gameCanvasHUD = document.getElementById("HUD");
	// gameCanvasOnce = document.getElementById("Once");
	// gameCanvasEffects = document.getElementById("Effects");
	// gameCanvas3Selection = document.getElementById("HUD");

	document.addEventListener("mousemove", myMouseMove);
	document.addEventListener("mousedown", myMouseDown);
	document.addEventListener("mouseup", myMouseUp);
	// document.addEventListener("keydown", myKeyDown);



	//	let ascBut = document.getElementById("Ascension");
	//	ascBut.style.top = topp * 1.5 + topp * 2 / 6 + "px";
	//	ascBut.style.left = sides * 0.1 + "px";
	//	ascBut.style.width = sides * 0.8 + "px";
	//	ascBut.style.height = topp * 0.5 + "px";



	document.getElementById("canvases").style.top = topp + "px";
	document.getElementById("canvases").style.width = width + "px";
	document.getElementById("canvases").style.height = height + "px";
	document.getElementById("canvases").style.left = sides + "px";

	document.getElementById("canvasesInner").style.top = topp + "px";
	document.getElementById("canvasesInner").style.width = width + "px";
	document.getElementById("canvasesInner").style.height = height + "px";
	document.getElementById("canvasesInner").style.left = sides + "px";


	// ctx = gameCanvas.getContext("2d");
	ctxHUD = gameCanvasHUD.getContext("2d");
	// ctx3Selection = gameCanvas3Selection.getContext("2d");
	ctxBG = gameCanvasBG.getContext("2d");

	// ctxOnce = gameCanvasOnce.getContext("2d");
	// ctxEffects = gameCanvasEffects.getContext("2d");

	// gameCanvas.width = width;
	// gameCanvas.height = height;
	//gameCanvas.style.left=left+marg+"px";
	//gameCanvas.style.top=top+"px";
	gameCanvasBG.width = width;
	gameCanvasBG.height = height;

	// gameCanvasOnce.width = width + 2 * sides;
	// gameCanvasOnce.height = height + topp;

	gameCanvasHUD.width = width;
	gameCanvasHUD.height = height;

	// gameCanvasEffects.width = width + 2 * sides; //width;
	// gameCanvasEffects.height = height + topp; // height;


	//gameCanvas3Selection.width = width + 2 * sides; //width;
	//gameCanvas3Selection.height = height + topp; // height;

	// ctxBG.clearRect(0,0,gameCanvasBG.width,gameCanvasBG.height);
	// ctxBG.fillStyle="rgba(255,255,255,0)";
	// ctxBG.fillRect(0,0,gameCanvasBG.width,gameCanvasBG.height);
	endScreen=false;
	createPlayer(1);
	createStars();
	tick();


}
var MathPI180 = Math.PI / 180;
var starAmount = 1000;
var stars = [];
var tmpCnv = document.createElement("canvas");
var lastTick = 0;
var ticker = 0;
var doneTicks = 0;
var days = 0;
var lastDays = 0;
var monsCD = 25;
var monsTicker = -000;
var imgData;
var data;
var renderTicker = 100;
var sunHeight = 20;
var earthHeight = 50;
var diagLng;
var Energy=100;
var maxEnergy=100;
var EnergyTick=20;
var EnergyTicker=0;
var earthTemperature=25;
var dummyContext = document.createElement("canvas");
var endScreen=false;
var donMid = false;
var doneEnd = false;
var thePlayer;
var Enemies = [];
var debug = false;
var curLevel = 1;
var lvlTick = 10;
var lvlTicker = 0;
var waterStep = false;
var Power = 1000;
var maxPower = 1000;
var shootingStarCD = 10;
var shootingStarTicker = 0;
var starRot = 0;
var starRotSpeed = 0.01;
var health = 100;
var maxHealth = 100;
var currentDayRotate = 0;
var radius = 10;
var shapeMons = 5;
var fuseList=[];
var toShrink=[];
var killList=[];

function tick() {

	var now = window.performance.now(); // current time in ms

	var deltaTime = now - lastTick; // amount of time elapsed since last tick

	lastTick = now;


	ticker += deltaTime;


	render(doneTicks);

	doneTicks = 0;


	//  if (moved) {
	//  		moved=false;
	//  		speedMod = 1;
	//  } else {
	//  		speedMod = 5;
	//  }
	//  

	while (ticker > tickSpeed && doneTicks < 100000) {
		ticker -= tickSpeed;
		doneTicks++;

		step();

	}
	theLoop = window.requestAnimationFrame(tick);

}

function createStartMenu() {
	let cont = document.createElement("div");

	let StartBut = document.createElement("div");
	StartBut.innerHTML = "Start";
	
	StartBut.style.width = width*0.3 + "px";
	StartBut.style.height = height*0.1 + "px";
	StartBut.style.marginTop = height*0.3 + "px";
	//StartBut.style.right = 0 + "px";
	StartBut.style.marginLeft = width*0.3 + "px";
	StartBut.style.fontSize = height*0.1 + "px";
	StartBut.addEventListener("click",startGame);
	StartBut.id = "Start";
	StartBut.className = "but";

	cont.append(StartBut)


let SettingBut = document.createElement("div");
	SettingBut.innerHTML = "Start";	
	SettingBut.style.width = width*0.3 + "px";
	SettingBut.style.height = height*0.1 + "px";
	SettingBut.style.marginTop = height*0.3 + "px";
	SettingBut.style.marginLeft = width*0.3 + "px";
	SettingBut.style.fontSize = height*0.1 + "px";
	// SettingBut.addEventListener("click",openSettings);
	SettingBut.id = "Settings";
	SettingBut.className = "but";

	cont.append(SettingBut);

let HelpBut = document.createElement("div");
	HelpBut.innerHTML = "Help";
	HelpBut.style.width = width*0.3 + "px";
	HelpBut.style.height = height*0.1 + "px";
	HelpBut.style.marginTop = height*0.3 + "px";
	HelpBut.style.marginLeft = width*0.3 + "px";
	HelpBut.style.fontSize = height*0.1 + "px";
	// HelpBut.addEventListener("click",openHelp);
	HelpBut.id = "Help";
	HelpBut.className = "but";

	cont.append(HelpBut);
	return cont;
}
function startGame(){
	init();
}
function drawHUD() {
	drawDays();
	drawEnergy();
	drawHealth();
	drawTemp();
}
function drawTemp() {
	let barH = height-80;
	let lgr = ctxBG.createLinearGradient(width-60,0,width-60,height);
	let ratio = (earthTemperature+50)/100;
	if (ratio>0.5) {
		ratio = Math.min(ratio,0.999);
	} else {
		ratio = Math.max(0.001,ratio);
	}

	lgr.addColorStop(0,"rgba(255,50,50,0.8)");
	lgr.addColorStop(Math.max(0.001,ratio-0.05),"rgba(155,50,50,0.8)");
	lgr.addColorStop(Math.min(0.999,ratio+0.05),"rgba(50,50,155,0.8)");
	lgr.addColorStop(1,"rgba(50,50,255,0.8)");
	ctxBG.fillStyle=lgr;//"rgba(50,150,50,1)";
	ctxBG.font = "25px Comic Sans";
	ctxBG.strokeStyle="rgba(250,250,250,1)";
	ctxBG.fillRect(width-60,60,40,barH);
	ctxBG.strokeRect(width-60,60,40,barH);
	ctxBG.strokeText(earthTemperature+"C",width-100,60+barH/2);
}
function drawHealth() {
	ctxBG.fillStyle="rgba(150,50,50,1)";
	ctxBG.strokeStyle="rgba(250,50,50,0.5)";
	ctxBG.lineWidht="5px";
	let sL = bw - width/6;

	ctxBG.fillRect(sL,20,(width/3)*(health/maxHealth),50);
	ctxBG.strokeRect(sL,20,width/3,50);
	ctxBG.font = "25px Comic Sans";
	let tx = health+"/"+maxHealth;
	let mtx = ctxBG.measureText(tx).width;
	ctxBG.strokeText(tx,bw-mtx/2,70);
}
function drawEnergy() {
	let barH = height-80;
	ctxBG.fillStyle="rgba(50,150,50,1)";
	ctxBG.font = "25px Comic Sans";
	ctxBG.strokeStyle="rgba(50,100,50,1)";
	ctxBG.fillRect(20,60+barH*(1-(Energy/maxEnergy)),100,barH*(Energy/maxEnergy));
	ctxBG.strokeRect(20,60,100,barH);
	ctxBG.strokeText(Energy+"/"+maxEnergy,20,60+barH/2);

}
function drawDays() {
	ctxBG.fillStyle="rgba(255,255,255,1)";
	//ctxBG.clearRect(0,0,width/2,100);
	ctxBG.font = "30px Comic Sans";
	let tx;
	if (days == 1) {
		tx = days+" Day has passed...";
	} else {
		tx = days+" Days have passed...";
	}
	ctxBG.fillText(tx,20,50);

}

function hslToRgbString(h, s, l, a) {
	// a = a || 1;
	a = Math.floor(a * 100) / 100;
	dummyContext.fillStyle = 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ' )';
	//str = (String) dummyContext.fillStyle;
	return dummyContext.fillStyle;
}
function getColor(n, a) {


	let h = n + Math.floor((n) / shapeMons) * 55 + Math.floor(n / 100) * 30;
	let s = 30 + n - Math.floor(n / 5); //Math.floor(n/10);
	let l = 65 - n * 5 + Math.floor(n / 5) * 25; //Math.floor(n/10);
	return hslToRgbString(h, s, l, a);

}

function render(doneTicks) {
	ctxBG.clearRect(0,0,width,height);

	starTick();
	for (let key in Enemies) {
		//	console.log(key+"drawing at "+Enemies[key].pos.x+","+Enemies[key].pos.y+")");
		drawCircle(ctxBG, Enemies[key].pos.x, Enemies[key].pos.y, getRad(Enemies[key].lv), getColor(Enemies[key].lv,1));
	}


	if (thePlayer && sunHeight > 1) {

		ctxBG.beginPath();
		ctxBG.strokeStyle = "rgba(200,200,200,1)";
		ctxBG.lineWidth = 5;
		let ang = angle(mouseX, mouseY, thePlayer.pos.x, thePlayer.pos.y);
		let dist = Distance(mouseX, mouseY, thePlayer.pos.x, thePlayer.pos.y);
		ctxBG.moveTo(thePlayer.pos.x - (sunHeight) * Math.cos(0.5 * Math.PI + ang),
			thePlayer.pos.y - (sunHeight) * Math.sin(0.5 * Math.PI + ang));
		ctxBG.lineTo(mouseX - (earthHeight) * Math.cos(0.5 * Math.PI + ang),
			mouseY - (earthHeight) * Math.sin(0.5 * Math.PI + ang));
		ctxBG.lineTo(mouseX - (earthHeight) * Math.cos(-0.5 * Math.PI + ang),
			mouseY - (earthHeight) * Math.sin(-0.5 * Math.PI + ang));
		ctxBG.lineTo(thePlayer.pos.x - (sunHeight) * Math.cos(-0.5 * Math.PI + ang),
			thePlayer.pos.y - (sunHeight) * Math.sin(-0.5 * Math.PI + ang));
		ctxBG.lineTo(thePlayer.pos.x - (sunHeight) * Math.cos(0.5 * Math.PI + ang),
			thePlayer.pos.y - (sunHeight) * Math.sin(0.5 * Math.PI + ang));
		ctxBG.fillStyle = "rgba(255,255,0,0.3)";
		ctxBG.fill();
		//ctxBG.stroke();
		ctxBG.closePath();

		// ctxBG.beginPath();
		// ctxBG.strokeStyle = "rgba(0,0,0,1)";
		// ctxBG.lineWidth = 5;

		// ctxBG.moveTo(mouseX - (earthHeight) * Math.cos(0.5 * Math.PI + ang),
		// 	mouseY - (earthHeight) * Math.sin(0.5 * Math.PI + ang));

		// ctxBG.lineTo(mouseX - Math.cos(ang) * (width * height) - (sunHeight) * Math.cos(0.5 * Math.PI + ang),
		// 	mouseY - Math.sin(ang) * (width * height) - (sunHeight) * Math.sin(0.5 * Math.PI + ang));
		// ctxBG.lineTo(mouseX - Math.cos(ang) * (width * height) - (sunHeight) * Math.cos(-0.5 * Math.PI + ang),
		// 	mouseY - Math.sin(ang) * (width * height) - (sunHeight) * Math.sin(-0.5 * Math.PI + ang));

		// ctxBG.lineTo(mouseX - (earthHeight) * Math.cos(-0.5 * Math.PI + ang),
		// 	mouseY - (earthHeight) * Math.sin(-0.5 * Math.PI + ang));

		// ctxBG.fillStyle = "rgba(0,0,0,1)";
		// ctxBG.fill();
		// ctxBG.closePath();
		drawCircle(ctxBG, mouseX, mouseY, thePlayer.lv * earthHeight, "rgba(0,0,0,1)");
		let newX = mouseX+((dist/diagLng)*earthHeight)*Math.cos(ang);
		let newY = mouseY+((dist/diagLng)*earthHeight)*Math.sin(ang);
		let rGr = ctxBG.createRadialGradient(newX,newY,0,newX,newY,2*earthHeight);
		rGr.addColorStop(0,"blue");
		rGr.addColorStop(1,"rgba(0,0,0,0)");
		drawCircle(ctxBG, mouseX, mouseY, thePlayer.lv * earthHeight, rGr);


		let rGr2 = ctxBG.createRadialGradient(thePlayer.pos.x, thePlayer.pos.y,0,thePlayer.pos.x, thePlayer.pos.y,2*sunHeight);
		rGr2.addColorStop(0,"rgba(255,100,100,0.9)");
		rGr2.addColorStop(1,"rgba(0,0,0,0)");
		drawCircle(ctxBG, thePlayer.pos.x, thePlayer.pos.y, sunHeight, "rgba(255,255,0,1)");
		drawCircle(ctxBG, thePlayer.pos.x, thePlayer.pos.y, sunHeight*1.1, "rgba(255,255,0,0.8)");
		drawCircle(ctxBG, thePlayer.pos.x, thePlayer.pos.y, sunHeight, rGr2);

		// ctxBG.beginPath();
		// ctxBG.strokeStyle="rgba(255,255,255,1)";
		// ctxBG.moveTo(mouseX,mouseY);
		// ctxBG.lineTo(mouseX+Math.cos(ang)*width*height,mouseX+Math.sin(ang)*width*height);
		// ctxBG.stroke();
		// ctxBG.closePath();


		// ctxBG.beginPath();
		// ctxBG.strokeStyle="rgba(0,255,255,1)";
		// ctxBG.moveTo(mouseX,mouseY);
		// ctxBG.lineTo(mouseX+Math.cos(currentDayRotate)*width*height,mouseX+Math.sin(currentDayRotate)*width*height);
		// ctxBG.stroke();
		// ctxBG.closePath();
	}
	// ctx.beginPath();
	// //ctxBG.clearRect(mouseX-10,mouseY-10,20,20);
	// drawCircle(ctxBG,mouseX,mouseY,5,"rgba(0,0,0,1)");
	// ctx.fillStyle="rgba(50,150,50,0.8)";
	// ctx.strokeStyle="rgba(20,100,20,0.8)";
	// ctx.lineWidth="5px";
	// ctx.fillRect(20,20,width-40,40);
	// ctx.strokeRect(20,20,(width-40)*(Power/maxPower),40);

		drawHUD();

}

function angle(p1x, p1y, p2x, p2y) {

	return Math.atan2(p2y - p1y, p2x - p1x);

}

function gameOver(txt){
	endScreen=true;

	let cont = document.createElement("div");
	cont.style.position = "absolute";
	cont.style.left ="0px";
	cont.style.top = "0px";
	cont.style.width ="100%"; 
	cont.style.height="100%";

	let StartBut = document.createElement("div");
	StartBut.innerHTML = "Try Again!";
	StartBut.style.width = width*0.3 + "px";
	StartBut.style.height = height*0.1 + "px";
	StartBut.style.marginTop = height*0.3 + "px";
	//StartBut.style.right = 0 + "px";
	StartBut.style.marginLeft = width*0.3 + "px";
	//StartBut.style.fontSize = height*0.1 + "px";
	StartBut.addEventListener("click",startGame);
	StartBut.id = "tryAgain";
	StartBut.className = "but";

	$(cont).append("<div class='msg'>"+txt+"</br>You managed to survive for "+days+" days!</div>");
	cont.append(StartBut);
	$("body").append(cont);
	// $("body").append("<div class='msg'>"+txt+"</div>");
	// $("body").append(StartBut);

}
function calcTemp() {
	if (earthTemperature>40) {
		gameOver("Your Earth Burned!")
	} else if (earthTemperature<-30) {
		gameOver("Your Earth Froze!")
	}
}
function movePlayer() {
	calcForcePlayer();
	calcTemp();
	applyForcePlayer();
}


function calcForcePlayer() {
	thePlayer.mot.x *= 0.999;
	thePlayer.mot.y *= 0.999;
	let mouseDist = Distance(thePlayer.pos.x, thePlayer.pos.y, mouseX, mouseY);
	let distDiff = mouseDist - Math.min(bw,bh);
	if (Math.abs(distDiff)>50) {
		if (distDiff<0) {
			earthTemperature += 0.01*Math.log(Math.abs(distDiff));
			
		} else if (distDiff>0) {
			earthTemperature -= 0.01*Math.log(Math.abs(distDiff));
		}
	}
	let mouseAngle = angle(thePlayer.pos.x, thePlayer.pos.y, mouseX, mouseY);
	//console.log(mouseAngle);
	let maxMot = Math.max(0.5*Math.log(mouseDist),5);
	thePlayer.mot.x = thePlayer.mot.x +0.5 * maxMot * Math.cos(mouseAngle) ;
	thePlayer.mot.y = thePlayer.mot.y +0.5 * maxMot * Math.sin(mouseAngle) ;
	if (mouseAngle>currentDayRotate && mouseDist > earthHeight+sunHeight) {
		currentDayRotate = mouseAngle;
		if (currentDayRotate>-0.3*Math.PI && currentDayRotate<0.3*Math.PI) {
			doneEnd=false;
		}
		if (currentDayRotate>=0.95*Math.PI ) {
			if (doneEnd) {
				currentDayRotate=-Math.PI;
			} else {
				currentDayRotate=-Math.PI;
				doneEnd=true;
				days++;
				increaseEnergy(10);
				// Energy+=10;
				
			}
		} 
	}
}

function applyForcePlayer() {
	thePlayer.pos.x += 0.1 * thePlayer.mot.x;
	thePlayer.pos.y += 0.1 * thePlayer.mot.y;
}

function moveEnemies() {
	for (let key in Enemies) {
		moveEnemy(key);
	}
}
function findPartner(i,lv) {
	for (let key in Enemies) {
		if (key!=i && Enemies[key].lv == lv) {
			return key;
		}
	}
	return false;
}
function moveEnemy(i) {
	let partner = findPartner(i,Enemies[i].lv);
	if (partner) {
		Enemies[i].angle = angle(Enemies[i].pos.x, Enemies[i].pos.y, Enemies[partner].pos.x, Enemies[partner].pos.y);
		
	} else {

		Enemies[i].angle = angle(Enemies[i].pos.x, Enemies[i].pos.y, mouseX, mouseY);
	}
	Enemies[i].mot.x += 0.1*Math.cos(Enemies[i].angle);
	
	Enemies[i].pos.x += Enemies[i].mot.x * 0.1;
	Enemies[i].mot.y += 0.1*Math.sin(Enemies[i].angle);
	
	Enemies[i].pos.y += Enemies[i].mot.y * 0.1;
	

	
}

function Enemy(lv, x, y, xMot, yMot, ang) {
	this.lv = lv;
	this.pos = {
		x: x,
		y: y,
	};
	this.mot = {
		x: 0 || xMot,
		y: 0 || yMot,
	}
	this.angle = ang;
}

function Player(lv, x, y) {
	this.lv = 1;
	this.pos = {
		x: x,
		y: y-200,
	};
	this.mot = {
		x: 5,
		y: 5
	}
	this.ang = 0;
}

function createPlayer(lv) {
	thePlayer = new Player(1, width / 2, height / 2);
}

// function createEnemy(lv) {
// 	let ang = Math.floor((Math.random() * 360)) * Math.PI / 180
// 	let x = width / 2 + Math.max(width, height) * Math.cos(ang);
// 	let y = height / 2 + Math.max(width, height) * Math.sin(ang);

// 	Enemies.push(new Enemy(lv, x, y,0,0, ang));
// }
function createEnemy(lv,x,y,xmot,ymot) {
	let ang = Math.floor((Math.random() * 360)) * Math.PI / 180;

	Enemies.push(new Enemy(lv, x, y ,xmot, ymot, ang));
}

function drawCircle(contx, x, y, rad, style) {
	contx.fillStyle = style;
	contx.beginPath()
	contx.arc(x, y, rad, 0, Math.PI * 2, 0);
	contx.closePath();
	contx.fill();
}


function step() {
	if (endScreen) {
		return
	}
	monsTicker++;
	if (monsTicker > monsCD) {
		monsTicker = 0;
		let ang = Math.floor((Math.random() * 360)) * Math.PI / 180
		let x = width / 2 + Math.max(width, height) * Math.cos(ang);
		let y = height / 2 + Math.max(width, height) * Math.sin(ang);
		createEnemy(curLevel,x,y,0,0,ang);
		lvlTicker++;
		if (lvlTicker>=lvlTick) {
			lvlTicker=0;
			curLevel++;
		}

		//sunHeight--;
	}
	EnergyTicker++;
	if (EnergyTicker>EnergyTick) {
		EnergyTicker=0;
		Energy-=1;
	}
	if (thePlayer) {

		movePlayer();
	}
	moveEnemies();
	checkColls();
	killAndFuse();
}

function stepWater() {

}

function Distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

function myMouseMove(e) {
	//console.log(e);
	if (!mouseDown) {
		e.preventDefault();
		let mxTemp = e.clientX;
		let myTemp = e.clientY;
		if (Distance(mxTemp, myTemp, mouseX, mouseY) > 5) {
			Power--;
			mouseX = mxTemp;
			mouseY = myTemp;

			moved = true;
		}
	}
}

function myMouseUp(e) {
	e.preventDefault();
	mouseDown = false;
}

function myMouseDown(e) {
	e.preventDefault();
	mouseDown = true;
}


function createStars() {



	for (var i = 0; i < starAmount; i++) {
		var randomX = Math.floor((Math.random() - Math.random()) * (maxmax));
		var randomY = Math.floor((Math.random() - Math.random()) * (maxmax));

		var randomSize = Math.random() * 2;
		var randomOpacityOne = Math.floor((Math.random() * 9) + 1);
		var randomOpacityTwo = Math.floor((Math.random() * 9) + 1);
		var randomHue = Math.floor((Math.random() * 360) + 1);
		var m = Math.floor(Math.random() * 100);

		stars.push([randomX, randomY, randomSize, m, true, randomOpacityOne, randomOpacityTwo, randomHue]);
	}



	var lng = Math.max(bw, bh);
	tmpCnv.width = lng * 2;
	tmpCnv.height = lng * 2;
	var tmpCtx = tmpCnv.getContext("2d");
	tmpCtx.save();
	tmpCtx.clearRect(0, 0, lng * 2, lng * 2);
	tmpCtx.fillStyle = "rgba(0,0,0,1)";
	tmpCtx.fillRect(0, 0, lng * 2, lng * 2);

	tmpCtx.translate(bw, bh);
	tmpCtx.rotate(0 * MathPI180);
	for (let kei in stars) {
		tmpCtx.fillStyle = "hsla(" + stars[kei][7] + ", 30%, 80%, ." + stars[kei][5] + stars[kei][6] + ")";
		tmpCtx.beginPath();
		tmpCtx.lineWidth = stars[kei][2] * Math.ceil(stars[kei][3] / 10);
		tmpCtx.rect(stars[kei][0], stars[kei][1], stars[kei][2], stars[kei][2]);
		tmpCtx.stroke();
		tmpCtx.fill();
		tmpCtx.closePath();

	}
	tmpCtx.restore();
	stars = null

}

function drawStars(rad) {



	ctxBG.save();

	ctxBG.clearRect(0, 0, diagLng, diagLng);
	//ctxBG.fillStyle="rgba(0,0,0,1)";
	//ctxBG.fillRect(0,0,lng*2,lng*2);


	ctxBG.translate(bw, bh);
	ctxBG.rotate(rad * MathPI180);
	ctxBG.drawImage(tmpCnv, -diagLng * 0.5, -diagLng * 0.5, diagLng, diagLng);


	ctxBG.restore();
}


function dmgPlayer(lv) {
	health-=lv;
	if (health<=0) {
		gameOver("Oh Dear! One Asteroid too many!");
	}
}
function increaseEnergy(am) {
	Energy=Math.min(maxEnergy,Energy+am);
} 

function starTick(doneTicks) {
	//return;
	doneTicks = 10;
	starRot += starRotSpeed * doneTicks;
	//shootingStarTicker++;
	//if (shootingStarTicker>shootingStarCD) {
	//	shootingStarTicker=0;
	//	createShootingStar();
	//}
	if (starRot > 359) {
		starRot = 0;
	}
	drawStars(starRot);

}

function getRad(lv) {
	//if (lv < shapeMons) {
	return Math.floor(radius * (lv + 1 - Math.floor(lv / shapeMons) * shapeMons) / 1.2 + 1 /* + radius * Math.floor(lv/shapeMons)*/ );
	//} else {
	//	return Math.floor(radius*(lv+1-shapeMons )/1.2+1);
	//}
}

function checkColls() {
	if (debug) {
		console.log("checkcolls");
	}
	let offset = 0;
	let don = [];
	fuseList = [];
	killList = [];

	for (let key = Enemies.length - 1; key >= 0; key--) {

		if (!contains(don, key)) {
			let rad = getRad(Enemies[key].lv);
			if (Enemies[key].pos.x < rad) {
				setPosX(key, rad);
			} else if (Enemies[key].pos.x + rad > width) {
				setPosX(key, width - rad);
			} else if (Enemies[key].pos.y < rad) {
				setPosY(key, rad);
			} else if (Enemies[key].pos.y + rad > height) {
				setPosY(key, height - rad);
			}
			if (thePlayer) {
				if (Distance(mouseX, mouseY, Enemies[key].pos.x, Enemies[key].pos.y) < rad + earthHeight) {

					dmgPlayer(Enemies[key].lv);
					//earthHeight -= Enemies[key].lv;
					killList.push(key);
					//Enemies.splice(key, 1);
					don = addUnique(don.slice(0),key);

				} else if (Distance(thePlayer.pos.x, thePlayer.pos.y, Enemies[key].pos.x, Enemies[key].pos.y) < rad + sunHeight) {
					if (Enemies[key].lv == 1) {
						//sunHeight = Math.min(height/5,sunHeight+10);
						increaseEnergy(1);
						killList.push(key);
						//Enemies[key].mot.x += 0.9*thePlayer.mot.x;
						//Enemies[key].mot.y += 0.9*thePlayer.mot.y;
						//don = addUnique(don.slice(0),key);
						continue;
					} else {
						Enemies[key].lv--;

						Enemies[key].mot.x += 0.9*thePlayer.mot.x;
						Enemies[key].mot.y += 0.9*thePlayer.mot.y;
						//sunHeight = Math.min(height/5,sunHeight+10);
						//don = addUnique(don.slice(0),key);
						continue;
					}
				}
			}
			for (let kai = 0; kai < Enemies.length; kai++) {
				if (!contains(don.slice(0), kai)) {
					if ((kai) != parseInt(key)) {
						let rad2 = getRad(Enemies[kai].lv); //radius * (arrMons[kai][0]/2+1);
						//if same levels

						if (Enemies[kai].lv === Enemies[key].lv) {
							let rrcdm = (rad + rad2) * 1;
							if (Math.abs(Enemies[kai].pos.x - Enemies[key].pos.x) < rrcdm) {
								//console.log("xhit");
								if (Math.abs(Enemies[kai].pos.y - Enemies[key].pos.y) < rrcdm) {
									//console.log("fullhit");
									// if (don.length>10) {
									// 	don.splice(0,2);
									// }
									don = addUnique(don, kai); //.push(kai);
									don = addUnique(don, key); //don.push(key);
									if (toShrink.length > 10) {
										toShrink.splice(0, 1);
									}
									toShrink.push([
										[Enemies[key].lv, Enemies[key].pos.x, Enemies[key].pos.y, 50],
										[Enemies[kai].lv, Enemies[kai].pos.x, Enemies[kai].pos.y, 50]
									]);

									fuseList.push([key, kai]);


								}
							}
						}
					}
				}
			}
			
		}



	}

}

function killAndFuse() {
	let toDel = [];
	let toSpwn = [];
	for (let key =fuseList.length-1;key>=0;key--) {
		let ind1 = fuseList[key][0];
		let ind2 = fuseList[key][1];
		toDel.push(ind1);
		toDel.push(ind2);
		let xAvg = (Enemies[ind1].pos.x+Enemies[ind2].pos.x) / 2;
		let yAvg = (Enemies[ind1].pos.y+Enemies[ind2].pos.y) / 2;
		let xMotAvg = (Enemies[ind1].mot.x+Enemies[ind2].mot.x) / 2;
		let yMotAvg = (Enemies[ind1].mot.y+Enemies[ind2].mot.y) / 2;
		console.log(xAvg+";"+yAvg+";"+xMotAvg+";"+yMotAvg);
		toSpwn.push([Enemies[key].lv+1,xAvg,yAvg,xMotAvg,yMotAvg]);
	}
	for (let kur in killList) {
		toDel.push(killList[kur]);
	}
	//console.log(toDel);
	toDel.sort();
	for (let kill = toDel.length-1;kill>=0;kill--) {
		
		Enemies.splice(toDel[kill],1);
		
	}
	for (let spwn = toSpwn.length-1;spwn>=0;spwn--) {
		createEnemy(toSpwn[spwn][0],toSpwn[spwn][1],toSpwn[spwn][2],0,0,0);
	}
	fuseList = null;
	killList = null;
}

function setPosX(key, x) {
	Enemies[key].pos.x = x;
	Enemies[key].mot.x *= -0.9;
}

function setPosY(key, y) {
	Enemies[key].pos.y = y;
	Enemies[key].mot.y *= -0.9;
}

function contains(arrr, that) {
	let arr = arrr.slice(0);
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == that) {
			return true;
		}
	}
	return false;
}
function addUnique(arr, that) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == that) {
			return arr.slice(0);
		}
	}
	arr.push(that);
	return arr.slice(0);
}