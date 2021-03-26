// Todo:
// Num keypad to play - transparent numbers on game
// dark mode
// console.table game at end
// timer at console

const qSelector = div => {
  return document.querySelectorAll(div)
}

let cols = qSelector('.col');

const reset = () => {
  cols.forEach(col => {
    col.innerHTML = '<p class="placeholder">_</p>'
  })
}
reset();

let playerAName = 'Player A';
let playerANameDiv = qSelector('#playerAName')[0];
playerANameDiv.innerText = playerAName;
let playerAPoints = '0'
let playerAPointsDiv = qSelector('#playerAPoints')[0];
playerAPointsDiv.innerText = playerAPoints;
playerANameDiv.addEventListener('click', (ev) => {
  ev.preventDefault();
  playerAName = prompt('Player A name:')
  if (playerAName != '') {
    playerANameDiv.innerText = playerAName;
  }
})


let playerBName = 'Player B';
let playerBNameDiv = qSelector('#playerBName')[0];
playerBNameDiv.innerText = playerBName;
let playerBPoints = '0'
let playerBPointsDiv = qSelector('#playerBPoints')[0];
playerBPointsDiv.innerText = playerBPoints;
playerBNameDiv.addEventListener('click', (ev) => {
  ev.preventDefault();
  playerBName = prompt('Player B name:')
  if (playerBName != '') {
    playerBNameDiv.innerText = playerBName;
  }
})

let round = 1;
let roundDiv = qSelector('#round')[0]
roundDiv.innerText = round
let playerTurn = 'X';

let textTurn = ' - Your turn'
qSelector('#playerAturn')[0].innerText = textTurn
const changePlayer = () => {
  if (playerTurn == 'X') {
    playerTurn = 'O'
    qSelector('#playerBturn')[0].innerText = textTurn
    qSelector('#playerAturn')[0].innerText = ''
  } else {
    playerTurn = 'X'
    qSelector('#playerAturn')[0].innerText = textTurn
    qSelector('#playerBturn')[0].innerText = ''
  } 
}

cols.forEach(col => {
  col.addEventListener('click', (ev) => {
    if (ev.target.classList[0] == 'placeholder') {
      col.innerHTML = `<p class='played'>${playerTurn}</p>`
      changePlayer()
    }
  })
})

window.addEventListener('click', ev => {
  // line 1:
  // horizontal:
  if (cols[0].innerText != '_') {
    if (cols[0].innerText == cols[1].innerText && cols[0].innerText == cols[2].innerText) {
      return winner()
    }
    // vertical
    if (cols[0].innerText == cols[3].innerText && cols[0].innerText == cols[6].innerText) {
      return winner()
    }
  }
  // line 2:
  if (cols[4].innerText != '_') {
    // horizontal:
    if (cols[3].innerText == cols[4].innerText && cols[3].innerText == cols[5].innerText) {
      return winner()
    }
    // vertical
    if (cols[4].innerText == cols[1].innerText && cols[4].innerText == cols[7].innerText) {
      return winner()
    }
  }
  // line 3:
    if (cols[8].innerText != '_') {
    // horizontal:
    if (cols[6].innerText == cols[7].innerText && cols[6].innerText == cols[8].innerText) {
      return winner()
    }
    // vertical:
    if (cols[8].innerText == cols[2].innerText && cols[8].innerText == cols[5].innerText) {
      return winner()
    }
  }
  if (cols[4].innerText != '_') {
      // diagonal 1
      if (cols[0].innerText == cols[4].innerText && cols[0].innerText == cols[8].innerText){
       return winner()
      }
      // diagonal 2
      if (cols[2].innerText == cols[4].innerText && cols[2].innerText == cols[6].innerText){
       return winner()
      }
  }
})


const winner = () => {
  changePlayer()
  let winnerName = '';
  if (playerTurn == 'X') {
    playerAPoints++;
    playerAPointsDiv.innerText = playerAPoints;
    winnerName = playerAName
  } else {
    playerBPoints++
    playerBPointsDiv.innerText = playerBPoints;
    winnerName = playerBName
  }
  alert(`Winner: ${winnerName}`)
  round++;
  roundDiv.innerText = round;
  console.log(`Round ${round}. Winner: ${winnerName}. ${playerAName}: ${playerAPoints} - ${playerBName}: ${playerBPoints}` )
  reset()
  changePlayer()
}