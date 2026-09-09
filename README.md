# Checklist — JM Carvalho Consultoria

Formulário de fechamento e revisão do site, com 46 itens em 12 seções e sete imagens de referência. Inicia sempre com todos os itens pendentes e os campos vazios. Os itens de design têm opções Aprovado, Reprovado e Pendente; todos os itens têm campo de resposta. O progresso conta itens concluídos e avaliações respondidas, inclusive reprovações.

## Publicar na Netlify

1. Importe `genevieve-web-site/JM_checklist`, branch `main`, como um projeto na Netlify.
2. O `netlify.toml` define o comando `node build.js` e o diretório publicado `dist`. Não há dependências ou variáveis secretas para configurar.
3. No painel **Forms**, habilite a detecção de formulários (**Enable form detection**). Se habilitar após o primeiro deploy, faça um novo deploy.
4. Confira se o formulário `jm-checklist` aparece no painel e faça um envio de teste pelo endereço publicado.
5. Consulte as respostas no painel **Forms → jm-checklist**. Para receber avisos por e-mail, configure uma notificação de formulário no painel com o e-mail desejado.

O build gera todos os campos no HTML estático, permitindo que a Netlify reconheça os campos antes de executar JavaScript. O envio inclui estados dos itens, avaliações, respostas e um resumo legível organizado por seção. Envios parciais são permitidos, sem exigir identificação. As imagens de referência estão em `public/`; arquivos do cliente devem ser enviados pelo WhatsApp, conforme indicado nas perguntas.

Documentação: [configuração do Netlify Forms](https://docs.netlify.com/manage/forms/setup/) e [notificações](https://docs.netlify.com/manage/forms/notifications/).

## Preenchimento

O formulário começa vazio ao abrir, recarregar ou retornar à página pelo histórico do navegador. Não salva nem recupera rascunhos do `localStorage`. “Reiniciar checklist” limpa marcações, avaliações e respostas. As respostas só são encaminhadas ao clicar em **Enviar respostas**; em caso de falha no envio, permanecem na página para uma nova tentativa.

## Verificação local

```sh
node --check checklist.js
node build.js
python3 -m http.server 8080 --directory dist
```

Abra `http://localhost:8080`. A captura real das respostas depende de publicar na Netlify com a detecção de formulários habilitada; o servidor local não processa envios. A confirmação aparece somente após resposta HTTP de sucesso, e falhas preservam os campos para nova tentativa.
