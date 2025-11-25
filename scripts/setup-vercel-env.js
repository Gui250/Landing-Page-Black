#!/usr/bin/env node

/**
 * Script para preparar variáveis de ambiente para a Vercel
 *
 * Este script lê o arquivo credentials.json e prepara os comandos
 * para configurar as variáveis de ambiente na Vercel.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log("🚀 Configurador de Variáveis de Ambiente para Vercel\n");
  console.log(
    "Este script vai ajudar você a configurar as variáveis de ambiente.\n"
  );

  // Verificar se existe credentials.json
  const credentialsPath = path.join(__dirname, "../backend/credentials.json");
  let credentialsContent = null;

  if (fs.existsSync(credentialsPath)) {
    console.log("✅ Arquivo credentials.json encontrado!\n");
    try {
      credentialsContent = fs.readFileSync(credentialsPath, "utf8");
      // Validar se é JSON válido
      JSON.parse(credentialsContent);
      console.log("✅ JSON válido!\n");
    } catch (error) {
      console.error(
        "❌ Erro: O arquivo credentials.json não é um JSON válido!"
      );
      console.error("   Erro:", error.message);
      process.exit(1);
    }
  } else {
    console.log(
      "⚠️  Arquivo credentials.json não encontrado em:",
      credentialsPath
    );
    console.log("   Você precisará fornecer o conteúdo do JSON manualmente.\n");
  }

  // Perguntar sobre o Spreadsheet ID
  const spreadsheetId = await question(
    "📊 ID da Planilha do Google Sheets (ou Enter para usar o padrão): "
  );
  const finalSpreadsheetId =
    spreadsheetId.trim() || "1XpZ1LZG8AD14aT2F7KVdsOGrUU7gJ6iqaKpcL9FCGHg";

  // Perguntar sobre o Frontend URL
  const frontendUrl = await question(
    '🌐 URL do Frontend (ou Enter para usar "*" - aceita qualquer origem): '
  );
  const finalFrontendUrl = frontendUrl.trim() || "*";

  console.log("\n" + "=".repeat(60));
  console.log("📋 COMANDOS PARA EXECUTAR NA VERCEL");
  console.log("=".repeat(60) + "\n");

  console.log("Opção 1: Via CLI da Vercel (Recomendado)\n");
  console.log("1. Instale a Vercel CLI (se ainda não tiver):");
  console.log("   npm install -g vercel\n");
  console.log("2. Faça login:");
  console.log("   vercel login\n");
  console.log("3. Configure as variáveis de ambiente:\n");

  if (credentialsContent) {
    // Minificar o JSON (remover espaços e quebras de linha, mas manter \n no private_key)
    const minified = credentialsContent
      .replace(/\s+(?=(?:[^"]*"[^"]*")*[^"]*$)/g, " ")
      .replace(/\n(?=(?:[^"]*"[^"]*")*[^"]*$)/g, "")
      .trim();

    console.log("   # Variável GOOGLE_CREDENTIALS");
    console.log("   vercel env add GOOGLE_CREDENTIALS production");
    console.log("   # Cole o seguinte JSON quando solicitado:");
    console.log("   " + minified.substring(0, 100) + "...\n");
    console.log("   # OU use este comando direto (Linux/Mac):");
    console.log(
      `   echo '${minified.replace(
        /'/g,
        "'\\''"
      )}' | vercel env add GOOGLE_CREDENTIALS production\n`
    );
  } else {
    console.log("   # Variável GOOGLE_CREDENTIALS");
    console.log("   vercel env add GOOGLE_CREDENTIALS production");
    console.log(
      "   # Cole o conteúdo completo do seu arquivo JSON quando solicitado\n"
    );
  }

  if (finalSpreadsheetId !== "1XpZ1LZG8AD14aT2F7KVdsOGrUU7gJ6iqaKpcL9FCGHg") {
    console.log("   # Variável GOOGLE_SPREADSHEET_ID");
    console.log(`   vercel env add GOOGLE_SPREADSHEET_ID production`);
    console.log(`   # Digite: ${finalSpreadsheetId}\n`);
  }

  if (finalFrontendUrl !== "*") {
    console.log("   # Variável FRONTEND_URL");
    console.log(`   vercel env add FRONTEND_URL production`);
    console.log(`   # Digite: ${finalFrontendUrl}\n`);
  }

  console.log("4. Faça o deploy:");
  console.log("   vercel --prod\n");

  console.log("=".repeat(60));
  console.log("Opção 2: Via Painel Web da Vercel\n");
  console.log("1. Acesse: https://vercel.com/dashboard");
  console.log("2. Selecione seu projeto");
  console.log("3. Vá em Settings > Environment Variables");
  console.log("4. Adicione as seguintes variáveis:\n");

  if (credentialsContent) {
    console.log("   Nome: GOOGLE_CREDENTIALS");
    console.log("   Valor: (cole o conteúdo completo do credentials.json)");
    console.log(
      "   Environment: Production (e Preview/Development se necessário)\n"
    );
  } else {
    console.log("   Nome: GOOGLE_CREDENTIALS");
    console.log(
      "   Valor: (cole o conteúdo completo do seu arquivo JSON de credenciais)"
    );
    console.log(
      "   Environment: Production (e Preview/Development se necessário)\n"
    );
  }

  if (finalSpreadsheetId !== "1XpZ1LZG8AD14aT2F7KVdsOGrUU7gJ6iqaKpcL9FCGHg") {
    console.log("   Nome: GOOGLE_SPREADSHEET_ID");
    console.log(`   Valor: ${finalSpreadsheetId}`);
    console.log("   Environment: Production\n");
  }

  if (finalFrontendUrl !== "*") {
    console.log("   Nome: FRONTEND_URL");
    console.log(`   Valor: ${finalFrontendUrl}`);
    console.log("   Environment: Production\n");
  }

  console.log(
    "5. ⚠️  IMPORTANTE: Faça um novo deploy após adicionar as variáveis!\n"
  );

  console.log("=".repeat(60));
  console.log("📝 RESUMO DAS VARIÁVEIS");
  console.log("=".repeat(60) + "\n");
  console.log("✅ GOOGLE_CREDENTIALS - Obrigatória");
  if (finalSpreadsheetId !== "1XpZ1LZG8AD14aT2F7KVdsOGrUU7gJ6iqaKpcL9FCGHg") {
    console.log("✅ GOOGLE_SPREADSHEET_ID - Configurada");
  } else {
    console.log(
      "ℹ️  GOOGLE_SPREADSHEET_ID - Usando padrão (não precisa configurar)"
    );
  }
  if (finalFrontendUrl !== "*") {
    console.log("✅ FRONTEND_URL - Configurada");
  } else {
    console.log(
      'ℹ️  FRONTEND_URL - Usando padrão "*" (não precisa configurar)'
    );
  }

  console.log("\n" + "=".repeat(60));
  console.log("✨ Pronto! Siga as instruções acima para configurar na Vercel.");
  console.log("=".repeat(60) + "\n");

  rl.close();
}

main().catch(console.error);
