// import 'dotenv/config'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { montarPromptProduto } from './prompt.js'
import type { GerarRespostaProdutoParams } from './types.js'


const apiKey = "AIzaSyCApbwNWTQK1FENL8Bymok-BGhbCyYuCIE"

export async function gerarRespostaProduto({
  pergunta,
  contexto = '',
  nomeEmpresa = 'sua empresa',
}: GerarRespostaProdutoParams) {
  try {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY nao foi definida.')
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite-preview',
      generationConfig: {
        temperature: 0.4,
      },
    })

    const prompt = montarPromptProduto({
      pergunta,
      contexto,
      nomeEmpresa,
    })

    const result = await model.generateContent(prompt)
    const response = await result.response
    console.log('Resposta Gemini:', response)

    return response.text()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Falha ao gerar resposta.'
    console.error('Erro Gemini:', message)
    throw new Error(message)
  }
}