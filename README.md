# Portfólio — Matheus Nogueira

Portfólio em React, TypeScript e Vite, publicado em [mathsns.github.io/matheus-portfolio](https://mathsns.github.io/matheus-portfolio/). A versão em `src/` é a principal; `standalone/` é uma versão antiga independente e não acompanha automaticamente as atualizações da versão React.

## Desenvolvimento

Requisitos: Node.js 20.19 ou superior e npm.

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

No PowerShell, se a execução de `npm.ps1` estiver bloqueada, use `npm.cmd` no lugar de `npm`. Em ambientes com restrições de leitura que impeçam o carregamento padrão da configuração do Vite, é possível executar `node_modules\.bin\vite.cmd build --configLoader runner` após o typecheck.

## Conteúdo

- `src/data/content.ts` concentra contatos, projetos em destaque, catálogo, experiências, tecnologias e formação.
- `projects` controla a vitrine e os estudos de caso; `catalogWorks` inclui também trabalhos sem interface. Use `projectSlug` para ligar um item do catálogo a um projeto da vitrine.
- A classificação de cada trabalho é opcional; adicione somente informações verificadas. Links de certificados e detalhes de projetos podem ser acrescentados quando disponíveis.
- A solicitação de currículo abre um e-mail; não há PDF hospedado.

## Mídias

Os arquivos efetivamente publicados ficam em `public/projects/<projeto>/`. Para uma imagem, adicione um item com `src`, `alt` e `caption` em `projects[].images`. Para vídeos, use `type: 'video'` e `poster`. Mídias verticais usam `portrait: true` para serem exibidas com o frame de celular. O frame está em `public/art/iphone-frame.png`.

Os vídeos são reproduzidos silenciosamente quando entram na tela e pausam quando saem dela. O carrossel oferece navegação manual e pausa da troca automática; a preferência por movimento reduzido é respeitada. As pastas em `sistemas/` guardam mídias originais locais e não são necessárias no build.

A imagem de compartilhamento está em `public/og-image.png`; título, descrição e endereço ficam em `index.html`.

## Publicação

O workflow `.github/workflows/deploy.yml` gera o site e publica `dist/` no GitHub Pages após um push para `main`. Ele configura automaticamente o caminho base do repositório. No GitHub, a origem de publicação do Pages deve estar definida como GitHub Actions.

Para testar o caminho de projeto do GitHub Pages no PowerShell:

```powershell
$env:VITE_BASE_PATH='/matheus-portfolio/'
npm run build
Remove-Item Env:VITE_BASE_PATH
```

Os estudos de caso usam endereços com `#project/slug`, sem necessidade de configuração de rotas no servidor. Antes de publicar, revise o conteúdo, as permissões de uso das mídias e teste navegação, contatos, vídeos, filtros e layout em telas diferentes.
