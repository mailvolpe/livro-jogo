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
  cenaTexto.textContent = cena.texto;
  opcoesDiv.innerHTML = '';
  if (cena.opcoes.length === 0) {
    const fimMsg = document.createElement('div');
    fimMsg.textContent = 'Fim!';
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
