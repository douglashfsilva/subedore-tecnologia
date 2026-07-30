# Subedore Tecnologia

Landing page institucional da Subedore Tecnologia, preparada para publicação como **Cloudflare Worker com Static Assets**.

## Estrutura

- `public/`: arquivos estáticos publicados no site;
- `wrangler.toml`: configuração do Worker e da pasta de assets;
- `package.json`: comandos de desenvolvimento e deploy.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Deploy manual

```bash
npm run deploy
```

## Cloudflare Workers Builds

Ao conectar este repositório ao Cloudflare Workers:

- Production branch: `main`
- Build command: deixar em branco
- Deploy command: `npx wrangler deploy`
- Root directory: deixar em branco

O domínio `subedore.com.br` deve ser vinculado ao Worker após a validação do endereço `workers.dev`.
