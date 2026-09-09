# Checklist — JM Carvalho Consultoria

Interface estática em HTML, CSS e JavaScript, com o conteúdo e os estilos fornecidos. São 26 itens em cinco seções, com 11 itens concluídos inicialmente.

Abra `index.html` no navegador para usar. As marcações ficam salvas no `localStorage` do navegador; não são compartilhadas entre dispositivos. O botão “Reiniciar checklist” desmarca todos os itens.

## Publicar na Vercel

1. Importe o repositório `genevieve-web-site/JM_checklist`.
2. Mantenha o diretório raiz como `.` e o preset como **Other**.
3. Não configure comando de build nem instalação de dependências. O `vercel.json` já define a publicação estática da raiz.
4. Clique em **Deploy**.

Não são necessárias variáveis de ambiente. As fontes Playfair Display e Poppins são carregadas pelo Google Fonts.

## Verificação

```sh
node --check checklist.js
```
