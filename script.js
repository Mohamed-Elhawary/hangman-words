/*global document*/

//first, show the characters inside spans and show the spans inside the letters Div

let letters      = "abcdefghijklmnopqrstuvwxyz",
    lettersArray = Array.from(letters),
    lettersDiv   = document.querySelector(".letters");

lettersArray.forEach(letter => {
	let letterSpan = document.createElement('span'),
		spanText   = document.createTextNode(letter);
	letterSpan.appendChild(spanText);
	lettersDiv.appendChild(letterSpan);
	letterSpan.className = "box";
});


//second, create the categories and thier values
const categories = {
    programming_language:
	
	["php","javascript","go","scala","fortran","r","mysql","python","java","c","ruby"],
	
    movies:     
	["Prestige","Inception","parasite","Interstellar","Whiplash","Memento","Coco","Up","avatar","spider man","transformers","the matrix","Iron Man","frozen","skyfall","joker","Spectre","toy story","seven","seven pounds","wonder woman","thor","venom","aquaman","mission impossible","avengers","suicide squad"],
    
	famous_people:
	
	["Albert Einstein","Hitchcock","Alexander","Cleopatra","Mahatma Ghandi","brad pitt","kim kardashian", "zidan","marilyn moroe","madonna","rihanna","natalia portman","donald trump","tom cruise","david beckham","kate hudson","bruce willis","van diesel","katy perry", "selena gomez","barck obama","nicolas cage","cameron diaz","ben affleck","ahmed zweil", "elon musk","calvin harris","george clooney",""],
    
	countries:  
	["Syria","Palestine","Yemen","Egypt","Bahrain","Qatar","brazil","india","china","indonesia","nigeria","japan","vietnam","turkey","mexico","united states","iran","france","south korea","united kingdom","thailand","germany","england","congo","tanzania","kenya","spain","colombia","uganda","sudan","ukrania","peru","malaysia","uzbekistan","angola","iraq","morocco","algeria","mozambique","afghanistan","saudi arabia","argentina","ghana","australia","mali","chile","cameroon","niger","chile","tunisia","benin","sengal","zambia","portugal","sweden","greece","hungary","cuba","bolivia","belgium","jordan","serbia","libya","lebanon","switzerland","paraguay","bulgaria","togo","denmark","finland","oman","norway","slovakia","costa rica","salvador","croatia","panama","armenia","kuwait","ireland","liberia"]
}

//third, create the random value.
let keysArray         = Object.keys(categories),
	randomKeyIndex    = Math.floor(Math.random() * keysArray.length),
	randomKey         = keysArray[randomKeyIndex],
	randomKeyValues   = categories[randomKey],
	randomValueIndex  = Math.floor(Math.random() * randomKeyValues.length),
	randomValue       = randomKeyValues[randomValueIndex],
	
    //put the category name of the random value in the span inside the #word div above
	wordDivSpan       = document.querySelector("#word span").innerHTML = randomKey;
	
	
//fourth, create the randomValueArray, and set the charcaters in the spans inside the guess div.
let guessDiv         = document.querySelector(".guess"),
	randomValueArray = Array.from(randomValue.toLowerCase());
randomValueArray.forEach(char => {
	let guessSpan = document.createElement('span');
	if (char == " ") {
		guessSpan.className = "space";
		guessDiv.setAttribute("space", "space");
	}
	guessDiv.appendChild(guessSpan);
});

/*fifth, check the clicked letter with the letter in the randomvalue and if true, set it in the guess spans*/
let guessSpans = document.querySelectorAll(".guess span"),
	hangmanImg = document.querySelector(".draw-container"),
	wrongTries = 0,
	rightTries = 0;

document.addEventListener("click", (e) => {
	if(e.target.className == "box") {
		let status = false;
		console.log(status);
		e.target.classList.add("clicked");
		let clickedLetter = e.target.innerHTML.toLowerCase();
		randomValueArray.forEach((char, charIndex) => {
			if(clickedLetter == char) {
				status = true;
				console.log(status);
				guessSpans.forEach((span, spanIndex) => {
					if (charIndex == spanIndex) {
						span.innerHTML = clickedLetter;
						rightTries++;

					}
				});
			}
		});
		
		//sixth, what happens if wrong try or if correct try & if lose or if win.
		//we are outside the forEach loops now.
		
		//1-if wrong try
		if(status != true) {
			wrongTries++;
			hangmanImg.classList.add(`wrong-no${wrongTries}`);
			document.getElementById('fail').play();
			
			//2-if lose
			if (wrongTries == 8) {
				lettersDiv.classList.add("unclickable");
				document.getElementById("lose").play();
				loseGame();
			}
		//3-if correct try	
		} else {
			document.getElementById("success").play();
		}
		//4-if win
		if (rightTries == guessSpans.length || rightTries == guessSpans.length -1 && guessDiv.hasAttribute('space')) {
			lettersDiv.classList.add("unclickable");
			document.getElementById("win").play();
			winGame();
		}			
	}
	
});


//seventh the lose game function
function loseGame() {
	let loseGameDiv     = document.createElement("div"),
	    youLoseSpan     = document.createElement("span"),
    	tryAgainSpan    = document.createElement("span"),
		theWordSpan     = document.createElement("span"),
		
		youLoseSpanText  = document.createTextNode("You Lose the Game, The Hangman died"),
		tryAgainSpanText = document.createTextNode("Try Again 1?"),
		theWordSpanText  = document.createTextNode(`The Word is : ${randomValue.toUpperCase()}`);
	
	loseGameDiv.className  = "lose-game";
	youLoseSpan.className  = "you-lose";
	tryAgainSpan.className = "try-again";
	theWordSpan.className  = "word";
	
	youLoseSpan.appendChild(youLoseSpanText);
	tryAgainSpan.appendChild(tryAgainSpanText);
	theWordSpan.appendChild(theWordSpanText);
	
	loseGameDiv.appendChild(youLoseSpan);
	loseGameDiv.appendChild(tryAgainSpan);
	loseGameDiv.appendChild(theWordSpan);
	
	document.body.appendChild(loseGameDiv);
	
	document.addEventListener("click", (e) => {
		if (e.target.className == "try-again") {
			window.location.reload();
		}
	});
}

//eight, the win Game game function
function winGame() {
	let winGameDiv        = document.createElement("div"),
	    youWinSpan        = document.createElement("span"),
    	playAgainSpan     = document.createElement("span"),
		youWinSpanText    = document.createTextNode("You Win the Game, Congratulation"),
		playAgainSpanText = document.createTextNode("Play Again ??");
		
	winGameDiv.className = "win-game";
	youWinSpan.className = "you-win";
	playAgainSpan.className = "play-again";
	
	youWinSpan.appendChild(youWinSpanText);
	playAgainSpan.appendChild(playAgainSpanText);
	winGameDiv.appendChild(youWinSpan);
	winGameDiv.appendChild(playAgainSpan);
	
	document.body.appendChild(winGameDiv);
	
	document.addEventListener("click", (e) => {
		if (e.target.className == "play-again") {
			window.location.reload();
		}
	});
}

//eight, the try another word button
document.getElementById("button").onclick = function() {
	window.location.reload();
}