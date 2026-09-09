const estado = Object.fromEntries(SECOES.flatMap(s => s.itens.map(i => [i.id, false])));
const respostas = {};
const avaliacoes = {};
const formulario = document.getElementById('formulario');

function atualizar() {
  let total = 0;
  let feitos = 0;
  const resumo = [];
  SECOES.forEach((sec, indice) => {
    let parcial = 0;
    resumo.push(sec.titulo);
    sec.itens.forEach(it => {
      const linha = document.querySelector(`[data-id="${it.id}"]`);
      const status = sec.imagem ? avaliacoes[it.id] : (estado[it.id] ? 'Finalizado' : 'Pendente');
      const revisado = status !== 'Pendente';
      parcial += Number(revisado);
      total++;
      linha.classList.toggle('pronto', !sec.imagem && estado[it.id]);
      linha.classList.toggle('reprovado', status === 'Reprovado');
      linha.querySelector('.selo').textContent = status.toUpperCase();
      resumo.push(`${it.txt}\nStatus: ${status}\n${it.pergunta ? it.pergunta + '\n' : ''}Resposta: ${respostas[it.id] || 'Não informada'}\n`);
    });
    feitos += parcial;
    document.getElementById(`parcial-${indice}`).textContent = `${parcial} de ${sec.itens.length}`;
  });
  document.getElementById('feitos').textContent = feitos;
  document.getElementById('total').textContent = total;
  document.getElementById('preenchimento').style.width = `${feitos / total * 100}%`;
  document.querySelector('.barra').setAttribute('aria-valuenow', feitos);
  document.querySelector('.barra').setAttribute('aria-valuemax', total);
  document.getElementById('resumo').value = resumo.join('\n');
}

function carregar() {
  if (!document.querySelector('#lista section')) document.getElementById('lista').innerHTML = renderizarSecoes();
  SECOES.forEach(sec => sec.itens.forEach(it => {
    respostas[it.id] = '';
    avaliacoes[it.id] = 'Pendente';
    const linha = document.querySelector(`[data-id="${it.id}"]`);
    if (sec.imagem) {
      linha.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = input.value === avaliacoes[it.id];
        input.addEventListener('change', () => {
          avaliacoes[it.id] = input.value;
          atualizar();
        });
      });
    } else {
      const input = document.getElementById(it.id);
      input.checked = estado[it.id];
      input.addEventListener('change', () => {
        estado[it.id] = input.checked;
        atualizar();
      });
    }
    const campo = document.getElementById(`resposta-${it.id}`);
    campo.value = respostas[it.id];
    campo.addEventListener('input', () => {
      respostas[it.id] = campo.value;
      atualizar();
    });
  }));
  atualizar();
}

function reiniciar() {
  formulario.reset();
  document.getElementById('enviar').disabled = false;
  document.getElementById('enviar').textContent = 'Enviar respostas';
  document.getElementById('status-envio').textContent = '';
  SECOES.forEach(sec => sec.itens.forEach(it => {
    estado[it.id] = false;
    respostas[it.id] = '';
    document.getElementById(`resposta-${it.id}`).value = '';
    avaliacoes[it.id] = 'Pendente';
    if (sec.imagem) formulario.elements[`${it.id}-avaliacao`].value = 'Pendente';
    else document.getElementById(it.id).checked = false;
  }));
  atualizar();
}

document.getElementById('limpar').addEventListener('click', reiniciar);
window.addEventListener('pageshow', reiniciar);

formulario.addEventListener('submit', async event => {
  event.preventDefault();
  const botao = document.getElementById('enviar');
  if (botao.disabled) return;
  atualizar();
  const dados = new FormData(formulario);
  // Envia também o estado dos itens desmarcados, que o HTML omite por padrão.
  SECOES.filter(sec => !sec.imagem).forEach(sec => sec.itens.forEach(it => {
    dados.set(`${it.id}-concluido`, estado[it.id] ? 'Sim' : 'Não');
  }));
  botao.disabled = true;
  botao.textContent = 'Enviando…';
  const status = document.getElementById('status-envio');
  status.textContent = 'Enviando suas respostas…';
  try {
    const resposta = await fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams(dados).toString()
    });
    if (!resposta.ok) throw new Error('Falha no envio');
    window.location.assign('/obrigado.html');
  } catch {
    status.textContent = 'Não foi possível enviar. Suas respostas continuam nesta página. Verifique sua conexão e tente novamente.';
    botao.disabled = false;
    botao.textContent = 'Enviar respostas';
  }
});

carregar();
