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
var okayDistance = 100;
var muted=false;
var bgPlaying = false;
function mute() {
	if (muted) {
		muted = false;
		$("#mute").html("Mute");
		if(bgPlaying) {
			bgAudio.play();
		}
	} else {
		$("#mute").html("<strike>Muted</strike>");
		bgAudio.pause();
		hitAudio.pause();
		burnAudio.pause();
		muted = true;
	}
}

function pauseGame() {
	if (paused) {
		paused = false;
		$("#pause").html("Pause");
		
	} else {
		paused = true;
		$("#pause").html("Paused");
		
	}
}
var Breaking=[];
function drawBreaking() {
	//superNova();
	for (let kum = Breaking.length - 1; kum >= 0; kum--) {
		Breaking[kum][3] += 1;
		if (Breaking[kum][3] > BreakDur2 ) {
			Breaking.splice(kum, 1);

		} else {
			drawOneBreaking(kum);




		}


	}
}
var EnergyUps=[];
var EnergyUpsDur=50;
var daysOver=[];
var daysOverDur=100;
var hpDowns=[];
var hpDownsDur=100;
function drawEnergy(){
	for (let key=EnergyUps.length-1;key>=0;key--) {
		EnergyUps[key][3]++;
		if(EnergyUps[key][3]>50) {
			EnergyUps.splice(key,1);
		} else {
			let tx;
			if (EnergyUps[key][0]>0) {

				tx = "+"+EnergyUps[key][0]+" Energy!"
				ctxBG.fillStyle="rgba(100,255,100,"+(1-EnergyUps[key][3]/EnergyUpsDur)+")";
			} else {
				tx = "-"+(-1*EnergyUps[key][0])+" Energy!"
				ctxBG.fillStyle="rgba(255,100,100,"+(1-EnergyUps[key][3]/EnergyUpsDur)+")";
			}

			ctxBG.font = "20px 'Anton'";

			ctxBG.fillText(tx,EnergyUps[key][1],EnergyUps[key][2]-10*EnergyUps[key][3]/EnergyUpsDur);
		}
	}
}

function drawHP(){
	for (let key=hpDowns.length-1;key>=0;key--) {
		hpDowns[key][3]++;
		if(hpDowns[key][3]>50) {
			hpDowns.splice(key,1);
		} else {
			let tx;
			if (hpDowns[key][0]<0) {

				tx = "+"+(-1*hpDowns[key][0])+"HP!";
				ctxBG.fillStyle="rgba(100,255,100,"+(1-hpDowns[key][3]/hpDownsDur)+")";
			} else {
				tx = "-"+hpDowns[key][0]+"HP!";
				ctxBG.fillStyle="rgba(255,100,100,"+(1-hpDowns[key][3]/hpDownsDur)+")";
			}
			ctxBG.font = "25px 'Anton'";

			ctxBG.fillText(tx,hpDowns[key][1],hpDowns[key][2]-10*hpDowns[key][3]/hpDownsDur);
		}
	}
}
function drawDaysOver() {
	for (let key=daysOver.length-1;key>=0;key--) {
		daysOver[key][3]++;
		if(daysOver[key][3]>50) {
			daysOver.splice(key,1);
		} else {

			let tx = "Day Over! +"+dayOverReward+" Energy!"
			ctxBG.fillStyle="rgba(100,255,100,"+(1-daysOver[key][3]/daysOverDur)+")";
			ctxBG.font = "20px 'Anton'";

			ctxBG.fillText(tx,daysOver[key][1],daysOver[key][2]-10*daysOver[key][3]/daysOverDur);
		}
	}
}
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
var bgAudio = new Audio("bgSoundLoop.wav");
var hitAudio = new Audio("hitAudio.wav");
var burnAudio = new Audio("burnAudio.wav");
function load() {
	earthImg = new Image();
    earthImg.src = "earth.png";
    earthImg.onload = function() {
      checkImagesToLoad();
    };
    menuTicker = window.setInterval(menuTick,50);
    //var audio = new Audio('bgSoundLoop.wav');
    
	
}

