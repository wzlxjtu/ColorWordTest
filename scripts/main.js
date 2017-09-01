
// game duration
var duration = 15; // in seconds
// time for per answer
var RT = 5, adaptiveRT = 5; // response time in seconds
var lambda = 0.7; // the rate to update the adaptive response time
var currTime, currResponse;
var score;
var timing;
var colors = ["Blue", "Orange", "Yellow","Purple","Red","Green"];
var i_color = [0,1,2,3,4,5]; // color index
var i_button = [0,1,2,3]; // button index

getGUI();
hideGUI();

function startGame() {
	score = 0;
	currTime = 0;
	currResponse = 0;
	durationUpdate();
	setup();
}
function setup() {
	clearTimeout(timing);
	adaptiveRT = adaptiveRT < 2 ? 2 : adaptiveRT;
	adaptiveRT = adaptiveRT > 5 ? 5 : adaptiveRT;
	if (checkBox2.checked == true)
		timing = window.setTimeout(failed, adaptiveRT * 1000);
	else
		timing = window.setTimeout(failed, RT * 1000);
	document.getElementById("score2").innerHTML = score;
	start.style.visibility = "hidden";
	showGUI();
	// Shuffle the random numbers
	// Let i_color[0] be the right anwer
	i_color = shuffle(i_color);
	i_button = shuffle(i_button);
	right_anwer = colors[i_color[0]];
	// hint: choose color (0) or word (1)?
	var hint = Math.floor(Math.random() * 2);
	if (hint == 0) {
		document.getElementById("choose2").innerHTML = "COLOR";
		target.innerHTML = colors[Math.floor(Math.random() * colors.length)];
		target.style.color = right_anwer;
	}
	else {
		document.getElementById("choose2").innerHTML = "WORD";
		target.innerHTML = right_anwer;
		target.style.color = colors[Math.floor(Math.random() * colors.length)];
	}
	button0.innerHTML = colors[i_color[i_button[0]]];
	button1.innerHTML = colors[i_color[i_button[1]]];
	button2.innerHTML = colors[i_color[i_button[2]]];
	button3.innerHTML = colors[i_color[i_button[3]]];
	// When the checkbox is on, the game runs in congruent mode
	if (checkBox1.checked == true) {
		// random mode
		// button0.style.color = colors[Math.floor(Math.random() * colors.length)];
		// button1.style.color = colors[Math.floor(Math.random() * colors.length)];
		// button2.style.color = colors[Math.floor(Math.random() * colors.length)];
		// button3.style.color = colors[Math.floor(Math.random() * colors.length)];
		// congruent mode
		document.getElementById("choose2").innerHTML = "WORD";
		target.innerHTML = right_anwer;
		target.style.color = right_anwer;
		button0.style.color = colors[i_color[i_button[0]]];
		button1.style.color = colors[i_color[i_button[1]]];
		button2.style.color = colors[i_color[i_button[2]]];
		button3.style.color = colors[i_color[i_button[3]]];
	}
	else {
		button0.style.color = "white";
		button1.style.color = "white";
		button2.style.color = "white";
		button3.style.color = "white";
	}
}
function durationUpdate() {
    var perc = 100 - Math.round((currTime/(duration*1000))*100);
      if (perc >= 0) {
		  currTime += 20;
		  currResponse += 20;
		  if (checkBox2.checked == true)
			  counter.innerHTML = parseFloat(adaptiveRT - currResponse / 1000).toFixed(1);
		  else
			  counter.innerHTML = parseFloat(RT  - currResponse / 1000).toFixed(1);		  
		  document.getElementById("progress-bar-fill").style.width = perc + "%";
		  setTimeout(durationUpdate, 20);
      }
	  else {
		  // When GAME OVER
		  setTimeout(clearTimeout(timing), 100);
		  hideGUI();
		  score1.style.visibility = "visible";
		  start.style.visibility = "visible";
		  start.innerHTML = "Restart";
		  start.style.textAlign="center";
		  adaptiveRT = 5;
	  }
}
function failed() {
	currResponse = 0;
	adaptiveRT = lambda*adaptiveRT + (1-lambda)*5;
	score--;
	sound.play();
	cat2.style.visibility="visible";
	setup();
}
// get element id on GUI
function getGUI() {
	counter = document.getElementById("counter");
	choose1 = document.getElementById("choose1");
	score1 = document.getElementById("score1");
	start = document.getElementById("start");
	target = document.getElementById("target");
	sound = document.getElementById('sound');
	cat = document.getElementById("cat");
	cat2 = document.getElementById("cat2");
	button0 = document.getElementById("button0");
	button1 = document.getElementById("button1");
	button2 = document.getElementById("button2");
	button3 = document.getElementById("button3");
}
function hideGUI() {
	counter.style.visibility="hidden";
	target.style.visibility="hidden";
	cat.style.visibility="hidden";
	cat2.style.visibility="hidden";
	choose1.style.visibility="hidden";
	score1.style.visibility="hidden";
	button0.style.visibility="hidden";
	button1.style.visibility="hidden";
	button2.style.visibility="hidden";
	button3.style.visibility="hidden";
}
function showGUI() {
	counter.style.visibility="visible";
	target.style.visibility = "visible";
	choose1.style.visibility = "visible";
	score1.style.visibility = "visible";
	button0.style.visibility="visible";
	button1.style.visibility="visible";
	button2.style.visibility="visible";
	button3.style.visibility="visible";
}
function updateOnClick(answer) {
	cat2.style.visibility="hidden";
	if (answer == true) {
		score++;
		cat.style.visibility="hidden";
		currTime = Math.max(currTime - 4000, 0);
		adaptiveRT = lambda*adaptiveRT + (1-lambda)*currResponse/1000;
	}
	else {
		score--;
		sound.play();
		cat.style.visibility="visible";
	}
	currResponse = 0;
	setup();
}
function b0_click() {
	updateOnClick(button0.innerHTML === right_anwer);
}
function b1_click() {
	updateOnClick(button1.innerHTML === right_anwer);
}
function b2_click() {
	updateOnClick(button2.innerHTML === right_anwer);
}
function b3_click() {
	updateOnClick(button3.innerHTML === right_anwer);
}
// shuffle the numbers
function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

