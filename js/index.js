const container = document.querySelector('.game');
let selections = [];
let answers = [];
let corrects = [];
let seconds = 30;
let count = 0;


function createCards () {
  const card = document.createElement('button');
  const cardBG = document.createElement('img');
  cardBG.setAttribute('src', './images/Memory Brain.png');
  cardBG.classList.add('img-bg');
  card.appendChild(cardBG);
  container.appendChild(card);
  return card;
}

function cronometers(){
	// activar las tarjetas

	document.getElementById("init").style.visibility = "hidden";
	document.getElementById("reload").style.visibility = "visible";
  document.getElementById("game").style.visibility = "visible";
  document.getElementById("game").style.position = "relative";
  document.getElementById("gameOver").style.visibility = "hidden";
  document.getElementById("gameOver").style.display = "none";
	seconds = 30;
	count = setInterval( function() {
		--seconds;
		if (seconds >= 10){
			document.getElementById("span").innerHTML = seconds;
		} else {
			document.getElementById("span").innerHTML = "0" + seconds;
		}
    if (seconds <= 0) {
      location.href = "./index.html";
    }

	}, 1000);
}

function reloadCronometer(){
	clearInterval(count);
	document.getElementById("init").style.visibility = "visible";
	document.getElementById("reload").style.visibility = "hidden";

	// clean Variables
	//claseDos = '';
	//claseUno = '';
	//contador = 0;
	//memoria = 0;
	//parDos = '';
	//parUno = '';
	seconds = 30;

	// desactivar las tarjetas
}

function selectBG (cardV, card) {
  switch(cardV) {
    case 0:
      card.children[0].setAttribute('src', './images/card1.jpg')
      break
      case 1:
        card.children[0].setAttribute('src', './images/card2.jpg')
      break
      case 2:
        card.children[0].setAttribute('src', './images/card3.jpg')
        break
      default:
        card.children[0].setAttribute('src', './images/Memory Brain.png')
  }
}

function selectCard(cardV, card) {
  selectBG(cardV, card)
  answers.push(cardV)
  answers.push(card)
  console.log(card)
  card.setAttribute('disabled', true)
  console.log(cardV)
  if (answers.length === 4) {
    if (answers[0] === answers[2]) {
      corrects.push(answers[1])
      corrects.push(answers[3])
      answers = []
      if(corrects.length === 6) {
        document.querySelector('.final-message').classList.add('show');
      }
    } else {
      console.log(answers[2])
      console.log('Fallaste')
      answers[1].removeAttribute('disabled')
      answers[3].removeAttribute('disabled')
      setTimeout(() => {
        selectBG(null, answers[1])
        selectBG(null, answers[3])
        answers = []
      }, 1000)
    }
  }
}

while(selections.length < 6) {
  const numberRandom = Math.floor(Math.random() * (3 + 0))
  if (selections.length === 0) {
    selections.push(numberRandom)
  } else {
    selections.push(numberRandom)
    let sec = selections.reduce(function(acc, act) {
      if(acc[act]) {
        acc[act]++
      }else {
        acc[act] = 1
      }
      return acc
    }, {})
    if (sec[numberRandom] > 2){
      selections.pop()
    }
  }
}

console.log(selections)
selections.map(function(cardV) {
  const card = createCards();
  card.addEventListener('click', () => selectCard(cardV, card))
})

document.getElementById("init").addEventListener("click", cronometers);
document.getElementById("reload").addEventListener("click", reloadCronometer);
