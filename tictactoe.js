let cols = document.querySelectorAll('.col');

let player = 'X'
const changePlayer = () => {
  (player == 'X') ? player = 'O' : player = 'X'
}

cols.forEach(col => {
  col.addEventListener('click', (ev) => {
    if (ev.target.classList[0] == 'placeholder') {
      col.innerHTML = `<p class='played'>${player}</p>`
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
  alert(`Winner: ${player}`)
  reset()
}

const reset = () => {
  cols.forEach(col => {
    col.innerHTML = '<p class="placeholder">_</p>'
  })
}