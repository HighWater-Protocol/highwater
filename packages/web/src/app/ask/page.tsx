"use client";
import React, { useState, useRef, useEffect } from "react";
import NavBar from "../../components/NavBar";

const FAQS = [
  {
    question: "Should I buy crypto? If so, how much?",
    answer: "This depends on your financial goals, risk tolerance, and investment timeline. Consider consulting a financial advisor for personalized advice.",
  },
  {
    question: "How do I report my crypto taxes?",
    answer: "You should report crypto transactions on your annual tax return. Regulations vary by country; consult a tax professional for details.",
  },
  {
    question: "What happens to my Bitcoin if I die?",
    answer: "It's important to have an estate plan that includes your crypto assets. Consider using a will or trust and secure sharing of access details.",
  },
  {
    question: "Is my exchange safe? / How do I store this?",
    answer: "Use reputable exchanges and consider moving assets to a secure wallet for long-term storage.",
  },
  {
    question: "Can I hold crypto in my IRA or trust?",
    answer: "Yes, some providers allow crypto in IRAs or trusts. Research providers and understand the rules before proceeding.",
  },
  {
    question: "Should I invest in Bitcoin ETFs?",
    answer: "Bitcoin ETFs can offer regulated exposure to BTC, but consider fees and your investment objectives.",
  },
  {
    question: "How do I avoid crypto scams?",
    answer: "Be wary of unsolicited offers, double-check URLs, and never share your private keys.",
  },
  {
    question: "What are the tax implications of staking or DeFi?",
    answer: "Rewards from staking or DeFi are often taxable income. Consult a tax professional for your jurisdiction.",
  },
];

const CREATIVE_FAQS = [];

const MORE_FAQS = [];

