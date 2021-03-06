// Todo:
// Num keypad to play - transparent numbers on game
// dark mode
// console.table game at end
// timer at console
// start with CPU
// Flash winner line
// timer challenge

const qSelector = div => {
  return document.querySelectorAll(div)
}

let cols = qSelector('.col');

let nineToDraw = 0
const reset = () => {
  nineToDraw = 0;
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
    roundReset();
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
  playerBName = prompt('Player B name. If you want to play against the CPU type "cpu".')
  if (!playerBName || playerBName == 'cpu' || playerBName == 'CPU' || playerBName == 'Cpu' || playerBName == '🖥️ CPU') {
    playerBNameDiv.innerText = '🖥️ CPU';
    if (playerTurn == 'O') {
      changePlayer();
    }
    roundReset();
    reset()
  } else {
    playerBNameDiv.innerText = playerBName;
  }
})

let round = 1;
let roundDiv = qSelector('#round')[0]
roundDiv.innerText = round
const roundReset = () => {
  round = 0;
  roundDiv.innerText = round;
}

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

const playAtClass = (div) => {
  return div.innerHTML = `<p class='played'>${playerTurn}</p>`
}

let cpuOpponent= 'X';

cols.forEach(col => {
  col.addEventListener('click', (ev) => {
    if (ev.target.classList[0] == 'placeholder') {
      playAtClass(col)
      changePlayer()
      nineToDraw++;
      if (playerBNameDiv.innerText == '🖥️ CPU') {
        cpuPlay()
        changePlayer()
        nineToDraw++;
      }
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
    if (nineToDraw >= 9) {
      alert('Draw!');
      reset();
      round++;
      roundDiv.innerText = round;
      changePlayer()
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
    winnerName = playerBNameDiv.innerText
  }
  alert(`Winner: ${winnerName}`)
  round++;
  roundDiv.innerText = round;
  console.log(`Round ${round}. Winner: ${winnerName}. ${playerAName}: ${playerAPoints} - ${playerBName}: ${playerBPoints}` )
  reset()
  if (playerBNameDiv.innerText == '🖥️ CPU') {
    changePlayer()
  }
}

// CPU

const random = () => {
  return Math.floor(Math.random() * 10) % 2 == 0
}

const colIsEmpty = (colNum) => {
  return cols[colNum].innerHTML == '<p class="placeholder">_</p>'  
}
const allColsIsEmpty = () => {
  let empty = true
  cols.forEach(col => {
    if (col.innerHTML != '<p class="placeholder">_</p>') {
      empty = false
    }
  })
  return empty
}

const playAtBorder = () => {
  if (random()){
    if (random()) {
      return playAtClass(cols[0])
    } else {
      return playAtClass(cols[2])
    }
  } else {
    if (random()) {
      return playAtClass(cols[6])
    } else {
      return playAtClass(cols[8])
    }
  }
}

const checkDanger = () => {
  // Try to win
  // horizontal
  // line 1
  if (cols[0].innerText == playerTurn && cols[1].innerText == playerTurn && colIsEmpty(2)) {
    return playAtClass(cols[2]);
  }
  if (cols[0].innerText == playerTurn && colIsEmpty(1) && cols[2].innerText == playerTurn) {
    return playAtClass(cols[1]);
  }
  if (colIsEmpty(0) && cols[1].innerText == playerTurn && cols[2].innerText == playerTurn) {
    return playAtClass(cols[0]);
  }
  // line 2
  if (cols[3].innerText == playerTurn && cols[4].innerText == playerTurn && colIsEmpty(5)) {
    return playAtClass(cols[5]);
  }
  if (cols[3].innerText == playerTurn && colIsEmpty(4) && cols[5].innerText == playerTurn) {
    return playAtClass(cols[4]);
  }
  if (colIsEmpty(3) && cols[4].innerText == playerTurn && cols[5].innerText == playerTurn) {
    return playAtClass(cols[3]);
  }
  // line 3
  if (cols[6].innerText == playerTurn && cols[7].innerText == playerTurn && colIsEmpty(8)) {
    return playAtClass(cols[8]);
  }
  if (cols[6].innerText == playerTurn && colIsEmpty(7) && cols[8].innerText == playerTurn) {
    return playAtClass(cols[7]);
  }
  if (colIsEmpty(6) && cols[7].innerText == playerTurn && cols[8].innerText == playerTurn) {
    return playAtClass(cols[6]);
  }
  // Vertical
  // line 1
  if (colIsEmpty(0) && cols[3].innerText == playerTurn && cols[6].innerText == playerTurn) {
    return playAtClass(cols[0]);
  }
  if (cols[0].innerText == playerTurn && colIsEmpty(3) && cols[6].innerText == playerTurn) {
    return playAtClass(cols[3]);
  }
  if (cols[0].innerText == playerTurn && cols[3].innerText == playerTurn && colIsEmpty(6)) {
    return playAtClass(cols[6]);
  }
  // line 2
  if (colIsEmpty(1) && cols[4].innerText == playerTurn && cols[7].innerText == playerTurn) {
    return playAtClass(cols[1]);
  }
  if (cols[1].innerText == playerTurn && colIsEmpty(4) && cols[7].innerText == playerTurn) {
    return playAtClass(cols[4]);
  }
  if (cols[1].innerText == playerTurn && cols[4].innerText == playerTurn && colIsEmpty(7)) {
    return playAtClass(cols[7]);
  }
  // line 3
  if (colIsEmpty(2) && cols[5].innerText == playerTurn && cols[8].innerText == playerTurn) {
    return playAtClass(cols[2]);
  }
  if (cols[2].innerText == playerTurn && colIsEmpty(5) && cols[8].innerText == playerTurn) {
    return playAtClass(cols[5]);
  }
  if (cols[2].innerText == playerTurn && cols[5].innerText == playerTurn && colIsEmpty(8)) {
    return playAtClass(cols[8]);
  }
  // diagonal 1
  if (colIsEmpty(0) && cols[4].innerText == playerTurn && cols[8].innerText == playerTurn) {
    return playAtClass(cols[0]);
  }
  if (cols[0].innerText == playerTurn && colIsEmpty(4) && cols[8].innerText == playerTurn) {
    return playAtClass(cols[4]);
  }
  if (cols[0].innerText == playerTurn && cols[4].innerText == playerTurn && colIsEmpty(8)) {
    return playAtClass(cols[8]);
  }
  // diagonal 2
  if (colIsEmpty(2) && cols[4].innerText == playerTurn && cols[6].innerText == playerTurn) {
    return playAtClass(cols[2]);
  }
  if (cols[2].innerText == playerTurn && colIsEmpty(4) && cols[6].innerText == playerTurn) {
    return playAtClass(cols[4]);
  }
  if (cols[2].innerText == playerTurn && cols[4].innerText == playerTurn && colIsEmpty(6)) {
    return playAtClass(cols[6]);
  }
  // Protect
  // Horizontal
  // line 1
  if (cols[0].innerText == cpuOpponent && cols[1].innerText == cpuOpponent && colIsEmpty(2)) {
    return playAtClass(cols[2]);
  }
  if (cols[0].innerText == cpuOpponent && colIsEmpty(1) && cols[2].innerText == cpuOpponent) {
    return playAtClass(cols[1]);
  }
  if (colIsEmpty(0) && cols[1].innerText == cpuOpponent && cols[2].innerText == cpuOpponent) {
    return playAtClass(cols[0]);
  }
  // line 2
  if (cols[3].innerText == cpuOpponent && cols[4].innerText == cpuOpponent && colIsEmpty(5)) {
    return playAtClass(cols[5]);
  }
  if (cols[3].innerText == cpuOpponent && colIsEmpty(4) && cols[5].innerText == cpuOpponent) {
    return playAtClass(cols[4]);
  }
  if (colIsEmpty(3) && cols[4].innerText == cpuOpponent && cols[5].innerText == cpuOpponent) {
    return playAtClass(cols[3]);
  }
  // line 3
  if (cols[6].innerText == cpuOpponent && cols[7].innerText == cpuOpponent && colIsEmpty(8)) {
    return playAtClass(cols[8]);
  }
  if (cols[6].innerText == cpuOpponent && colIsEmpty(7) && cols[8].innerText == cpuOpponent) {
    return playAtClass(cols[7]);
  }
  if (colIsEmpty(6) && cols[7].innerText == cpuOpponent && cols[8].innerText == cpuOpponent) {
    return playAtClass(cols[6]);
  }
  // Vertical
  // line 1
  if (colIsEmpty(0) && cols[3].innerText == cpuOpponent && cols[6].innerText == cpuOpponent) {
    return playAtClass(cols[0]);
  }
  if (cols[0].innerText == cpuOpponent && colIsEmpty(3) && cols[6].innerText == cpuOpponent) {
    return playAtClass(cols[3]);
  }
  if (cols[0].innerText == cpuOpponent && cols[3].innerText == cpuOpponent && colIsEmpty(6)) {
    return playAtClass(cols[6]);
  }
  // line 2
  if (colIsEmpty(1) && cols[4].innerText == cpuOpponent && cols[7].innerText == cpuOpponent) {
    return playAtClass(cols[1]);
  }
  if (cols[1].innerText == cpuOpponent && colIsEmpty(4) && cols[7].innerText == cpuOpponent) {
    return playAtClass(cols[4]);
  }
  if (cols[1].innerText == cpuOpponent && cols[4].innerText == cpuOpponent && colIsEmpty(7)) {
    return playAtClass(cols[7]);
  }
  // line 3
  if (colIsEmpty(2) && cols[5].innerText == cpuOpponent && cols[8].innerText == cpuOpponent) {
    return playAtClass(cols[2]);
  }
  if (cols[2].innerText == cpuOpponent && colIsEmpty(5) && cols[8].innerText == cpuOpponent) {
    return playAtClass(cols[5]);
  }
  if (cols[2].innerText == cpuOpponent && cols[5].innerText == cpuOpponent && colIsEmpty(8)) {
    return playAtClass(cols[8]);
  }
  // diagonal 1
  if (colIsEmpty(0) && cols[4].innerText == cpuOpponent && cols[8].innerText == cpuOpponent) {
    return playAtClass(cols[0]);
  }
  if (cols[0].innerText == cpuOpponent && colIsEmpty(4) && cols[8].innerText == cpuOpponent) {
    return playAtClass(cols[4]);
  }
  if (cols[0].innerText == cpuOpponent && cols[4].innerText == cpuOpponent && colIsEmpty(8)) {
    return playAtClass(cols[8]);
  }
  // diagonal 2
  if (colIsEmpty(2) && cols[4].innerText == cpuOpponent && cols[6].innerText == cpuOpponent) {
    return playAtClass(cols[2]);
  }
  if (cols[2].innerText == cpuOpponent && colIsEmpty(4) && cols[6].innerText == cpuOpponent) {
    return playAtClass(cols[4]);
  }
  if (cols[2].innerText == cpuOpponent && cols[4].innerText == cpuOpponent && colIsEmpty(6)) {
    return playAtClass(cols[6]);
  }


  // Not danger // Rest
  rest = [];
  cols.forEach(col => {
  if (col.innerText == "_")
    rest.push(col)
  })
  return playAtClass(rest[Math.floor(Math.random() * rest.length)])

}

const cpuPlay = () => {

  if (allColsIsEmpty()) {
    return playAtBorder();
  } else { // Not empty
    if (colIsEmpty(0) && colIsEmpty(2) && colIsEmpty(6) && colIsEmpty(8)) {
      return playAtBorder();
    } else {
      if (colIsEmpty(4)){
        return playAtClass(cols[4])
      }
      checkDanger();
    }
  }
}