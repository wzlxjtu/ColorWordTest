
var timing;
var colors = ["Blue", "Orange", "Yellow","Purple","Red","Green"];

var i_color = [0,1,2,3,4,5]; // color index
var i_button = [0,1,2,3]; // button index

choose1 = document.getElementById("choose1");
start = document.getElementById("start");
target = document.getElementById("target");
cat = document.getElementById("cat");
cat2 = document.getElementById("cat2");
button0 = document.getElementById("button0");
button1 = document.getElementById("button1");
button2 = document.getElementById("button2");
button3 = document.getElementById("button3");
cat.style.visibility="hidden";
cat2.style.visibility="hidden";
choose1.style.visibility="hidden";
button0.style.visibility="hidden";
button1.style.visibility="hidden";
button2.style.visibility="hidden";
button3.style.visibility="hidden";

function setup() {
	clearTimeout(timing);
	timing = window.setTimeout(failed, 5000);
	start.style.visibility = "hidden";
	choose1.style.visibility = "visible";
	button0.style.visibility="visible";
	button1.style.visibility="visible";
	button2.style.visibility="visible";
	button3.style.visibility="visible";
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
	button0.style.color = colors[Math.floor(Math.random() * colors.length)];
	button1.innerHTML = colors[i_color[i_button[1]]];
	button1.style.color = colors[Math.floor(Math.random() * colors.length)];
	button2.innerHTML = colors[i_color[i_button[2]]];
	button2.style.color = colors[Math.floor(Math.random() * colors.length)];
	button3.innerHTML = colors[i_color[i_button[3]]];
	button3.style.color = colors[Math.floor(Math.random() * colors.length)];
}
function failed() {
	cat2.style.visibility="visible";
	setup();
}
function b0_click() {
	cat2.style.visibility="hidden";
	if (button0.innerHTML === right_anwer)
		cat.style.visibility="hidden";
	else{
		cat.style.visibility="visible";
	}
	setup();
}
function b1_click() {
	cat2.style.visibility="hidden";
	if (button1.innerHTML === right_anwer)
		cat.style.visibility="hidden";
	else
		cat.style.visibility="visible";
	setup();
}
function b2_click() {
	cat2.style.visibility="hidden";
	if (button2.innerHTML === right_anwer)
		cat.style.visibility="hidden";
	else
		cat.style.visibility="visible";
	setup();
}
function b3_click() {
	cat2.style.visibility="hidden";
	if (button3.innerHTML === right_anwer)
		cat.style.visibility="hidden";
	else
		cat.style.visibility="visible";
	setup();
}
// shuffle the numbers
function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

