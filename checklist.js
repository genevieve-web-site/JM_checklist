const SECOES = [
  {
    titulo: "Identidade visual",
    itens: [
      {id:"iv1", txt:"Logo em JPEG (versão circular e horizontal)", nota:"Recebido — qualidade de WhatsApp, serve só para referência", feito:true},
      {id:"iv2", txt:"Logo em alta resolução ou vetor (SVG, AI ou EPS)", nota:"Necessário para nitidez em tela retina e para o favicon"},
      {id:"iv3", txt:"Código hex exato das cores da marca", nota:"Verde, dourado e off-white — pedir manual de marca ou arquivo original"},
      {id:"iv4", txt:"Nome exato da fonte dos banners", nota:"Item solicitado pelo cliente — pedir arquivo .otf/.ttf ou link do Google Fonts"},
      {id:"iv5", txt:"Favicon (ícone quadrado .ico ou .png)"}
    ]
  },
  {
    titulo:"Conteúdo institucional",
    itens:[
      {id:"ci1", txt:"Nome da empresa e assinatura", nota:"“Gestão que constrói. Resultados.”", feito:true},
      {id:"ci2", txt:"Quem somos, missão, visão e valores", nota:"Texto completo do manual de relacionamento comercial", feito:true},
      {id:"ci3", txt:"Descrição dos quatro serviços", nota:"Departamento Pessoal, RH, Segurança do Trabalho e Gestão Documental", feito:true},
      {id:"ci4", txt:"Empresas parceiras e obras atendidas", nota:"Base para a seção de clientes e portfólio", feito:true},
      {id:"ci5", txt:"Referência de tom de comunicação", nota:"Comunicado institucional recebido serve de parâmetro", feito:true},
      {id:"ci6", txt:"Depoimentos de clientes", nota:"Texto e autorização de uso, se a seção entrar no site"},
      {id:"ci7", txt:"Fotos reais de equipe, escritório ou obras", nota:"Ou confirmar se o site usará banco de imagens"},
      {id:"ci8", txt:"Definição dos ajustes vindos do Design 2", nota:"Cliente aprovou o Design 1 mas ainda não detalhou o que quer aproveitar"}
    ]
  },
  {
    titulo:"Contato e equipe",
    itens:[
      {id:"ce1", txt:"E-mails oficiais", nota:"iris@ e adm@jmcarvalhoconsultoria.com.br", feito:true},
      {id:"ce2", txt:"Equipe, cargos e telefones", nota:"Íris (Diretoria), Regina (Comercial), Aymê (SST), Michele (Atendimento)", feito:true},
      {id:"ce3", txt:"Endereço completo", nota:"Caso apareça no rodapé ou em mapa"},
      {id:"ce4", txt:"CNPJ", nota:"Opcional no rodapé — reforça institucionalidade e ajuda no SEO local"},
      {id:"ce5", txt:"Links das redes sociais", nota:"Instagram, Facebook e LinkedIn — contas que entram na gestão mensal"}
    ]
  },
  {
    titulo:"Domínio e infraestrutura",
    itens:[
      {id:"di1", txt:"Domínio já registrado", nota:"jmcarvalhoconsultoria.com.br", feito:true},
      {id:"di2", txt:"E-mails corporativos ativos no domínio", nota:"Indica que já existe provedor configurado hoje", feito:true},
      {id:"di3", txt:"Acesso ao painel de DNS ou ao registrador", nota:"Para apontar o domínio ao novo site"},
      {id:"di4", txt:"Confirmação do provedor de e-mail atual", nota:"Evita derrubar os e-mails corporativos ao mexer no DNS"}
    ]
  },
  {
    titulo:"Fechamento comercial",
    itens:[
      {id:"fc1", txt:"Proposta apresentada ao cliente", nota:"Proposta nº 2026.48, de 31/08/2026", feito:true},
      {id:"fc2", txt:"Aceite da proposta"},
      {id:"fc3", txt:"Pagamento da primeira parcela", nota:"Marca o início oficial do desenvolvimento"},
      {id:"fc4", txt:"Definição da data de virada do domínio", nota:"Combinar horário para minimizar indisponibilidade"}
    ]
  }
];

const CHAVE = "jm-carvalho:checklist";
const estado = Object.fromEntries(SECOES.flatMap(s => s.itens.map(i => [i.id, !!i.feito])));

function desenhar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  SECOES.forEach((sec, indice) => {
    const el = document.createElement("section");
    el.innerHTML = `<div class="titulo-secao"><h2>${sec.titulo}</h2><span class="parcial" id="parcial-${indice}"></span></div>`;
    sec.itens.forEach(it => {
      const linha = document.createElement("div");
      linha.className = "item";
      linha.dataset.id = it.id;
      linha.innerHTML = `
        <input type="checkbox" class="marcador" id="${it.id}">
        <div class="corpo">
          <label class="rotulo" for="${it.id}"><strong>${it.txt}</strong>
            ${it.nota ? `<span class="nota">${it.nota}</span>` : ""}
          </label>
        </div>
        <span class="selo"></span>`;
      linha.querySelector("input").addEventListener("change", e => {
        estado[it.id] = e.target.checked;
        salvar();
        atualizar();
      });
      el.appendChild(linha);
    });
    lista.appendChild(el);
  });
  atualizar();
}

// Atualiza os elementos existentes para preservar o foco ao usar o teclado.
function atualizar() {
  SECOES.forEach((sec, indice) => {
    document.getElementById(`parcial-${indice}`).textContent = `${sec.itens.filter(i => estado[i.id]).length} de ${sec.itens.length}`;
    sec.itens.forEach(it => {
      const input = document.getElementById(it.id);
      input.checked = estado[it.id];
      const linha = input.closest(".item");
      linha.classList.toggle("pronto", estado[it.id]);
      linha.querySelector(".selo").textContent = estado[it.id] ? "FINALIZADO" : "PENDENTE";
    });
  });
  const ids = Object.keys(estado);
  const feitos = ids.filter(k => estado[k]).length;
  document.getElementById("feitos").textContent = feitos;
  document.getElementById("total").textContent = ids.length;
  document.getElementById("preenchimento").style.width = (feitos / ids.length * 100) + "%";
  const barra = document.querySelector(".barra");
  barra.setAttribute("aria-valuenow", feitos);
  barra.setAttribute("aria-valuemax", ids.length);
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
    document.getElementById("aviso").textContent = "";
  } catch {
    document.getElementById("aviso").textContent = "As marcações não estão sendo salvas nesta sessão. Elas valem só enquanto a página estiver aberta.";
  }
}

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo && typeof salvo === "object") {
      Object.keys(estado).forEach(k => {
        if (typeof salvo[k] === "boolean") estado[k] = salvo[k];
      });
    }
  } catch { /* Primeira abertura ou dados inválidos: mantém os padrões. */ }
  desenhar();
}

document.getElementById("limpar").addEventListener("click", () => {
  Object.keys(estado).forEach(k => estado[k] = false);
  salvar();
  atualizar();
});

carregar();
