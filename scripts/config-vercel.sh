#!/bin/bash

# Script para configurar variáveis de ambiente na Vercel via CLI
# Uso: ./scripts/config-vercel.sh

set -e

echo "🚀 Configurador de Variáveis de Ambiente para Vercel"
echo ""

# Verificar se vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI não está instalado!"
    echo "   Instale com: npm install -g vercel"
    exit 1
fi

# Verificar se está logado
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Você não está logado na Vercel CLI"
    echo "   Execute: vercel login"
    exit 1
fi

echo "✅ Vercel CLI detectado"
echo ""

# Verificar se existe credentials.json
CREDENTIALS_PATH="./backend/credentials.json"
if [ ! -f "$CREDENTIALS_PATH" ]; then
    echo "❌ Arquivo credentials.json não encontrado em: $CREDENTIALS_PATH"
    echo "   Por favor, coloque o arquivo de credenciais do Google Service Account lá."
    exit 1
fi

echo "✅ Arquivo credentials.json encontrado"
echo ""

# Ler o conteúdo do JSON
CREDENTIALS_CONTENT=$(cat "$CREDENTIALS_PATH")

# Validar JSON
if ! echo "$CREDENTIALS_CONTENT" | jq . > /dev/null 2>&1; then
    echo "❌ O arquivo credentials.json não é um JSON válido!"
    exit 1
fi

echo "✅ JSON válido"
echo ""

# Perguntar sobre o ambiente
read -p "📦 Ambiente (production/preview/development) [production]: " ENV
ENV=${ENV:-production}

echo ""
echo "📋 Configurando variáveis de ambiente..."
echo ""

# Configurar GOOGLE_CREDENTIALS
echo "1️⃣  Configurando GOOGLE_CREDENTIALS..."
echo "$CREDENTIALS_CONTENT" | vercel env add GOOGLE_CREDENTIALS "$ENV"

# Perguntar sobre Spreadsheet ID
read -p "📊 ID da Planilha (ou Enter para usar padrão): " SPREADSHEET_ID
if [ -n "$SPREADSHEET_ID" ]; then
    echo "$SPREADSHEET_ID" | vercel env add GOOGLE_SPREADSHEET_ID "$ENV"
    echo "✅ GOOGLE_SPREADSHEET_ID configurado"
fi

# Perguntar sobre Frontend URL
read -p "🌐 URL do Frontend (ou Enter para usar '*': " FRONTEND_URL
if [ -n "$FRONTEND_URL" ]; then
    echo "$FRONTEND_URL" | vercel env add FRONTEND_URL "$ENV"
    echo "✅ FRONTEND_URL configurado"
fi

echo ""
echo "✅ Variáveis de ambiente configuradas!"
echo ""
echo "⚠️  IMPORTANTE: Faça um novo deploy para aplicar as variáveis:"
echo "   vercel --prod"
echo ""

