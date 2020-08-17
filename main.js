const startButton = document.querySelector('.start-button');
const nameInput = document.getElementById('name-input');
const mainTitle = document.querySelector('.main-title');
const timer = document.querySelector('.timer');
const gameTimer = document.querySelector('.game-timer');
const sentencePlace = document.querySelector('.sentence');
const mobileInput = document.getElementById('mobile-keyboard-input');

let sentences = [
	'Robert was a good king',
	'After the death of the king, everyone wanted to be a king',
	'They started plotting against him',
	'My mother hemmed and hawed over where to go for dinner',
	'He was eating and talking',
	'We met near the Tomb of the Unknown Soldier',
	'Jack and Jill went up a hill',
	'You have to dream to make your dream come true',
];

let playerName;
let time;
let score;
let letterPosition;
let sentence;

function setNameField() {
	startButton.style.display = 'none';
	nameInput.style.display = 'block';
	document.querySelector('.input-button').style.display = 'block';
}

nameInput.addEventListener('keypress', (e) => {
	if (e.code == 'Enter') {
		playerName = nameInput.value;
		setTimer();
	}
});

function setTimer() {
	if (!nameInput.value) {
		playMissSound();
		nameInput.style.borderStyle = 'solid';
		nameInput.style.borderColor = 'red';
		nameInput.style.boxShadow = '0 0 10px red';
		nameInput.placeholder = 'Please, enter your name';
		return;
	}
	try {
		mainTitle.remove();
		nameInput.remove();
		startButton.remove();
		document.querySelector('.input-button').remove();
	} catch (error) {}
	sentencePlace.style.display = 'none';
	sentencePlace.textContent = '';
	document.querySelector('.restart-button').style.display = 'none';
	time = 3;
	timer.textContent = time;
	timer.style.display = 'inline';
	timer.parentElement.style.margin = 'auto';
	playSelectSound();
	let readyTimerInterval = setInterval(() => {
		if (time == 0) {
			playGoSound();
			timer.style.display = 'none';
			clearInterval(readyTimerInterval);
			gameStart(playerName);
			return;
		}
		playSelectSound();
		timer.textContent = --time;
	}, 1000);
}

function gameStart(playerName) {
	setGameTimer();
	if (!mobileInput.style.display) {
		mobileInput.focus();
	}
	sentencePlace.style.display = 'block';
	sentence = generateNewSentence();
	letterPosition = -1;
	score = 0;
	document.addEventListener('keypress', keyPressed);
}

function keyPressed(e) {
	letterPosition++;
	const letterElement = document.getElementById(`letter-pos:${letterPosition}`);
	if (e.key == sentence[letterPosition]) {
		playHitSound();
		if (letterElement.textContent == ' ') {
			letterElement.style.backgroundColor = 'green';
		} else {
			letterElement.style.color = 'green';
		}
		score++;
	} else {
		playMissSound();
		if (letterElement.textContent == ' ') {
			letterElement.style.backgroundColor = 'firebrick';
		}
		letterElement.style.color = 'firebrick';
		score--;
	}
	if (letterPosition == sentence.length - 1) {
		sentences.splice(sentences.indexOf(sentence), 1);
		sentence = generateNewSentence();
		letterPosition = -1;
	}
}

function setGameTimer() {
	time = 60;
	gameTimer.textContent = time;
	gameTimer.style.display = 'inline';
	gameTimer.style.fontSize = '50px';
	let gameTimerInterval = setInterval(() => {
		gameTimer.textContent = time;
		if (time == -1) {
			clearInterval(gameTimerInterval);
			gameEnd();
		}
		time--;
	}, 1000);
}

function gameEnd() {
	document.removeEventListener('keypress', keyPressed);
	gameTimer.style.display = 'none';
	sentencePlace.textContent = `Time is up! You scored ${score} points!`;
	document.querySelector('.restart-button').style.display = 'block';
}

function generateNewSentence() {
	const spanElements = document.getElementsByTagName('span');
	Array.from(spanElements).forEach((element) => {
		element.remove();
	});
	let = sentencePosition = Math.floor(Math.random() * sentences.length);
	let sentence = sentences[sentencePosition];
	for (let letterPos = 0; letterPos < sentence.length; letterPos++) {
		const letterElement = document.createElement('span');
		letterElement.setAttribute('id', `letter-pos:${letterPos}`);
		sentencePlace.append(letterElement);
		document.getElementById(`letter-pos:${letterPos}`).textContent = sentence[letterPos];
	}
	return sentence;
}

function playSelectSound() {
	new Audio('Sounds/select.wav').play();
}

function playGoSound() {
	new Audio('Sounds/go.wav').play();
}

function playHitSound() {
	new Audio('Sounds/keyboardHit.mp3').play();
}

function playMissSound() {
	new Audio('Sounds/missclick.wav').play();
}
