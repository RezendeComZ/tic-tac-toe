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
    col.innerHTML = `<p>${player}</p>`
    changePlayer()
    console.log(ev)
  })
})