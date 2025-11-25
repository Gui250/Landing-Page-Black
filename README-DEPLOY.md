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

⚠️ **IMPORTANTE:** Configure as variáveis de ambiente antes de fazer o deploy!

### Variáveis Obrigatórias:

1. **`GOOGLE_CREDENTIALS`** (Obrigatória)
   - Conteúdo completo do arquivo JSON de credenciais do Google Service Account
   - Veja o guia completo em [GUIA-VARIAVEIS-AMBIENTE.md](./GUIA-VARIAVEIS-AMBIENTE.md)

### Variáveis Opcionais:

2. **`GOOGLE_SPREADSHEET_ID`** (Opcional)
   - ID da planilha do Google Sheets
   - Padrão: `1XpZ1LZG8AD14aT2F7KVdsOGrUU7gJ6iqaKpcL9FCGHg`

3. **`FRONTEND_URL`** (Opcional)
   - URL do frontend em produção para CORS
   - Padrão: `*` (aceita qualquer origem)

### Como Configurar:

1. Acesse o painel da Vercel: **Settings** > **Environment Variables**
2. Adicione `GOOGLE_CREDENTIALS` com o conteúdo completo do JSON de credenciais
3. Faça um novo deploy para aplicar as variáveis

📖 **Guia Completo:** Consulte [GUIA-VARIAVEIS-AMBIENTE.md](./GUIA-VARIAVEIS-AMBIENTE.md) para instruções detalhadas.

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

1. **Credenciais do Google Sheets**: 
   - ⚠️ **OBRIGATÓRIO:** Configure a variável `GOOGLE_CREDENTIALS` na Vercel
   - O código agora suporta variáveis de ambiente (produção) e arquivo `credentials.json` (desenvolvimento local)
   - Veja [GUIA-VARIAVEIS-AMBIENTE.md](./GUIA-VARIAVEIS-AMBIENTE.md) para instruções completas

2. **Build**: O build do frontend é executado automaticamente pela Vercel usando o comando definido em `vercel.json`.

3. **CORS**: O CORS está configurado para aceitar requisições de qualquer origem em desenvolvimento. Em produção, configure `FRONTEND_URL` para maior segurança.

4. **Deploy**: Após adicionar variáveis de ambiente, você **DEVE** fazer um novo deploy para que elas sejam aplicadas!
