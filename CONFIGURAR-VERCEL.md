# 🚀 Guia Rápido: Configurar Variáveis de Ambiente na Vercel

Este guia mostra como configurar as variáveis de ambiente necessárias para o projeto funcionar na Vercel.

## ⚡ Método Rápido (Recomendado)

### Opção 1: Script Automático (via CLI da Vercel)

```bash
# 1. Instale a Vercel CLI (se ainda não tiver)
npm install -g vercel

# 2. Faça login
vercel login

# 3. Execute o script de configuração
npm run config:vercel
```

O script vai:

- ✅ Verificar se você tem o arquivo `credentials.json`
- ✅ Validar o JSON
- ✅ Configurar automaticamente todas as variáveis na Vercel

### Opção 2: Script Interativo (gera comandos)

```bash
npm run setup:vercel
```

Este script vai gerar os comandos exatos que você precisa executar.

---

## 📋 Método Manual (Via Painel Web)

### Passo 1: Obter o Conteúdo do JSON

1. Abra o arquivo `backend/credentials.json`
2. Copie **TODO o conteúdo** do arquivo
3. Mantenha-o pronto para colar

### Passo 2: Configurar na Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto **Landing-Page-Black**
3. Vá em **Settings** > **Environment Variables**
4. Clique em **Add New**

#### Variável 1: GOOGLE_CREDENTIALS (Obrigatória)

- **Name:** `GOOGLE_CREDENTIALS`
- **Value:** Cole o conteúdo completo do arquivo `credentials.json`
- **Environment:** Selecione:
  - ✅ Production
  - ✅ Preview (opcional)
  - ✅ Development (opcional)

Clique em **Save**

#### Variável 2: GOOGLE_SPREADSHEET_ID (Opcional)

Se você quiser usar uma planilha diferente da padrão:

- **Name:** `GOOGLE_SPREADSHEET_ID`
- **Value:** `1XpZ1LZG8AD14aT2F7KVdsOGrUU7gJ6iqaKpcL9FCGHg` (ou seu ID)
- **Environment:** Production

#### Variável 3: FRONTEND_URL (Opcional)

Para maior segurança, configure a URL do seu frontend:

- **Name:** `FRONTEND_URL`
- **Value:** `https://seu-dominio.vercel.app`
- **Environment:** Production

### Passo 3: Fazer Novo Deploy

⚠️ **IMPORTANTE:** Após adicionar as variáveis, você **DEVE** fazer um novo deploy!

1. Vá em **Deployments**
2. Clique nos **3 pontos** do último deployment
3. Clique em **Redeploy**
4. Ou faça um novo commit e push

---

## ✅ Verificação

Após configurar e fazer o deploy:

1. Acesse: `https://seu-dominio.vercel.app/api/googlesheets/metadata`
2. Se retornar dados da planilha, está funcionando! ✅
3. Se retornar erro, verifique os logs em **Deployments** > **Functions**

---

## 🔍 Onde Encontrar o credentials.json?

O arquivo `credentials.json` é gerado quando você cria um Service Account no Google Cloud:

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Vá em **APIs & Services** > **Credentials**
3. Crie um **Service Account**
4. Baixe a chave JSON

📖 **Guia Completo:** Veja [GUIA-VARIAVEIS-AMBIENTE.md](./GUIA-VARIAVEIS-AMBIENTE.md) para instruções detalhadas.

---

## 🆘 Problemas Comuns

### "Credenciais não encontradas"

- Verifique se a variável `GOOGLE_CREDENTIALS` está configurada
- Certifique-se de que fez um novo deploy após adicionar

### "Erro ao parsear GOOGLE_CREDENTIALS"

- Verifique se copiou TODO o conteúdo do JSON
- Certifique-se de que o JSON está válido

### "Permission denied"

- Compartilhe a planilha com o email do Service Account
- O email está no campo `client_email` do JSON

---

## 📞 Precisa de Ajuda?

Consulte o guia completo: [GUIA-VARIAVEIS-AMBIENTE.md](./GUIA-VARIAVEIS-AMBIENTE.md)
