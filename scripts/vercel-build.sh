#!/bin/bash
set -e

# Detectar o diretório raiz do projeto
if [ -f "package.json" ] && [ -d "backend" ] && [ -d "landing-page-black" ]; then
  # Estamos na raiz do projeto
  ROOT_DIR="."
elif [ -f "../package.json" ] && [ -d "../backend" ] && [ -d "." ]; then
  # Estamos dentro de landing-page-black
  ROOT_DIR=".."
  cd ..
else
  echo "❌ Erro: Não foi possível detectar a estrutura do projeto"
  echo "   Certifique-se de que está na raiz do monorepo"
  exit 1
fi

echo "📦 Instalando dependências do backend..."
npm install --prefix "$ROOT_DIR/backend"

echo "📦 Instalando dependências do frontend..."
npm install --prefix "$ROOT_DIR/landing-page-black"

echo "🏗️  Fazendo build do frontend..."
npm run build --prefix "$ROOT_DIR/landing-page-black"

echo "✅ Build concluído com sucesso!"

