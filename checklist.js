const CHAVE = 'jm-carvalho:checklist';
const CHAVE_RESPOSTAS = 'jm-carvalho:checklist:respostas';
const CHAVE_AVALIACOES = 'jm-carvalho:checklist:avaliacoes';
const CHAVE_IDENTIFICACAO = 'jm-carvalho:checklist:identificacao';
const estado = Object.fromEntries(SECOES.flatMap(s => s.itens.map(i => [i.id, !!i.feito])));
const respostas = {};
const avaliacoes = {};
const formulario = document.getElementById('formulario');

function ler(chave) {
  try {
    const dados = JSON.parse(localStorage.getItem(chave));
    return dados && typeof dados === 'object' && !Array.isArray(dados) ? dados : {};
  } catch { return {}; }
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
    localStorage.setItem(CHAVE_RESPOSTAS, JSON.stringify(respostas));
    localStorage.setItem(CHAVE_AVALIACOES, JSON.stringify(avaliacoes));
    localStorage.setItem(CHAVE_IDENTIFICACAO, JSON.stringify({
      responsavel: formulario.elements.responsavel.value,
      email: formulario.elements.email.value
    }));
    document.getElementById('aviso').textContent = '';
  } catch {
    document.getElementById('aviso').textContent = 'O rascunho não está sendo salvo neste navegador. Envie suas respostas antes de fechar a página.';
  }
}

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
      resumo.push(`${it.txt}\nStatus: ${status}\nResposta: ${respostas[it.id] || 'Não informada'}\n`);
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
  const salvos = ler(CHAVE);
  const textos = ler(CHAVE_RESPOSTAS);
  const decisoes = ler(CHAVE_AVALIACOES);
  const identificacao = ler(CHAVE_IDENTIFICACAO);
  if (!document.querySelector('#lista section')) document.getElementById('lista').innerHTML = renderizarSecoes();
  for (const campo of ['responsavel', 'email']) {
    if (typeof identificacao[campo] === 'string') formulario.elements[campo].value = identificacao[campo];
  }
  SECOES.forEach(sec => sec.itens.forEach(it => {
    if (typeof salvos[it.id] === 'boolean') estado[it.id] = salvos[it.id];
    respostas[it.id] = typeof textos[it.id] === 'string' ? textos[it.id] : '';
    avaliacoes[it.id] = ['Aprovado', 'Reprovado', 'Pendente'].includes(decisoes[it.id]) ? decisoes[it.id] : 'Pendente';
    const linha = document.querySelector(`[data-id="${it.id}"]`);
    if (sec.imagem) {
      linha.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = input.value === avaliacoes[it.id];
        input.addEventListener('change', () => {
          avaliacoes[it.id] = input.value;
          atualizar();
          salvar();
        });
      });
    } else {
      const input = document.getElementById(it.id);
      input.checked = estado[it.id];
      input.addEventListener('change', () => {
        estado[it.id] = input.checked;
        atualizar();
        salvar();
      });
    }
    const campo = document.getElementById(`resposta-${it.id}`);
    campo.value = respostas[it.id];
    campo.addEventListener('input', () => {
      respostas[it.id] = campo.value;
      atualizar();
      salvar();
    });
  }));
  atualizar();
}

for (const campo of ['responsavel', 'email']) formulario.elements[campo].addEventListener('input', salvar);

document.getElementById('limpar').addEventListener('click', () => {
  SECOES.forEach(sec => sec.itens.forEach(it => {
    estado[it.id] = false;
    avaliacoes[it.id] = 'Pendente';
    if (sec.imagem) formulario.elements[`${it.id}-avaliacao`].value = 'Pendente';
    else document.getElementById(it.id).checked = false;
  }));
  atualizar();
  salvar();
});

formulario.addEventListener('submit', async event => {
  event.preventDefault();
  const botao = document.getElementById('enviar');
  if (botao.disabled) return;
  atualizar();
  salvar();
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
