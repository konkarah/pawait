import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

type Message = {
  type: 'user' | 'ai'
  content: string
  timestamp: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    const saved = localStorage.getItem('travel-assistant-messages')
    if (saved) setMessages(JSON.parse(saved))
  }, [])


  useEffect(() => {
    localStorage.setItem('travel-assistant-messages', JSON.stringify(messages))
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      type: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMessage])
    setLoading(true)

    try {
      const response = await axios.post('http://127.0.0.1:8000/query', {
        question: input,
      })

      const aiMessage: Message = {
        type: 'ai',
        content: response.data.response || response.data.error || 'No response',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        type: 'ai',
        content: '⚠️ Error: Could not connect to server.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, errorMessage])
    }

    setInput('')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="max-w-screen-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">✈️ Welcome to PawaIT Chat</h1>
          <p className="text-gray-600 text-sm">Ask any questions you may have</p>
        </div>
      </header>

      {/* Message Display */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        {/* Floating history panel */}
        <div className="fixed bottom-4 left-4 z-10">
          <details className="bg-white shadow-md border rounded-md w-64 max-h-96 overflow-y-auto p-4">
            <summary className="cursor-pointer font-semibold text-sm text-gray-800">🕘 Previous Questions</summary>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              {messages
                .filter(msg => msg.type === 'user')
                .map((msg, idx) => (
                  <li key={idx} className="border-b pb-1">
                    {msg.content}
                  </li>
                ))}
            </ul>
          </details>
        </div>

        <div className="max-w-screen-md mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-32">
              <div className="text-6xl mb-4">🌍</div>
              <h2 className="text-xl font-semibold mb-2">Welcome to PawaIT</h2>
              <p className="mb-1">Ask any questions you may have</p>
              <p className="text-sm text-gray-400">Example: "What documents do I need to travel from Kenya to Ireland?"</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl px-4 py-4 rounded-2xl relative text-sm ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 shadow-sm border'
              }`}>
                <div className="mb-2 font-semibold">
                  {message.type === 'user' ? '👤 You' : '🤖 PawaIT Assistant'}
                </div>
                <div className="whitespace-pre-wrap mb-2">{message.content}</div>
                <div className="absolute bottom-1 right-3 text-xs text-gray-400">{message.timestamp}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 shadow-sm border px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Field */}
      <footer className="bg-white border-t px-4 py-4">
        <div className="max-w-screen-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask any questions you may have..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  )
}