var BreakDur2=30;
function drawOneBreaking(key) {




	ctxBG.shadowColor = "rgba(0,0,0,0)";
	ctxBG.shadowOffsetX = 0;
	ctxBG.shadowOffsetY = 0;

	let rad = Breaking[key][0];
	let x = Breaking[key][1];
	let y = Breaking[key][2];
	let lv = Breaking[key][4];
	let ratio = Math.max(1,Breaking[key][3]) / BreakDur2;
	let antiRatio = 1 - ratio;
	let splits = Breaking[key][5];
	let rest = 360 % splits;

	ctxBG.lineWidth = rad*Math.max(0.01,ratio);
	

	ctxBG.strokeStyle=getColor(lv,1-Math.max(0.5,ratio));

		ctxBG.beginPath();
		
		ctxBG.arc(x,y,Breaking[key][3]*rad*0.1,0,Math.PI*2,false);
		
		ctxBG.stroke();
		if (ratio>0.3) {
			ctxBG.beginPath();
			
			ctxBG.lineWidth = ctxBG.lineWidth/2;
			ctxBG.arc(x,y,Breaking[key][3]*rad*0.1/3,0,Math.PI*2,false);
			
			ctxBG.stroke();
		}
		if (ratio>0.6) {
			ctxBG.beginPath();
			
			ctxBG.lineWidth = ctxBG.lineWidth/2;
			ctxBG.arc(x,y,Breaking[key][3]*rad*0.1/6,0,Math.PI*2,false);
			ctxBG.stroke();
		}
			ctxBG.closePath();

	ctxBG.fillStyle = getColor(lv, 0.6);



	ctxBG.beginPath();
	

	let a = 0
	let temp = Breaking[key][5];
	let temp1 = Math.floor((Math.max(0.6, ratio) - 0.6) * Breaking[key][3] * 3);
	let temp2 = Math.floor((Math.max(0.6, ratio) - 0.6) * Breaking[key][3] * 3);
	for (let h = 0; h < temp.length; h++) {

		let x2 = x + temp1 * Math.cos((a + temp[h] / 2) * MathPI180);
		let y2 = y + temp2 * Math.sin((a + temp[h] / 2) * MathPI180);

		ctxBG.moveTo(x2, y2);
		ctxBG.arc(x2, y2, rad, (a) * MathPI180, (a + temp[h]) * MathPI180, false);
		a += temp[h];
	}


	ctxBG.closePath();
	ctxBG.fill();		

			

	ctxBG.globalAlpha = 1;
}

