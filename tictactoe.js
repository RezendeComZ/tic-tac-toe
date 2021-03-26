let cols = document.querySelectorAll('.col');

let player = 'X'

const changePlayer = () => {
  if (player == 'X') {
    player = 'O'
  } else {
    player = 'X'
  }
}

cols.forEach(col => {
  col.addEventListener('click', (ev) => {
    if (ev.target.classList[0] == 'placeholder') {
      col.innerHTML = `<p class='played'>${player}</p>`
      changePlayer()
    }
  })
})