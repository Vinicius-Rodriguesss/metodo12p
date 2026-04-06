import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCApbwNWTQK1FENL8Bymok-BGhbCyYuCIE"
const genAI = new GoogleGenerativeAI(apiKey);

async function listar() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    
    console.log("--- Modelos Disponíveis ---");
    data.models.forEach(m => {
      if (m.supportedGenerationMethods.includes("generateContent")) {
        console.log(`Nome: ${m.name} | Descrição: ${m.description}`);
      }
    });
  } catch (e) {
    console.error("Erro ao listar modelos:", e);
  }
}

listar();

// node src/service/AI/lista_modelos.js