# ⚡ Como Configurar Variáveis de Ambiente na Vercel

## 🎯 Método Mais Rápido (Recomendado)

### 1. Instale a Vercel CLI (se ainda não tiver)

```bash
npm install -g vercel
```

### 2. Faça login na Vercel

```bash
vercel login
```

### 3. Execute o script automático

```bash
npm run config:vercel
```

O script vai:
- ✅ Ler seu arquivo `credentials.json`
- ✅ Validar o JSON
- ✅ Configurar automaticamente todas as variáveis na Vercel
- ✅ Perguntar sobre Spreadsheet ID e Frontend URL (opcionais)

### 4. Faça o deploy

```bash
vercel --prod
```

**Pronto!** 🎉

---

## 📋 Método Manual (Via Painel Web)

Se preferir configurar manualmente:

### Passo 1: Acesse o Painel da Vercel

1. Vá em [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Clique em **Settings** > **Environment Variables**

### Passo 2: Adicione a Variável GOOGLE_CREDENTIALS

1. Clique em **Add New**
2. **Name:** `GOOGLE_CREDENTIALS`
3. **Value:** Abra o arquivo `backend/credentials.json` e copie **TODO o conteúdo**
4. **Environment:** Selecione:
   - ✅ Production
   - ✅ Preview (opcional)
   - ✅ Development (opcional)
5. Clique em **Save**

### Passo 3: Faça um Novo Deploy

⚠️ **IMPORTANTE:** Após adicionar a variável, você **DEVE** fazer um novo deploy!

1. Vá em **Deployments**
2. Clique nos **3 pontos** do último deployment
3. Clique em **Redeploy**

---

## ✅ Verificar se Funcionou

Após o deploy, teste a API:

```
https://seu-dominio.vercel.app/api/googlesheets/metadata
```

Se retornar dados da planilha, está funcionando! ✅

---

## 📚 Mais Informações

- **Guia Completo:** [GUIA-VARIAVEIS-AMBIENTE.md](./GUIA-VARIAVEIS-AMBIENTE.md)
- **Guia Rápido:** [CONFIGURAR-VERCEL.md](./CONFIGURAR-VERCEL.md)