function init() {
	console.log("initing");
	if(!muted) {
		bgAudio.play();
		bgPlaying=true;
	}
	clearInterval(menuTicker);

	$("#help").css("display","none");
	$("#cont").css("display","none");
	$("#Title").css("display","none");
	try {
		$("#gameOverCont").remove();
	} catch(e) {
		console.log("running out of time... "+ e);
	}
 	mouseX = 0;
	mouseY = 0;
	moved = false;
	tickSpeed = 20;
	mouseDown = false;
	starAmount = 1000;
	stars = [];
	
	
	ticker = 0;
	
	monsCD = 50;
	monsTicker = -1000;
	renderTicker = 100;
	sunHeight = startSunHeight;
	earthHeight = startEarthHeight;
	Energy=100;
	maxEnergy=100;
	EnergyTick=22;
	EnergyTicker=0;
	earthTemperature=25;
	endScreen=false;
	donMid = false;
	doneEnd = false;
	thePlayer=null;
	Enemies = [];
	curLevel = 0;
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

	highestPossibleDistance =  Math.log(Math.abs(diagLng-Math.min(bw,bh)));
	okayDistance = diagLng/15;

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

	gameCanvasHUD.addEventListener("mousedown",doLightning)
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

	WarningMsg("Survive as long as possible!");


}
function createLightningBolt(x1, y1, x2, y2, turns) {
	var tmp = [];
	//var x2 = 0;
	//var y2 = 0;
	tmp.push([x1, y1]);
	tmp.push([x2, y2]);
	tmp = createTurn(tmp.slice(0), turns);
	//console.log(tmp);
	tmp = addNoise(tmp.slice(0));
	//console.log(tmp);
	//console.log(tmp);
	return tmp;
	//for (var k = 1; k < turns; k++) {
	//	tmp.splice(Math.floor(tmp.length/2)+1,0,createTurn(tmp[k]));
	//}

}
function insertOne(arr) {
	//console.log(arr);
	return [Math.floor((arr[0][0]+arr[1][0])/2),Math.floor((arr[0][1]+arr[1][1])/2)];
}
function addMany(arr,arr2) {
	for (key in arr2) {
		arr.push(arr2[key]);
	}
}
function addNoise(arr) {
	//console.log(arr);
	for (var l = 1; l < arr.length - 1; l++) {
		arr[l][0] += Math.floor(Math.random() * width / 75 - Math.random() * width / 75);
		arr[l][1] += Math.floor(Math.random() * width / 75 - Math.random() * width / 75);
	}
	return arr;
}
function createTurn(arr,n) {
	var tmp = [];
	while (n>0) {
		n--;
		for (var j = arr.length-1; j>0;j-=2) {
			//console.log(j);
			//console.log(arr);
		//	console.log(arr.slice(j,j+2));
			tmp.push([])
			arr.splice(j,0,insertOne(arr.slice(j-1,j+1),n));
			//console.log(arr);
		}
		arr = createTurn(arr.slice(0),n);
		//console.log(arr);

	}
	//console.log(arr);
	return arr;
}
function drawLightningBolt(x1, y1, x2, y2, amount, w) {
	var strikeArray = [];

	strikeArray = createLightningBolt(x1, y1, x2, y2, amount);


	ctxBG.shadowColor = "rgba(155,155,0,0.8)";
	ctxBG.shadowBlur = 15;
	ctxBG.strokeStyle = "rgba(200,200,250,0.5)"; //getDarkerColor(hi,0.8);


	ctxBG.moveTo(strikeArray[0][0], strikeArray[0][1]);
	ctxBG.beginPath();
	for (var m = 1; m < strikeArray.length; m++) {
		ctxBG.lineTo(strikeArray[m][0], strikeArray[m][1]);
		ctxBG.lineWidth = m / 10;
		ctxBG.closePath();
		ctxBG.stroke();
		ctxBG.moveTo(strikeArray[m][0], strikeArray[m][1]);
	}
	ctxBG.shadowColor = "rgba(0,0,0,0)";
	ctxBG.shadowBlur = 0;

}
function doLightning() {
	if (Energy > 10) {
		addBolt(mouseX,mouseY,3,thePlayer.pos.x,thePlayer.pos.y,5);
		increaseEnergy(-10);
		EnergyUps.push([-10,mouseX,mouseY-20,0]);
		dmgPlayer(-10);
	}
}
var lightings = [];
function addBolt(x1, y1, amount, x2, y2, duration) {
	x2 = x2 || width/2;
	y2 = y2 || height/2;
	duration = duration || 5;
	lightings.push([
		x1,
		y1,
		duration,
		x2,
		y2
	]);
}
function drawLightnings() {
	for (var kei = lightings.length - 1; kei >= 0; kei--) {
		lightings[kei][2]--;
		if (lightings[kei][2] > 0) {
			drawLightningBolt(
				Math.floor(lightings[kei][0]), Math.floor(lightings[kei][1]),
				Math.floor(lightings[kei][3]), Math.floor(lightings[kei][4]), 3, 30);
		} else {
			lightings.splice(kei, 1);
		}
	}
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
var monsTicker = -1000;
var imgData;
var data;
var renderTicker = 100;
var sunHeight = 20;
var earthHeight = 50;
var startSunHeight = 20;
var startEarthHeight = 50;
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
var menu = true;
var hotness=0;
var coldness=0;
var menuTicker=null;
var Burning=[];
var highestPossibleDistance;

function menuTick() {
	//console.log("menutick");
	if(warnTicker) {
		warnTicker++;
		if(warnTicker>=warnTick) {
			warnTicker=0;
			$("#warnMsg").html("");
		}
	}
}
var endScreenTick=250;
var paused=false;
function tick() {
	var now = window.performance.now(); // current time in ms

	var deltaTime = now - lastTick; // amount of time elapsed since last tick

	lastTick = now;


	ticker += deltaTime;


	render(doneTicks);

	doneTicks = 0;

	if(paused) {
		ticker=0;doneTicks=0;		
	}
	if(menu) {ticker=0;doneTicks=0;}

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
	cont.id="cont";
	cont.className="123";
	cont.style.margin = width;
	cont.style.marginTop = height*0.4+"px";
	cont.style.marginLeft = width*0.2+"px";
	cont.style.width = width*0.6 + "px";

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
	SettingBut.innerHTML = "Settings";	
	SettingBut.style.width = width*0.3 + "px";
	SettingBut.style.height = height*0.1 + "px";
	SettingBut.style.marginTop = height*0.3 + "px";
	SettingBut.style.marginLeft = width*0.3 + "px";
	SettingBut.style.fontSize = height*0.1 + "px";
	SettingBut.addEventListener("click",openSettings);
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
	HelpBut.addEventListener("click",openHelp);
	HelpBut.id = "Help";
	HelpBut.className = "but";

	cont.append(HelpBut);


let aboutBut = document.createElement("div");
	aboutBut.innerHTML = "About";
	aboutBut.style.width = width*0.3 + "px";
	aboutBut.style.height = height*0.1 + "px";
	aboutBut.style.marginTop = height*0.3 + "px";
	aboutBut.style.marginLeft = width*0.3 + "px";
	aboutBut.style.fontSize = height*0.1 + "px";
	aboutBut.addEventListener("click",openAbout);
	aboutBut.id = "About";
	aboutBut.className = "but";

	cont.append(aboutBut);

	
	return cont;
}
function openHelp() {

	$("#help").css("display","block");
}
function openAbout() {
	$("#about").css("display","block");
}
function openSettings() {
	WarningMsg("Ain't Nobody got Time for that!</br> Read the Manual and Play already!");
}
function startGame(){
	init();
	menu=false;
}
function drawHUD() {
	drawDays();
	//drawEnergy();
	makeBatteryPath();
	drawHealth();
	drawTemp();
}
function drawTemp() {
	let barH = height*0.7;
	let lgr = ctxBG.createLinearGradient(width-60,0,width-60,height);
	let ratio = (earthTemperature+30)/100;
	if (ratio>0.5) {
		ratio = Math.min(ratio,0.999);
	} else {
		ratio = Math.max(0.001,ratio);
	}

	lgr.addColorStop(0,"rgba(255,50,50,0.8)");
	lgr.addColorStop(Math.max(0.001,ratio-0.09),"rgba(155,50,50,0.8)");
	lgr.addColorStop(Math.min(0.999,ratio+0.09),"rgba(50,50,155,0.8)");
	lgr.addColorStop(1,"rgba(50,50,255,0.8)");
	ctxBG.fillStyle=lgr;//"rgba(50,150,50,1)";
	ctxBG.font = "20px 'Anton'";
	ctxBG.strokeStyle="rgba(250,250,250,0.5)";

	  ctxBG.fillRect(width-20-width*0.09,height*0.2,width*0.09,barH);
	ctxBG.strokeRect(width-20-width*0.09,height*0.2,width*0.09,barH);
	let tx = Math.floor(10*earthTemperature)/10+"°C";
	let mTx= ctxBG.measureText(tx).width;
	
	ctxBG.fillStyle="rgba(250,250,250,1)";
	ctxBG.fillText(tx,width-20-width*0.09+(width*0.09-mTx)/2,height*0.2+barH/2);

	ctxBG.fillText("-30°C",width-20-width*0.09,height*0.22+barH + 20);
	ctxBG.fillText("70°C",width-20-width*0.09,height*0.18);
}
function drawHealth() {
	ctxBG.fillStyle="rgba(150,50,50,1)";
	ctxBG.strokeStyle="rgba(250,50,50,0.5)";
	ctxBG.lineWidht="5px";
	let sL = bw - width/6;

	ctxBG.fillRect(sL,20,(width/3)*(health/maxHealth),50);
	ctxBG.strokeRect(sL,20,width/3,50);
	ctxBG.font = "25px 'Anton'";
	let tx = health+"/"+maxHealth;
	let mtx = ctxBG.measureText(tx).width;
	ctxBG.fillStyle="rgba(250,250,250,1)";
	ctxBG.fillText(tx,bw-mtx/2,58);
}
// function drawEnergy() {
// 	makeBatteryPath();
// 	return;
// 	// let barH = height-80;
// 	// ctxBG.fillStyle="rgba(50,150,50,0.5)";
// 	// ctxBG.font = "25px Comic Sans";
// 	// ctxBG.strokeStyle="rgba(50,100,50,1)";
// 	// ctxBG.fillRect(20,60+barH*(1-(Energy/maxEnergy)),100,barH*(Energy/maxEnergy));
// 	// ctxBG.strokeRect(20,60,100,barH);
// 	// let tx = Energy+"/"+maxEnergy;
// 	// let Mtx = ctxBG.measureText(tx).width;
// 	// ctxBG.fillStyle="rgba(250,250,250,1)";
// 	// ctxBG.fillText(tx,20+(100-Mtx)/2,60+barH/2);

// }
function drawDays() {
	ctxBG.fillStyle="rgba(255,255,255,1)";
	//ctxBG.clearRect(0,0,width/2,100);
	ctxBG.font = "30px 'Anton'";
	let tx;
	if (days == 1) {
		tx = days+" Day has passed...";
	} else {
		tx = days+" Days have passed...";
	}
	let ln = ctxBG.measureText(tx).width;
	ctxBG.fillText(tx,width/2-ln/2,105);

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
var BurningDur=34;
function drawBurning() {
	//console.log(Burning);
	if (Burning.length>0) {
		for (let key=Burning.length-1;key>=0;key--) {
			if(!Burning[key][4]) {

				Burning[key][3]+=2;
				if(Burning[key][3]>=BurningDur) {
					//Burning.splice(key,1);
					Burning[key][4]=true;
					drawOneBurn(Burning[key][1],Burning[key][2],Burning[key][0],Burning[key][3])
				} else {
					drawOneBurn(Burning[key][1],Burning[key][2],Burning[key][0],Burning[key][3],Burning[key][4])
				}
			} else {
				Burning[key][3]-=3;
				if(Burning[key][3]<=0) {
					Burning.splice(key,1);
				} else {
					drawOneBurn(Burning[key][1],Burning[key][2],Burning[key][0],Burning[key][3],Burning[key][4])
				}
			}



		}
		
	}
}
function drawOneBurn(x,y,lv,dur,back) {
	let rad;
	if (back) {
 		rad = getRad(lv)*(dur/BurningDur); 
	} else {
		rad = getRad(lv);	
	}
	
	let cl = getColor(lv,1);
	ctxBG.fillStyle = cl;
	drawCircle(ctxBG,x,y,rad,cl);

	ctxBG.fillStyle = "rgba(150,150,0,0.4)";
	ctxBG.beginPath();
	ctxBG.arc(x,y,rad*(1.1+dur/(BurningDur*4)),0,Math.PI*2,0);
	ctxBG.fill();
	ctxBG.fillStyle = "rgba(150,150,0,0.3)";
	ctxBG.arc(x,y,rad*(1.1+dur/(BurningDur*3 )),0,Math.PI*2,0);
	ctxBG.fill();
	ctxBG.fillStyle = "rgba(150,150,0,0.2)";
	ctxBG.arc(x,y,rad*(1.1+dur/(BurningDur*2 )),0,Math.PI*2,0);
	ctxBG.fill();
	ctxBG.fillStyle = "rgba(150,150,0,0.1)";
	ctxBG.arc(x,y,rad*(1.1+dur/(BurningDur*1 )),0,Math.PI*2,0);
	ctxBG.fill();
	ctxBG.fill();
	ctxBG.closePath();
//	drawCircle(ctxBG,x,y,rad,"rgba(150,150,0,1)");
	
}

var sunPulse = 0;
var sunPulseStop = 50;
var sunPulseUp = true;
var sunFlareUp = false;
var sunFlare = 0;
var sunFlareStop = 150; 

var earthFlareUp = false;
var earthFlare = 0;
var earthFlareStop = 50;

function render(doneTicks) {
	ctxBG.clearRect(0,0,width,height);

	starTick();

	


	for (let key in Enemies) {
		//	console.log(key+"drawing at "+Enemies[key].pos.x+","+Enemies[key].pos.y+")");
		let angToPlayer = angle(Enemies[key].pos.x,Enemies[key].pos.y,thePlayer.pos.x,thePlayer.pos.y);
		let radOfEnemy = getRad(Enemies[key].lv);
		let clrOfEnemy; 
		if (!endScreen) {
			clrOfEnemy = getColor(Enemies[key].lv+1,1);
		} else {
			clrOfEnemy = getColor(Enemies[key].lv+1,(1-1*((endScreenTicker+1)/(endScreenTick+1))));
		}


		drawCircle(ctxBG, Enemies[key].pos.x, Enemies[key].pos.y, radOfEnemy, clrOfEnemy);


		let neweX = Enemies[key].pos.x+radOfEnemy*Math.cos(angToPlayer);
		let neweY = Enemies[key].pos.y+radOfEnemy*Math.sin(angToPlayer);
		let rGr3 = ctxBG.createRadialGradient(neweX,neweY,0,neweX,neweY,radOfEnemy*2);
		if (!endScreen) {
			rGr3.addColorStop(0,"rgba(255,255,255,0.5)");
			rGr3.addColorStop(0.8,"rgba(0,0,0,0.5)");
			rGr3.addColorStop(1,"rgba(0,0,0,0.5)");
		} else {
			rGr3.addColorStop(0,"rgba("+Math.floor(255-255*(endScreenTicker+1)/endScreenTick)+","+
										Math.floor(255-255*(endScreenTicker+1)/endScreenTick)+","+
										Math.floor(255-255*(endScreenTicker+1)/endScreenTick)+",0.5)");
			rGr3.addColorStop(0.8,"rgba(0,0,0,0.5)");
			rGr3.addColorStop(1,"rgba(0,0,0,0.5)");
		}
		//(1-(
		drawCircle(ctxBG, Enemies[key].pos.x, Enemies[key].pos.y, 1.05*radOfEnemy, rGr3);
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
		
		ctxBG.fillStyle = "rgba("+  Math.max(0,Math.min(255,((150+20*Math.floor(hotness)))-40*Math.floor(coldness)))+","+
									((150-50*Math.floor(hotness))-40*Math.floor(coldness))+","+
									Math.min(255,(50+10*Math.floor(coldness)))+
									",0.3)";
		//console.log(ctxBG.fillStyle);

		let lrGr = ctxBG.createLinearGradient(thePlayer.pos.x,thePlayer.pos.y,thePlayer.pos.x-Math.cos(ang)*diagLng/3,thePlayer.pos.y-Math.sin(ang)*diagLng/3);
		if (!endScreen) {

			 lrGr.addColorStop(0  , "rgba( 250,   0,   0,  0.3)");
			//lrGr.addColorStop(0.2, "rgba( 150, 150,   0,  0.3)");
			lrGr.addColorStop(0.4, "rgba( 150, 150,   0,  0.3)");
			lrGr.addColorStop(0.7, "rgba( 150, 150,   0,  0.3)");
			lrGr.addColorStop(1  ,"rgba(   0,   0, 100,  0.3)");			
			//lrGr.addColorStop(0.5+0.5*((coldness+1)/(1+highestPossibleDistance)), "rgba(   0,   0, 100,  0.3)");
			//if (coldness>hotness) {
//
//			//	lrGr.addColorStop(1  , "rgba(   0,   0, 100,  0.3)");
//			//} else if (hotness>coldness) {
//			//	lrGr.addColorStop(1  , "rgba( 250,   0,   0,  0.3)");
//			//} else {
//			//	lrGr.addColorStop(1  , "rgba( 150,   150,   0,  0.3)");
			//}
		} else {
			lrGr.addColorStop(0  , "rgba(250,0,0,    "+(0.3-(0.299*endScreenTicker/endScreenTick))+")");
			// lrGr.addColorStop(0.2, "rgba(150,150,0"+(,  -(0.299*endScreenTicker/endScreenTick))+"0.3)");
			lrGr.addColorStop(0.5, "rgba(150,150,0,  "+(0.3-(0.299*endScreenTicker/endScreenTick))+")");
			// lrGr.addColorStop(0.7, "rgba(150,150,0"+(,  -(0.299*endScreenTicker/endScreenTick))+"0.3)");
			lrGr.addColorStop(1  , "rgba(0,0,100,    "+(0.3-(0.299*endScreenTicker/endScreenTick))+")");
		}
		ctxBG.fillStyle=lrGr;
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
		//drawCircle(ctxBG, mouseX, mouseY, thePlayer.lv * earthHeight, "rgba(0,0,0,1)");
		if (earthFlareUp) {
			earthFlare+=5;
			if(earthFlare>=earthFlareStop) {
				earthFlareUp=false;
				earthFlare=0;
				// bgAudio.play();
			}

		} 

		let newX = mouseX+((dist/diagLng)*2*earthHeight)*Math.cos(ang);
		let newY = mouseY+((dist/diagLng)*2*earthHeight)*Math.sin(ang);
		let rGr = ctxBG.createRadialGradient(newX,newY,0,newX,newY,2*earthHeight);
		if (!endScreen) {
			rGr.addColorStop(0,"rgba(0,0,255,1");
			rGr.addColorStop(0.5,"rgba(0,0,0,1)");
			rGr.addColorStop(1,"rgba(0,0,0,1)");
		}
		drawCircle(ctxBG, mouseX, mouseY, thePlayer.lv * earthHeight, rGr);
		if (!endScreen) {
			ctxBG.beginPath();
			ctxBG.strokeStyle="rgba(255,255,255,0.08)";
			ctxBG.arc(mouseX,mouseY,thePlayer.lv*earthHeight*1.01,0,Math.PI*2,0);
			ctxBG.stroke();
			ctxBG.closePath();
			//drawCircle(ctxBG, mouseX, mouseY, thePlayer.lv * earthHeight, "rgba(255,255,255,0.08)");
		}
		if(earthFlareUp) {
			drawCircle(ctxBG,mouseX,mouseY,thePlayer.lv*earthHeight*(1+(earthFlare/earthFlareStop)),"rgba(255,0,0,0.2)");
		}




		if(endScreen) {
			sunHeight = startSunHeight * (1-((endScreenTicker)/endScreenTick));
			sunPulseUp=false;
			sunFlareUp=false;
			sunPulse=0;
			sunFlare=0;
		}
		if (sunPulseUp) {
			sunPulse++;
			if(sunPulse>=sunPulseStop) {
				sunPulseUp=false;
			}

		} else {
			if(sunPulse<=0) {
				sunPulseUp=true;
			} else {

				sunPulse--;
			}
		}

		if (sunFlareUp) {
			sunFlare+=10;
			if(sunFlare>=sunFlareStop) {
				sunFlareUp=false;
			}

		} else {
			if(sunFlare>0) {
				sunFlare=Math.max(0.01,sunFlare-5);
				//sunPulseUp=true;
			}
		}
		if(sunHeight<0) {} else {

			let rGr2 = ctxBG.createRadialGradient(thePlayer.pos.x, thePlayer.pos.y,0,thePlayer.pos.x, thePlayer.pos.y,2*sunHeight);
			rGr2.addColorStop(0,"rgba(255,200,0,1)");
			rGr2.addColorStop(1,"rgba(0,0,0,0)");
			drawCircle(ctxBG, thePlayer.pos.x, thePlayer.pos.y, sunHeight*0.9+sunPulse/10+sunFlare/20, "rgba(255,255,0,"+  0.4+")");
			drawCircle(ctxBG, thePlayer.pos.x, thePlayer.pos.y, sunHeight*1  +sunPulse/10+sunFlare/20, "rgba(255,255,0,"+(0.3/*+sunFlare/250*/)+")");
			drawCircle(ctxBG, thePlayer.pos.x, thePlayer.pos.y, sunHeight*1.1+sunPulse/10+sunFlare/20, "rgba(255,255,0,"+0.2+")");
			drawCircle(ctxBG, thePlayer.pos.x, thePlayer.pos.y, sunHeight*1.2+sunPulse/10+sunFlare/20, "rgba(255,255,0,"+0.1+")");
			drawCircle(ctxBG, thePlayer.pos.x, thePlayer.pos.y, sunHeight, rGr2);
		}

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
	drawBurning();
	drawBreaking();
	drawLightnings();
	drawEnergy();
	drawDaysOver();
	drawHP();
		drawHUD();

}
function makeBatteryPath() {
	ctxBG.save();
	ctxBG.fillStyle="rgba(50,155,50,0.7)";
	
	ctxBG.strokeStyle="rgba(05,105,05,0.8)";
	ctxBG.lineWidth="5px";
	ctxBG.beginPath();
	let blX = width*0.01;
	let blY = height-height*0.1;

	ctxBG.moveTo(blX,blY);

	let tlX1 = width*0.01;
	let tlY1 = height*0.3;

	ctxBG.lineTo(tlX1,tlY1);

	let tlX2 = width*0.046;
	let tlY2 = tlY1;

	ctxBG.lineTo(tlX2,tlY2);

	let ttlX = tlX2;
	let ttlY = height*0.27;

	ctxBG.lineTo(ttlX,ttlY);

	let ttrX = width*0.074;
	let ttrY = ttlY; 

	ctxBG.lineTo(ttrX,ttrY);

	let trX2 = ttrX;
	let trY2 = tlY1; 

	ctxBG.lineTo(trX2,trY2);

	let trX1 = width*0.11;
	let trY1 = trY2; 

	ctxBG.lineTo(trX1,trY1);

	let brX = trX1;
	let brY = blY; 

	ctxBG.lineTo(brX,brY);

	ctxBG.lineTo(blX,blY);

	ctxBG.clip();
	ctxBG.fillRect(width*0.01,height*0.25+height*0.74*(1-(Energy/maxEnergy)),width*0.1,height*0.74*(Energy/maxEnergy));
	ctxBG.stroke();

	ctxBG.strokeStyle="rgba(255,255,255,0.1)";
	ctxBG.lineWidth="50";
	ctxBG.stroke();
	ctxBG.closePath();
	ctxBG.restore();

	ctxBG.strokeStyle="rgba(255,255,255,0.3)";
	ctxBG.lineWidth="10px";
	ctxBG.stroke();


	ctxBG.font = "20px 'Anton'";
	let tx = Energy+" / "+maxEnergy;
	let Mtx = ctxBG.measureText(tx).width;
	ctxBG.fillStyle="rgba(250,250,250,1)";
	ctxBG.fillText(tx,width*0.01+(width*0.1-Mtx)/2,height*0.25+(height*0.74-20)/2);
}
function angle(p1x, p1y, p2x, p2y) {

	return Math.atan2(p2y - p1y, p2x - p1x);

}
var warnTicker = 0;
var warnTick = 40;
function WarningMsg(txt) {
	if (!endScreen) {

		let msg = document.createElement("div");
		msg.className= "msg";
		msg.innerHTML= txt;
		msg.style.position= "absolute";
		msg.style.bottom = height*0.1+"px";
		$("#warnMsg").html(msg);
		warnTicker=1;
	}
}
function gameOver(txt){
	console.log(Enemies);
	endScreen=true;
	bgAudio.pause();
	bgPlaying=false;
	let cont = document.createElement("div");
	cont.style.position = "absolute";
	cont.style.left ="0px";
	cont.id = "gameOverCont";
	cont.style.top = "0px";
	cont.style.width ="100%"; 
	cont.style.height="100%";
	$("#warnMsg").html("");

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
	if (earthTemperature>25) {
		if (earthTemperature>70) {
			gameOver("Your Earth Burned!")
		} else if (earthTemperature > 50) {
			WarningMsg("Earth running Hot!")
		} 
		
	} else {
		if (earthTemperature<-30) {
			gameOver("Your Earth Froze!");
		} else if (earthTemperature<-10) {
			WarningMsg("Earth getting too Cold!");
		}
		
	}
}
function movePlayer() {
	calcForcePlayer();
	calcTemp();
	applyForcePlayer();
}

var sunTooCloseTicker=0;
var tooCloseTick=100;
var sunTooFarTicker=0;

function calcForcePlayer() {
	thePlayer.mot.x *= 0.999;
	thePlayer.mot.y *= 0.999;
	let mouseDist = Distance(thePlayer.pos.x, thePlayer.pos.y, mouseX, mouseY);
	let distDiff = mouseDist - Math.min(bw,bh);
	if (Math.abs(distDiff)>okayDistance) {
		if (distDiff<0) {
			earthTemperature += 0.01*Math.log(Math.abs(distDiff));
			hotness=Math.log(Math.abs(distDiff));
			coldness=0;
		//	console.log("tooHot");
			sunTooCloseTicker++
			if (sunTooCloseTicker>=tooCloseTick) {
				WarningMsg("Sun too Close to Earth!");
				sunTooCloseTicker=0;
			}
			
		} else if (distDiff>0) {
			earthTemperature -= 0.01*Math.log(Math.abs(distDiff));
			hotness=0;
			coldness=Math.log(Math.abs(distDiff));;
		//	console.log("too cold");
			sunTooFarTicker++
			if (sunTooFarTicker>=tooCloseTick) {
				WarningMsg("Sun too Far from Earth!");
				sunTooFarTicker=0;
			}
		}
	} else {
		hotness=0;
		//console.log("were good");
		coldness=0;
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
				increaseEnergy(dayOverReward);
				daysOver.push([dayOverReward,width*0.64,height*0.5,0]);
				// Energy+=10;
				
			}
		} 
	}
}
var dayOverReward = 10;
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
var endScreenTicker=0;

function step() {
	if(warnTicker) {
		warnTicker++;
		if(warnTicker>=warnTick) {
			warnTicker=0;
			$("#warnMsg").html("");
		}
	}
	if (!endScreen) {
		
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
			Energy-=2;
			if (Energy < 0 ) {
				gameOver("You ran out of Energy! :(")
			} else 
			if (Energy < 15) {
				WarningMsg("Low Energy!")
			} 
		}
		if (thePlayer) {

			movePlayer();
		}
		moveEnemies();
		checkColls();
		killAndFuse();
	} else {
		if (endScreenTicker<endScreenTick) {

			endScreenTicker++;
		} 
	}
}



function Distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

function myMouseMove(e) {
	//console.log(e);
	if (!mouseDown && !paused) {
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
	if (lv<0) {

		health=Math.min(maxHealth,health-lv);
	} else {
		health=Math.min(maxHealth,health-lv);
	}
	hpDowns.push([lv,mouseX,mouseY,0]);
	if (health<=0) {
		gameOver("Oh Dear! One Asteroid too many!");
	}
}
function increaseEnergy(am) {
	if(am<0) {
		Energy+=am;
	} else {
		Energy=Math.min(maxEnergy,Energy+am);
	}
	
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
					if (earthFlare==0) {

						dmgPlayer(Enemies[key].lv+1);
					}
					earthFlareUp=true;
					if (!muted) {
						hitAudio.play();
					}
					
					// bgAudio.pause();
					//bgAudio.playbackRate*=0.9;
					

					//earthHeight -= Enemies[key].lv;
					let temp1 = Math.max(120, (Math.floor(Math.random() * 160)));
					let temp2 = Math.max(90, (Math.floor(Math.random() * 170)));
					if (Breaking.length > 20) {
						Breaking.splice(0, 1);
					}
					Breaking.push([
						getRad(Enemies[key].lv), //radius
						Enemies[key].pos.x, //x
						Enemies[key].pos.y, //y
						0, //??
						Enemies[key].lv, //lv
						[
							temp1,
							temp2,
							360 - temp1 - temp2
						] /*Math.floor(Math.random()*90)+1*/
					]);
					killList.push(key);
					//Enemies.splice(key, 1);
					don = addUnique(don.slice(0),key);

				} else if (Distance(thePlayer.pos.x, thePlayer.pos.y, Enemies[key].pos.x, Enemies[key].pos.y) < rad + sunHeight) {
					if (Enemies[key].lv == 1) {
						//sunHeight = Math.min(height/5,sunHeight+10);
						Burning.push([Enemies[key].lv,Enemies[key].pos.x,Enemies[key].pos.y,0,false]);
						//console.log(Burning[0]);
						if (!muted) {
							burnAudio.play();
						}
						sunFlareUp=true;
						killList.push(key);
						let temp1 = Math.max(120, (Math.floor(Math.random() * 160)));
					let temp2 = Math.max(90, (Math.floor(Math.random() * 170)));
					if (Breaking.length > 20) {
						Breaking.splice(0, 1);
					}
						Breaking.push([
						getRad(Enemies[key].lv), //radius
						Enemies[key].pos.x, //x
						Enemies[key].pos.y, //y
						0, //??
						Enemies[key].lv, //lv
						[
							temp1,
							temp2,
							360 - temp1 - temp2
						] /*Math.floor(Math.random()*90)+1*/
					]);
						increaseEnergy(1);
						EnergyUps.push([1,Enemies[key].pos.x,Enemies[key].pos.y,0]);
						//Enemies[key].mot.x += 0.9*thePlayer.mot.x;
						//Enemies[key].mot.y += 0.9*thePlayer.mot.y;
						//don = addUnique(don.slice(0),key);
						continue;
					} else {
						Burning.push([Enemies[key].lv,Enemies[key].pos.x,Enemies[key].pos.y,0,false]);
						if (!muted) {
							burnAudio.play();
						}
						sunFlareUp=true;
						killList.push(key);
						let temp1 = Math.max(120, (Math.floor(Math.random() * 160)));
					let temp2 = Math.max(90, (Math.floor(Math.random() * 170)));
					if (Breaking.length > 20) {
						Breaking.splice(0, 1);
					}
						Breaking.push([
						getRad(Enemies[key].lv), //radius
						Enemies[key].pos.x, //x
						Enemies[key].pos.y, //y
						0, //??
						Enemies[key].lv, //lv
						[
							temp1,
							temp2,
							360 - temp1 - temp2
						] /*Math.floor(Math.random()*90)+1*/
					]);
						increaseEnergy(Enemies[key].lv+1);
						EnergyUps.push([Enemies[key].lv+1,Enemies[key].pos.x,Enemies[key].pos.y,0]);
						//If just knock lvl down
						//Enemies[key].lv--;
						//Enemies[key].mot.x += 0.6*thePlayer.mot.x;
						//Enemies[key].mot.y += 0.6*thePlayer.mot.y;



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
		//console.log(xAvg+";"+yAvg+";"+xMotAvg+";"+yMotAvg);
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