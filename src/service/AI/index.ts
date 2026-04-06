import { gerarRespostaProduto } from '../AI/generate.js'
import estoque from '../../Mock/index.js'

const resposta = await gerarRespostaProduto({
  pergunta: 'Quais fornecedores estão disponíveis?',
  contexto: JSON.stringify(estoque),
  nomeEmpresa: 'Metodo 12P',
})

console.log(resposta)


// npx tsx src/service/AI/index.ts