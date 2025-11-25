# Deploy na Vercel - Guia de Configuração

Este projeto foi configurado para deploy automático na Vercel como um monorepo.

## Estrutura do Projeto

```
/
├── backend/          # Backend Express (serverless)
├── landing-page-black/  # Frontend React + Vite
├── api/             # Serverless functions handler para Vercel
├── vercel.json      # Configuração do Vercel
└── package.json     # Scripts de build do monorepo
```

## O que foi configurado:

### 1. Backend Serverless

- ✅ Removido `app.listen()` - não funciona em serverless
- ✅ App Express exportado como default
- ✅ CORS configurado para aceitar requisições do frontend
- ✅ Rotas disponíveis em `/api/googlesheets/*`

### 2. Frontend

- ✅ Build configurado para gerar arquivos estáticos em `landing-page-black/dist`
- ✅ Proxy local mantido apenas para desenvolvimento
- ✅ Requisições para `/api/*` são automaticamente roteadas para serverless functions na Vercel

### 3. Vercel Configuration

- ✅ `vercel.json` configurado com:
  - Install command para instalar dependências da raiz
  - Build command que instala dependências do backend e frontend, depois faz build do frontend
  - Output directory apontando para `landing-page-black/dist`
  - Rewrites para rotas `/api/*` apontando para serverless function

## Como fazer o Deploy:

### Opção 1: Via Git (Recomendado)

1. Faça commit de todas as alterações:

   ```bash
   git add .
   git commit -m "Configure Vercel deployment"
   git push origin main
   ```

2. Conecte o repositório na Vercel:
   - Acesse [vercel.com](https://vercel.com)
   - Importe o repositório
   - A Vercel detectará automaticamente a configuração

### Opção 2: Via CLI

```bash
npm install -g vercel
vercel
```

## Variáveis de Ambiente

Configure as seguintes variáveis no painel da Vercel (Settings > Environment Variables):

- `FRONTEND_URL`: URL do frontend em produção (opcional, padrão: "\*")
- Qualquer outra variável que o backend precise (ex: credenciais do Google Sheets)

## Arquivos Importantes

- **`vercel.json`**: Configuração principal do Vercel
- **`api/index.ts`**: Handler serverless que importa o app Express
- **`backend/src/server.ts`**: App Express configurado para serverless
- **`package.json` (raiz)**: Scripts de build do monorepo

## Rotas da API

Após o deploy, as rotas estarão disponíveis em:

- `https://seu-dominio.vercel.app/api/googlesheets/metadata`
- `https://seu-dominio.vercel.app/api/googlesheets/sheets`
- `https://seu-dominio.vercel.app/api/googlesheets/add-row`

## Notas Importantes

1. **Credenciais do Google Sheets**: Certifique-se de adicionar o arquivo `credentials.json` no backend ou configurar as variáveis de ambiente necessárias.

2. **Build**: O build do frontend é executado automaticamente pela Vercel usando o comando definido em `vercel.json`.

3. **CORS**: O CORS está configurado para aceitar requisições de qualquer origem em desenvolvimento. Em produção, configure `FRONTEND_URL` para maior segurança.
