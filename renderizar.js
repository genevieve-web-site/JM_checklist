function escapar(valor) {
  return String(valor).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
}

function renderizarSecoes() {
  return SECOES.map((sec, indice) => `
    <section aria-labelledby="secao-${indice}">
      <div class="titulo-secao"><h2 id="secao-${indice}">${escapar(sec.titulo)}</h2><span class="parcial" id="parcial-${indice}"></span></div>
      ${sec.imagem ? `<figure class="referencia"><a href="${escapar(sec.imagem)}" target="_blank" rel="noopener" aria-label="Abrir imagem de ${escapar(sec.titulo)} em tamanho original"><img src="${escapar(sec.imagem)}" alt="Referência visual: ${escapar(sec.titulo)}" loading="lazy" decoding="async"></a><figcaption>Versão 01 · Clique na imagem para abrir em tamanho original.</figcaption></figure>` : ''}
      ${sec.itens.map(it => `<div class="item${sec.imagem ? ' design' : ''}" data-id="${it.id}">
        ${sec.imagem ? '' : `<input type="checkbox" class="marcador" id="${it.id}" name="${it.id}-concluido" value="Sim" ${it.feito ? 'checked' : ''}>`}
        <div class="corpo">
          ${sec.imagem ? `<div class="rotulo" id="titulo-${it.id}">` : `<label class="rotulo" for="${it.id}">`}<strong>${escapar(it.txt)}</strong>${it.nota ? `<span class="nota">${escapar(it.nota)}</span>` : ''}${sec.imagem ? '</div>' : '</label>'}
          ${sec.imagem ? `<fieldset class="decisao" aria-labelledby="titulo-${it.id}"><legend>Avaliação</legend>${['Aprovado', 'Reprovado', 'Pendente'].map(valor => `<label class="opcao"><input type="radio" name="${it.id}-avaliacao" value="${valor}" ${valor === 'Pendente' ? 'checked' : ''}><span>${valor}</span></label>`).join('')}</fieldset>` : ''}
          <div class="resposta"><label for="resposta-${it.id}">${escapar(it.pergunta || "Sua resposta / observações")}</label><textarea id="resposta-${it.id}" name="${it.id}-resposta" rows="3" placeholder="${escapar(it.placeholder || "Informe sua decisão, os ajustes, textos ou links necessários.")}"></textarea></div>
        </div>
        <span class="selo">${sec.imagem || !it.feito ? 'PENDENTE' : 'FINALIZADO'}</span>
      </div>`).join('')}
    </section>`).join('');
}
