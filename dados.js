const SECOES = [
  {
    titulo: "Identidade visual",
    itens: [
      {id:"iv1", txt:"Logo em JPEG (versão circular e horizontal)", nota:"Recebido — qualidade de WhatsApp, serve só para referência"},
      {id:"iv2", txt:"Logo em alta resolução ou vetor (SVG, AI ou EPS)", nota:"Necessário para nitidez em tela retina e para o favicon"},
      {id:"iv3", txt:"Código hex exato das cores da marca", nota:"Verde, dourado e off-white — pedir manual de marca ou arquivo original"},
      {id:"iv4", txt:"Nome exato da fonte dos banners", nota:"Item solicitado pelo cliente — pedir arquivo .otf/.ttf ou link do Google Fonts"},
      {id:"iv5", txt:"Favicon (ícone quadrado .ico ou .png)"}
    ]
  },
  {
    titulo:"Conteúdo institucional",
    itens:[
      {id:"ci1", txt:"Nome da empresa e assinatura", nota:"“Gestão que constrói. Resultados.”"},
      {id:"ci2", txt:"Quem somos, missão, visão e valores", nota:"Texto completo do manual de relacionamento comercial"},
      {id:"ci3", txt:"Descrição dos quatro serviços", nota:"Departamento Pessoal, RH, Segurança do Trabalho e Gestão Documental"},
      {id:"ci4", txt:"Empresas parceiras e obras atendidas", nota:"Base para a seção de clientes e portfólio"},
      {id:"ci6", txt:"Depoimentos de clientes", nota:"Texto e autorização de uso, se a seção entrar no site"},
      {id:"ci7", txt:"Fotos reais de equipe, escritório ou obras", nota:"Ou confirmar se o site usará banco de imagens"},
      {id:"ci8", txt:"Definição dos ajustes vindos do Design 2", nota:"Cliente aprovou o Design 1 mas ainda não detalhou o que quer aproveitar"}
    ]
  },
  {
    titulo:"Contato e equipe",
    itens:[
      {id:"ce1", txt:"E-mails oficiais", nota:"iris@ e adm@jmcarvalhoconsultoria.com.br"},
      {id:"ce2", txt:"Equipe, cargos e telefones", nota:"Íris (Diretoria), Regina (Comercial), Aymê (SST), Michele (Atendimento)"},
      {id:"ce3", txt:"Endereço completo", nota:"Caso apareça no rodapé ou em mapa"},
      {id:"ce4", txt:"CNPJ", nota:"Opcional no rodapé — reforça institucionalidade e ajuda no SEO local"},
    ]
  },
  {
    titulo:"Domínio e infraestrutura",
    itens:[
      {id:"di1", txt:"Domínio já registrado", nota:"jmcarvalhoconsultoria.com.br"},
      {id:"di2", txt:"E-mails corporativos ativos no domínio", nota:"Indica que já existe provedor configurado hoje"},
      {id:"di3", txt:"Acesso ao painel de DNS ou ao registrador", nota:"Para apontar o domínio ao novo site"},
      {id:"di4", txt:"Confirmação do provedor de e-mail atual", nota:"Evita derrubar os e-mails corporativos ao mexer no DNS"}
    ]
  },
  {
    titulo:"Fechamento comercial",
    itens:[
      {id:"fc1", txt:"Proposta apresentada ao cliente", nota:"Proposta nº 2026.48, de 31/08/2026"},
      {id:"fc2", txt:"Aceite da proposta"},
      {id:"fc3", txt:"Pagamento da primeira parcela", nota:"Marca o início oficial do desenvolvimento"},
      {id:"fc4", txt:"Definição da data de virada do domínio", nota:"Combinar horário para minimizar indisponibilidade"}
    ]
  },
  {
    titulo:"Design do site — Página inicial · Versão 01",
    imagem:"public/Versao01_Home.png",
    itens:[
      {id:"home1", txt:"Menu / Cabeçalho: aprovado ou reprovado?", nota:"Logo à esquerda, Início, Quem somos, Soluções, Com quem trabalhamos, Contato, redes sociais e botão Fale conosco, que direciona ao WhatsApp de atendimento. Se reprovar, informe os ajustes."},
      {id:"home2", txt:"Frase “Gestão que constrói. Resultados.”: manter, remover ou trocar?", nota:"Se quiser trocar, escreva a nova frase."},
      {id:"home3", txt:"Título principal estratégico: manter, trocar ou remover?", nota:"“Gestão Documental, Administrativa e Operacional pra Construção Civil.” Se quiser trocar, escreva o novo título."},
      {id:"home4", txt:"Texto abaixo do título principal: manter, trocar ou apagar?", nota:"Se quiser trocar, escreva o texto que deseja exibir abaixo do título."},
      {id:"home5", txt:"Botão Conferir vagas: manter ou remover?", nota:"Se mantiver, o clique deve abrir o WhatsApp de atendimento ou um site onde vocês já publicam vagas? Informe o destino e envie o link, se houver. Para retirar o botão, responda “Remover”."},
      {id:"home6", txt:"Botões flutuantes à direita: manter, remover ou trocar?", nota:"Ícones de WhatsApp, LinkedIn e Instagram. Informe quais deseja manter, remover ou substituir."},
      {id:"home7", txt:"Dados “10+ empresas parceiras” e “20+ obras atendidas”: manter, alterar ou remover?", nota:"Se quiser alterar, informe os números e textos corretos."},
      {id:"home8", txt:"Vídeo da página inicial: manter ou trocar?", nota:"Se tiver outra opção, envie o vídeo pelo WhatsApp. Vamos analisar a qualidade da mídia e avaliar a substituição."}
    ]
  },
  {
    titulo:"Design do site — 02 · Quem somos",
    imagem:"public/Versao_01_SessaoQuemSomos.png",
    itens:[
      {id:"qs1", txt:"Título e texto: manter ou alterar?", nota:"“Conectamos pessoas, organizamos processos.” Se quiser alterar, digite o título e o texto completos que deseja usar."},
      {id:"qs2", txt:"Foto: manter ou substituir por imagens originais?", nota:"Se tiver fotos próprias da empresa ou da equipe, envie as imagens pelo WhatsApp e informe aqui qual deseja utilizar."},
      {id:"qs3", txt:"Botões, detalhes do design e textos de apoio: manter ou remover?", nota:"Informe quais elementos deseja manter ou remover e descreva os ajustes necessários."}
    ]
  },
  {
    titulo:"Design do site — 03 · Nossa proposta de valor",
    imagem:"public/Versao_01_sessao03.png",
    itens:[
      {id:"pv1", txt:"Seção de clientes atendidos e parceiros: manter ou remover?", nota:"Se mantiver, informe os nomes das empresas para as quais já prestou serviços e dos parceiros que devem aparecer. Envie também os respectivos logos pelo WhatsApp."},
      {id:"pv2", txt:"Plataformas que dominamos: manter o loop infinito de logos?", nota:"Deseja adicionar mais alguma plataforma? Informe os nomes e envie os logos. Se preferir remover o loop, registre aqui."}
    ]
  },
  {
    titulo:"Design do site — 04 · Nossas soluções",
    imagem:"public/Versao_01_sessao4soluçoes.png",
    itens:[
      {id:"sol1", txt:"Design da apresentação dos serviços: manter ou alterar?", nota:"Avalie a organização dos serviços e a apresentação do conteúdo. Descreva os ajustes que deseja."},
      {id:"sol2", txt:"Textos, títulos e subtítulos: manter ou alterar?", nota:"Se quiser alterar, informe o serviço correspondente e escreva os novos títulos, subtítulos e textos."},
      {id:"sol3", txt:"Ícones dos serviços: manter ou trocar?", nota:"Informe quais ícones deseja substituir e o que prefere usar."}
    ]
  },
  {
    titulo:"Design do site — 05 · Resultados que constroem confiança",
    imagem:"public/Versao01_sessao05resultados.png",
    itens:[
      {id:"res1", txt:"Adicionar logos de obras ou empresas já atendidas?", nota:"Informe quais devem aparecer nesta seção e envie os respectivos logos pelo WhatsApp."},
      {id:"res2", txt:"Loop de imagens de obras: manter ou remover?", nota:"Se mantiver, envie fotos reais pelo WhatsApp, acompanhadas do nome de cada obra e da cidade."}
    ]
  },
  {
    titulo:"Design do site — 06 · Contato",
    imagem:"public/Versao_01_Sessao06.png",
    itens:[
      {id:"cont1", txt:"Formulário de contato: manter ou remover?", nota:"A proposta é que, ao preencher o formulário do site e clicar em enviar, o cliente encaminhe os dados ao e-mail corporativo de vocês. Confirme qual e-mail deverá receber as solicitações."},
      {id:"cont2", txt:"Design, cores e títulos: manter ou editar?", nota:"Informe se deseja alterar algum título, texto, cor ou detalhe da apresentação desta seção."}
    ]
  },
  {
    titulo:"Design do site — Rodapé",
    imagem:"public/versao01-footer.png",
    itens:[
      {id:"rod1", txt:"Rodapé: manter ou editar?", nota:"Revise o logo, os textos, as soluções, os parceiros, as redes sociais e os dados de contato. Informe os elementos que deseja alterar ou remover e os dados corretos."}
    ]
  }
];
