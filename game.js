let cenas = [];
let cenaAtual = null;

function carregarCenas() {
  fetch('scenes.json')
    .then(response => response.json())
    .then(data => {
      cenas = data.cenas;
      mostrarCena('inicio');
    });
}

function mostrarCena(id) {
  const cena = cenas.find(s => s.id === id);
  cenaAtual = cena;
  const cenaTexto = document.getElementById('scene-text');
  const opcoesDiv = document.getElementById('options');
  const cenaImagem = document.getElementById('scene-image'); // Assuming an img element with this ID exists

  cenaTexto.textContent = cena.texto;
  opcoesDiv.innerHTML = '';

  // Update the image source
  if (cenaImagem) {
    const imagemSrc = `imagens/${id}.webp`;
    fetch(imagemSrc, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          cenaImagem.src = imagemSrc;
          cenaImagem.style.display = 'block';
        } else {
          cenaImagem.style.display = 'none';
        }
      })
      .catch(() => {
        cenaImagem.style.display = 'none';
      });
  }

  if (cena.opcoes.length === 0) {
    const fimMsg = document.createElement('div');
    fimMsg.classList.add('fim-msg');
    fimMsg.textContent = 'Fim!';

    const reiniciarBtn = document.createElement('button');
    reiniciarBtn.textContent = 'Jogar Novamente';
    reiniciarBtn.onclick = () => mostrarCena('inicio');

    fimMsg.appendChild(reiniciarBtn);
    opcoesDiv.appendChild(fimMsg);
    return;
  }

  cena.opcoes.forEach(opcao => {
    const btn = document.createElement('button');
    btn.textContent = opcao.texto;
    btn.onclick = () => mostrarCena(opcao.proxima);
    opcoesDiv.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', carregarCenas);
