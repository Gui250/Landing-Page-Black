# Guia de Configuração de Variáveis de Ambiente na Vercel

Este guia explica como configurar as variáveis de ambiente necessárias para o projeto funcionar na Vercel.

## 📋 Variáveis de Ambiente Necessárias

### 1. `GOOGLE_CREDENTIALS` (Obrigatória)
Credenciais do Google Service Account em formato JSON (string).

### 2. `GOOGLE_SPREADSHEET_ID` (Opcional)
ID da planilha do Google Sheets. Se não fornecida, usa o valor padrão.

### 3. `FRONTEND_URL` (Opcional)
URL do frontend em produção para configuração de CORS. Padrão: `*` (aceita qualquer origem).

---

## 🔧 Como Obter as Credenciais do Google

### Passo 1: Criar Service Account no Google Cloud

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá em **APIs & Services** > **Credentials**
4. Clique em **Create Credentials** > **Service Account**
5. Preencha os dados e clique em **Create and Continue**
6. Adicione a role **Editor** (ou **Owner**)
7. Clique em **Done**

### Passo 2: Criar e Baixar a Chave JSON

1. Na lista de Service Accounts, clique no que você criou
2. Vá na aba **Keys**
3. Clique em **Add Key** > **Create new key**
4. Selecione **JSON** e clique em **Create**
5. Um arquivo JSON será baixado (ex: `projeto-12345-abcde.json`)

### Passo 3: Habilitar Google Sheets API

1. No Google Cloud Console, vá em **APIs & Services** > **Library**
2. Procure por **Google Sheets API**
3. Clique em **Enable**

### Passo 4: Compartilhar a Planilha com o Service Account

1. Abra sua planilha do Google Sheets
2. Clique em **Share** (Compartilhar)
3. Adicione o **email do Service Account** (encontrado no arquivo JSON como `client_email`)
4. Dê permissão de **Editor**
5. Clique em **Send**

---

## 📝 Como Converter o JSON para Variável de Ambiente

### Opção 1: Converter o JSON Completo (Recomendado)

1. Abra o arquivo JSON baixado (ex: `projeto-12345-abcde.json`)
2. Copie **TODO o conteúdo** do arquivo
3. Cole na variável de ambiente `GOOGLE_CREDENTIALS` na Vercel

**Exemplo do conteúdo do JSON:**
```json
{
  "type": "service_account",
  "project_id": "meu-projeto",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "service-account@meu-projeto.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

### Opção 2: Usar Ferramenta Online (Alternativa)

Se preferir, você pode usar uma ferramenta para converter o JSON em uma string de uma linha:

1. Acesse [jsonformatter.org](https://jsonformatter.org/json-minify) ou similar
2. Cole o conteúdo do JSON
3. Minifique (remova espaços e quebras de linha)
4. Copie o resultado e cole na Vercel

**⚠️ Importante:** Mantenha as quebras de linha (`\n`) no campo `private_key`!

---

## 🚀 Como Configurar na Vercel

### Método 1: Via Painel Web (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Selecione seu projeto
3. Vá em **Settings** > **Environment Variables**
4. Adicione as variáveis:

   **Variável 1:**
   - **Name:** `GOOGLE_CREDENTIALS`
   - **Value:** Cole o JSON completo (todo o conteúdo do arquivo)
   - **Environment:** Selecione `Production`, `Preview` e `Development` (ou apenas Production)

   **Variável 2 (Opcional):**
   - **Name:** `GOOGLE_SPREADSHEET_ID`
   - **Value:** `1XpZ1LZG8AD14aT2F7KVdsOGrUU7gJ6iqaKpcL9FCGHg` (ou seu ID)
   - **Environment:** Selecione conforme necessário

   **Variável 3 (Opcional):**
   - **Name:** `FRONTEND_URL`
   - **Value:** `https://seu-dominio.vercel.app` (URL do seu frontend)
   - **Environment:** Apenas `Production`

5. Clique em **Save**
6. **⚠️ IMPORTANTE:** Faça um novo deploy para as variáveis serem aplicadas!

### Método 2: Via CLI

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm install -g vercel

# Fazer login
vercel login

# Adicionar variáveis de ambiente
vercel env add GOOGLE_CREDENTIALS production
# Cole o JSON quando solicitado

vercel env add GOOGLE_SPREADSHEET_ID production
# Cole o ID da planilha quando solicitado

# Fazer deploy novamente
vercel --prod
```

---

## ✅ Verificação

Após configurar as variáveis e fazer o deploy:

1. Acesse: `https://seu-dominio.vercel.app/api/googlesheets/metadata`
2. Se retornar dados da planilha, está funcionando! ✅
3. Se retornar erro, verifique:
   - Se o JSON está completo e válido
   - Se o Service Account tem acesso à planilha
   - Se a Google Sheets API está habilitada
   - Se fez um novo deploy após adicionar as variáveis

---

## 🔒 Segurança

- **NUNCA** commite o arquivo `credentials.json` no Git
- **NUNCA** compartilhe as credenciais publicamente
- Use variáveis de ambiente apenas na Vercel
- Mantenha o arquivo `credentials.json` apenas localmente (já está no `.gitignore`)

---

## 📚 Estrutura do JSON de Credenciais

O arquivo JSON deve ter esta estrutura:

```json
{
  "type": "service_account",
  "project_id": "seu-projeto-id",
  "private_key_id": "chave-privada-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...chave completa...\n-----END PRIVATE KEY-----\n",
  "client_email": "nome@projeto.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**⚠️ Atenção:** O campo `private_key` contém quebras de linha (`\n`) que devem ser preservadas!

---

## 🆘 Troubleshooting

### Erro: "Credenciais não encontradas"
- Verifique se a variável `GOOGLE_CREDENTIALS` está configurada na Vercel
- Certifique-se de que fez um novo deploy após adicionar a variável

### Erro: "Erro ao parsear GOOGLE_CREDENTIALS"
- Verifique se o JSON está completo e válido
- Certifique-se de que copiou TODO o conteúdo do arquivo JSON

### Erro: "Permission denied" ou "The caller does not have permission"
- Verifique se o Service Account tem acesso à planilha
- Compartilhe a planilha com o email do Service Account (`client_email`)

### Erro: "API not enabled"
- Habilite a Google Sheets API no Google Cloud Console

---

## 📞 Suporte

Se tiver problemas, verifique:
1. Logs da Vercel em **Deployments** > **Functions** > **View Function Logs**
2. Console do Google Cloud para erros de autenticação
3. Permissões da planilha do Google Sheets

