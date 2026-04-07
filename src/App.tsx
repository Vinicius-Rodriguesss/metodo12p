import { useState, useRef, useEffect } from 'react'
import type { FormEvent } from 'react'

type Message = {
  id: number
  role: 'assistant' | 'user'
  content: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content:
      'Olá! 👋 Estou aqui para responder sobre **produtos**, **estoque** e **informações comerciais**.\n\nComo posso te ajudar hoje?',
  },
]

const quickChips = [
  { label: 'Produtos disponíveis' },
  { label: 'Verificar estoque' },
  { label: 'Tabela de preços' },
]

const renderContent = (content: string) => {
  return content.split('\n').map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g)
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? (
            <strong key={j} style={{ color: '#f0c040', fontWeight: 500 }}>
              {part}
            </strong>
          ) : (
            part
          )
        )}
        {i < arr.length - 1 && <br />}
      </span>
    )
  })
}

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M14 8L2 2l3 6-3 6 12-6z" fill="#0a0a0a" />
  </svg>
)

const TypingIndicator = () => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
    <div style={styles.avatar}>12</div>
    <div style={styles.typingBubble}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            ...styles.typingDot,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  </div>
)

const App = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const addMessages = async (userText: string) => {
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: userText,
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const response = await fetch('https://back-12-p.vercel.app/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pergunta: userText,
          nomeEmpresa: 'Metodo 12P',
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const respostaIA = data.resposta

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: respostaIA,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Erro ao gerar resposta:', error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content:
          '⚠️ Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return
    addMessages(trimmed)
    setInput('')
  }

  const handleQuickChip = (label: string) => {
    if (isLoading) return
    addMessages(label)
  }

  return (
    <div style={styles.page}>
      <div style={styles.chatWrapper}>

        {/* HEADER */}
        <header style={styles.header}>
          <div style={styles.logoBox}>
            <span style={styles.logoText}>12P</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={styles.headerName}>Método 12P</p>
            <p style={styles.headerSub}>Estoque · Preços · Importação</p>
          </div>
          <div style={styles.statusBadge}>
            <div style={styles.statusDot} />
            Online
          </div>
        </header>

        {/* MESSAGES */}
        <main style={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.role === 'assistant' && (
                <div style={styles.avatar}>12</div>
              )}

              <div
                style={
                  msg.role === 'user'
                    ? styles.bubbleUser
                    : styles.bubbleAssistant
                }
              >
                {renderContent(msg.content)}
              </div>

              {msg.role === 'assistant' && i === 0 && (
                <div style={styles.chips}>
                  {quickChips.map(({ label }) => (
                    <button
                      key={label}
                      onClick={() => handleQuickChip(label)}
                      disabled={isLoading}
                      style={styles.chip}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.background = '#c9971a22')
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.background = '#1a1400')
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && <TypingIndicator />}

          <div ref={bottomRef} />
        </main>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <form onSubmit={handleSubmit} style={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre produtos, estoque, preços..."
              disabled={isLoading}
              style={styles.input}
              onFocus={(e) =>
                ((e.currentTarget as HTMLInputElement).style.borderColor = '#c9971a66')
              }
              onBlur={(e) =>
                ((e.currentTarget as HTMLInputElement).style.borderColor = '#2a2a2a')
              }
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                ...styles.sendBtn,
                background: isLoading || !input.trim() ? '#333' : '#c9971a',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              Enviar <SendIcon />
            </button>
          </form>
          <p style={styles.footerLabel}>MÉTODO 12P — IMPORTAÇÃO DA CHINA</p>
        </footer>
      </div>

      <style>{`
        @keyframes bounce12p {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }
      `}</style>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#060606',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  chatWrapper: {
    width: '100%',
    maxWidth: '860px',
    height: '92vh',
    maxHeight: '820px',
    display: 'flex',
    flexDirection: 'column',
    background: '#0d0d0d',
    borderRadius: '20px',
    border: '1px solid #2a2a2a',
    overflow: 'hidden',
  },

  // HEADER
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #111 0%, #1a1200 100%)',
    borderBottom: '1px solid rgba(201, 151, 26, 0.2)',
    flexShrink: 0,
  },
  logoBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: '#c9971a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoText: {
    fontSize: 13,
    fontWeight: 700,
    color: '#0a0a0a',
    letterSpacing: '0.5px',
  },
  headerName: {
    fontSize: 15,
    fontWeight: 600,
    color: '#f0c040',
    letterSpacing: '0.3px',
  },
  headerSub: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 11,
    color: '#5dca90',
    background: '#0f2b1a',
    border: '1px solid #1d6b40',
    padding: '4px 10px',
    borderRadius: 20,
    flexShrink: 0,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#5dca90',
  },

  // MESSAGES
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    background: '#0d0d0d',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: '#c9971a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    color: '#0a0a0a',
    marginBottom: 4,
    flexShrink: 0,
  },
  bubbleUser: {
    maxWidth: '78%',
    padding: '10px 14px',
    borderRadius: '14px 14px 4px 14px',
    fontSize: 13.5,
    lineHeight: 1.55,
    background: '#c9971a',
    color: '#0a0a0a',
    fontWeight: 500,
  },
  bubbleAssistant: {
    maxWidth: '78%',
    padding: '10px 14px',
    borderRadius: '4px 14px 14px 14px',
    fontSize: 13.5,
    lineHeight: 1.55,
    background: '#1a1a1a',
    color: '#e8e8e8',
    border: '1px solid #2a2a2a',
  },
  chips: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    fontSize: 11,
    padding: '5px 12px',
    borderRadius: 20,
    border: '1px solid rgba(201, 151, 26, 0.4)',
    color: '#c9971a',
    background: '#1a1400',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background 0.15s',
  },

  // TYPING
  typingBubble: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '10px 14px',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '4px 14px 14px 14px',
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#c9971a',
    animation: 'bounce12p 1.2s infinite',
  },

  // FOOTER
  footer: {
    padding: '12px 16px',
    background: '#111',
    borderTop: '1px solid #222',
    flexShrink: 0,
  },
  inputRow: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: 24,
    padding: '9px 16px',
    fontSize: 13,
    color: '#e8e8e8',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  },
  sendBtn: {
    border: 'none',
    borderRadius: 24,
    padding: '9px 18px',
    fontSize: 13,
    fontWeight: 600,
    color: '#0a0a0a',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    transition: 'background 0.15s',
    whiteSpace: 'nowrap',
  },
  footerLabel: {
    textAlign: 'center',
    fontSize: 10,
    color: '#444',
    marginTop: 8,
    letterSpacing: '0.5px',
  },
}

export default App
