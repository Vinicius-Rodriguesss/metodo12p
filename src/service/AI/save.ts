const STORAGE_KEY = 'product-chat-last-response'

export function salvarUltimaRespostaProduto(resposta: string) {
  if (typeof window === 'undefined') {
    return resposta
  }

  window.localStorage.setItem(STORAGE_KEY, resposta)
  return resposta
}
