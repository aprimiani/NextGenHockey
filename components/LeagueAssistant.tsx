import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import { useLeagueData } from '../contexts/LeagueDataContext';

interface ChatMessage {
  id: number;
  role: 'user' | 'model';
  text: string;
}

const LeagueAssistant: React.FC = () => {
  const { t, language } = useLanguage();
  const { teams, schedule, players, loading } = useLeagueData();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Set initial message on load
  useEffect(() => {
    if (!initialized.current) {
        setMessages([{ id: 1, role: 'model', text: t.assistant.initialMessage }]);
        initialized.current = true;
    }
  }, [t.assistant.initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create a compact summary of league data for the AI
      const top3Teams = [...teams].sort((a,b) => b.points - a.points).slice(0, 3);
      const nextGames = schedule.filter(g => g.status === 'scheduled').slice(0, 3);
      
      const leagueSummary = `
        Standings: ${top3Teams.map(t => `${t.name} (${t.points}pts)`).join(', ')}.
        Upcoming: ${nextGames.map(g => `${g.date} ${g.time}: ${g.homeTeamId} vs ${g.awayTeamId}`).join('; ')}.
      `;

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(history, userMessage.text, language, leagueSummary);
      
      const botMessage: ChatMessage = { id: Date.now() + 1, role: 'model', text: responseText };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-[calc(100vh-80px)] flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3">
          <Sparkles className="text-ng-light-blue" />
          {t.assistant.title}
        </h2>
        <p className="text-gray-400 mt-2">{t.assistant.subtitle}</p>
      </div>

      <div className="flex-1 bg-ng-blue/30 border border-gray-700 rounded-xl overflow-hidden flex flex-col shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ng-light-blue to-blue-600"></div>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-ng-light-blue text-ng-navy' : 'bg-gray-700 text-white'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-ng-light-blue text-ng-navy rounded-tr-none font-medium' 
                    : 'bg-gray-700/50 text-gray-100 rounded-tl-none border border-gray-600'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex flex-row items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                   <Bot size={16} className="text-white animate-pulse" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-gray-700/30 text-gray-300 border border-gray-600 text-sm">
                  {t.assistant.thinking}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-ng-navy border-t border-gray-700">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.assistant.placeholder}
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ng-light-blue border border-gray-600 placeholder-gray-500"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-ng-light-blue hover:bg-ng-accent text-ng-navy px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[3rem]"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeagueAssistant;