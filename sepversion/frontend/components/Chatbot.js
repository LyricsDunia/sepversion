function Chatbot({ isVoiceActive, setIsVoiceActive }) {
  try {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([
      {
        id: 1,
        text: "Hi! I'm GadgetGenie, your AI assistant. I can help you find the perfect electronic device. What are you looking for?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    const [inputMessage, setInputMessage] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const handleSendMessage = async () => {
      if (!inputMessage.trim()) return;

      const userMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      const currentInput = inputMessage;
      setInputMessage('');
      setIsTyping(true);

      try {
        // Simulate AI response
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const botMessage = {
          id: Date.now() + 1,
          text: `I understand you're looking for ${currentInput}. Let me search our database for the best options available. Based on your requirements, I recommend checking our featured products section for the latest deals and comparisons.`,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        const errorMessage = {
          id: Date.now() + 1,
          text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    };

    if (!isOpen) {
      return (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-[var(--primary-color)] text-white rounded-full shadow-lg hover:bg-[var(--secondary-color)] transition-colors duration-200 flex items-center justify-center"
          >
            <div className="icon-message-circle text-2xl"></div>
          </button>
        </div>
      );
    }

    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-lg shadow-xl w-96 h-96 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <div>
              <h3 className="text-lg font-semibold">GadgetGenie</h3>
              <p className="text-xs text-[var(--text-secondary)]">AI Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <div className="icon-x text-xl"></div>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'bg-gray-100 text-[var(--text-primary)]'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about gadgets..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              <button onClick={handleSendMessage} className="btn-primary px-4 py-2">
                <div className="icon-send text-sm"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Chatbot component error:', error);
    return null;
  }
}