function ChatBox({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<string[]>([]);

  // Placeholder for LLM integration (e.g., Ollama, OpenChat, LM Studio, etc.)
  // You could call an API here to get a response from an open-source LLM.

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8 flex flex-col items-center w-full max-w-xl mx-auto">
      <div className="w-full">
        <div className="h-32 bg-gray-100 rounded mb-4 overflow-y-auto p-2 text-gray-700 text-base flex flex-col justify-end">
          {messages.length === 0 ? (
            <span className="text-gray-400 text-lg flex items-center justify-center h-full">Chatbox coming soon...</span>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="mb-1 text-left"><span className="font-semibold text-indigo-700">You:</span> {msg}</div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Type your question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <button
            className="px-4 py-2 bg-[#4636f9] text-white rounded hover:bg-[#3726e6] disabled:opacity-50"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function FAQQuickBox({ faq, onClick }: { faq: { question: string; answer: string }, onClick: () => void }) {
  return (
    <button
      className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 shadow hover:shadow-md transition w-full min-h-[56px] flex items-center justify-center text-left"
      onClick={onClick}
      type="button"
    >
      <div className="text-xs md:text-sm font-normal text-gray-900 italic text-center w-full">“{faq.question}”</div>
    </button>
  );
}

function FAQSection({ handleFAQClick }: { handleFAQClick: (question: string) => void }) {
  const [showMore, setShowMore] = useState(false);
  const hasMore = false;

  return (
    <div className="flex flex-col items-center mb-2 mt-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {(showMore ? FAQS : FAQS.slice(0, 4)).map((faq, idx) => (
          <FAQQuickBox key={idx} faq={faq} onClick={() => handleFAQClick(faq.question)} />
        ))}
      </div>
      {!showMore && (
        <button
          className="mt-4 px-4 py-2 bg-[#b2a4f7] text-white rounded-2xl shadow hover:bg-[#a18eea] text-sm transition focus:outline-none"
          onClick={() => setShowMore(true)}
          type="button"
        >
          Show All
        </button>
      )}
      {showMore && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mt-4">
            {MORE_FAQS.map((faq, idx) => (
              <FAQQuickBox key={"more-" + idx} faq={faq} onClick={() => handleFAQClick(faq.question)} />
            ))}
          </div>
          <div className="flex justify-center mt-4 w-full max-w-4xl">
            <button
              className="px-4 py-2 bg-[#b2a4f7] text-white rounded-2xl shadow hover:bg-[#a18eea] text-sm transition focus:outline-none"
              onClick={() => setShowMore(false)}
              type="button"
            >
              Show less
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AskPage() {
  const chatBoxRef = React.useRef<{ setInput: (q: string) => void } | null>(null);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<{ sender: 'user' | 'llm', text: string }[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Handler for FAQ click to populate chat input
  const handleFAQClick = (question: string) => {
    setInput(question);
  };

  // Handle sending a message to Ollama
  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: 'user', text: input }]);
    setLoading(true);
    const userMessage = input;
    setInput("");
    try {
      const res = await fetch('/api/ollama-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });
      const data = await res.json();
      let llmResponse = data.response || data.message || data?.choices?.[0]?.text || 'No response';
      // If Ollama returns a streaming response, you may need to adjust this logic.
      setMessages(msgs => [...msgs, { sender: 'llm', text: llmResponse }]);
    } catch (err: any) {
      setMessages(msgs => [...msgs, { sender: 'llm', text: 'Error: Unable to reach LLM.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      {messages.length === 0 && !loading ? (
        <div className="min-h-screen flex flex-col justify-center items-center w-full bg-gradient-to-br from-gray-50 via-indigo-50 to-white p-8 pt-16 md:pt-24">
          <div className="flex flex-col items-center w-full">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 flex flex-col items-center w-full max-w-4xl mx-auto mt-4">
              <div className="w-full flex flex-col gap-4">
                <input
                  className="flex-1 px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-black placeholder:text-gray-500 bg-white shadow text-lg"
                  placeholder="Ask any question..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={async e => {
                    if (e.key === 'Enter' && input.trim()) {
                      await handleSend();
                    }
                  }}
                  disabled={loading}
                  style={{ color: '#000', backgroundColor: '#fff' }}
                />
                <button
                  className="w-full px-7 py-4 bg-[#4636f9] text-white rounded-2xl shadow-lg hover:bg-[#3726e6] disabled:opacity-50 font-semibold text-lg transition"
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                >
                  {loading ? '...' : 'Ask'}
                </button>
              </div>
            </div>
            <FAQSection handleFAQClick={handleFAQClick} />
          </div>
        </div>
      ) : (
        <main className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-gray-50 via-indigo-50 to-white p-0 pt-16 md:pt-24">
          <div className="flex flex-col justify-start items-center w-full flex-1">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 flex flex-col items-center w-full max-w-4xl mx-auto h-[60vh] md:h-[70vh]">
              <div className="w-full flex flex-col gap-6 h-full">
                <div 
                  className="relative flex-1 bg-gradient-to-br from-indigo-50 via-white to-gray-100 rounded-2xl mb-2 overflow-y-auto p-6 text-base flex flex-col gap-2 custom-scrollbar"
                  id="chat-scroll-area"
                  style={{scrollBehavior: 'smooth'}}>
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-md text-base break-words ${msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-lg'
                          : 'bg-white text-gray-900 border border-gray-200 rounded-bl-lg'}
                          animate-fade-in`}
                      >
                        <span className="block font-semibold mb-1 text-xs opacity-70">{msg.sender === 'user' ? 'You' : 'HighWater Protocol'}</span>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="max-w-[70%] px-5 py-3 rounded-2xl shadow-md text-base bg-white text-gray-900 border border-gray-200 rounded-bl-lg animate-pulse">
                        <span className="block font-semibold mb-1 text-xs opacity-70">HighWater Protocol</span>
                        <span className="italic">Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    className="flex-1 px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-black placeholder:text-gray-500 bg-white shadow"
                    placeholder="Type your question..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={async e => {
                      if (e.key === 'Enter' && input.trim()) {
                        await handleSend();
                      }
                    }}
                    disabled={loading}
                    style={{ color: '#000', backgroundColor: '#fff' }}
                  />
                  <button
                    className="px-7 py-4 bg-[#4636f9] text-white rounded-2xl shadow-lg hover:bg-[#3726e6] disabled:opacity-50 font-semibold text-lg transition"
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                  >
                    {loading ? '...' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0e7ef;
          border-radius: 8px;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <script>{`
        // Auto-scroll to bottom on new message
        const chatArea = document.getElementById('chat-scroll-area');
        if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;
      `}</script>
    </>
  );
}
