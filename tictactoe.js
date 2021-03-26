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
  if (cols[0].innerText != '_') {
    if (cols[0].innerText == cols[1].innerText && cols[0].innerText == cols[2].innerText) {
      alert(`Vencedor: ${cols[0].innerText}`)
    }
    if (cols[0].innerText == cols[3].innerText && cols[0].innerText == cols[6].innerText) {
      alert(`Vencedor: ${cols[0].innerText}`)
    }
  }
  
}) 