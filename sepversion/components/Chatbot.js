function Chatbot({ isVoiceActive, setIsVoiceActive }) {
  try {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([
      {
        id: 1,
        text: "Hi! I'm GadgetGenie, your AI gadget assistant. I can help you find the perfect electronic device based on your needs and budget. What are you looking for today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    const [inputMessage, setInputMessage] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const [isListening, setIsListening] = React.useState(false);
    const messagesEndRef = React.useRef(null);

    // Auto-scroll to bottom when new messages arrive
    React.useEffect(() => {
      scrollToBottom();
    }, [messages, isTyping]);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatBotMessage = (text) => {
      // Clean up multiple line breaks and format structure
      let formatted = text
        // Handle section headers with ###
        .replace(/###\s*(.*?)$/gm, '<div class="text-base font-bold text-[var(--primary-color)] mt-4 mb-2">$1</div>')
        // Handle clickable links
        .replace(/\[([^\]]+)\]\((#[^)]+)\)/g, '<a href="$2" class="text-[var(--primary-color)] underline hover:text-[var(--secondary-color)] cursor-pointer">$1</a>')
        // Handle bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Handle numbered lists with proper spacing
        .replace(/(\d+\.\s+.*?)(?=\n|$)/g, '<div class="mb-3"><strong>$1</strong></div>')
        // Handle bullet points with proper indentation
        .replace(/^•\s+(.*?)$/gm, '<div class="ml-4 mb-1">• $1</div>')
        // Handle sub-bullet points (starting with spaces or tabs)
        .replace(/^\s+•\s+(.*?)$/gm, '<div class="ml-8 mb-1 text-sm text-gray-600">• $1</div>')
        // Clean up multiple line breaks
        .replace(/\n{3,}/g, '\n\n')
        .replace(/\n\n/g, '<div class="mb-3"></div>')
        .replace(/\n/g, '<br/>');
      
      return formatted;
    };

    const checkProductAvailability = async (productQuery) => {
      try {
        // Search our database for products
        const response = await trickleListObjects('products', 50, true);
        const products = response.items;
        
        // Enhanced search matching with better keyword detection
        const matchedProducts = products.filter(product => {
          const name = product.objectData.name.toLowerCase();
          const category = product.objectData.category?.toLowerCase() || '';
          const brand = product.objectData.brand?.toLowerCase() || '';
          const query = productQuery.toLowerCase();
          
          // Clean up query for better matching
          const cleanQuery = query.replace(/[^\w\s]/g, ' ').trim();
          const queryWords = cleanQuery.split(/\s+/);
          
          // Check for exact brand + model matches
          if (brand && queryWords.some(word => brand.includes(word))) {
            const modelWords = name.split(' ').filter(word => 
              !brand.toLowerCase().includes(word.toLowerCase())
            );
            if (queryWords.some(word => 
              modelWords.some(model => model.toLowerCase().includes(word))
            )) {
              return true;
            }
          }
          
          // Check for partial name matches
          if (queryWords.some(word => word.length > 2 && name.includes(word))) {
            return true;
          }
          
          // Check for category matches
          if (queryWords.some(word => category.includes(word))) {
            return true;
          }
          
          // Check for brand matches
          if (queryWords.some(word => brand.includes(word))) {
            return true;
          }
          
          return false;
        });
        
        return matchedProducts;
      } catch (error) {
        console.error('Error checking product availability:', error);
        return [];
      }
    };

    const sendMissingProductAlert = async (productQuery, userMessage) => {
      try {
        // Create missing product alert entry
        await trickleCreateObject('missing_product_alerts', {
          query: productQuery,
          timestamp: new Date().toISOString(),
          userMessage: userMessage,
          status: 'pending'
        });
        
        // Send email notification in background
        await emailNotification.sendMissingProductAlert(productQuery, userMessage);
        
        console.log('Missing product alert created for:', productQuery);
      } catch (error) {
        console.error('Error creating missing product alert:', error);
      }
    };

    const generateMockChatResponse = async (systemPrompt, userPrompt, currentInput, availableProducts) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const lowerInput = currentInput.toLowerCase();
      
      // Greeting responses
      if (/^(hi|hello|hey|good morning|good afternoon|good evening|how are you|what's up|greetings|who are you|what are you|tell me about yourself)[\s\?!]*$/i.test(currentInput.trim())) {
        return "Hi there! I'm **GadgetGenie**, your friendly AI assistant here at GadgetFinder. I'm here to help you discover the perfect electronic gadgets that match your needs and budget. Whether you're looking for smartphones, laptops, headphones, or any other tech gadget, I can provide personalized recommendations and comparisons. How can I help you find your ideal gadget today?";
      }
      
      // Product-specific responses
      if (availableProducts.length > 0) {
        let response = "Great! I found some excellent options for you on our website:\n\n";
        response += "### Available on GadgetFinder:\n\n";
        
        availableProducts.slice(0, 3).forEach((product, index) => {
          const price = parseInt(product.objectData.price).toLocaleString('en-IN');
          response += `${index + 1}. **${product.objectData.name}** - ₹${price}\n`;
          response += `   • Category: ${product.objectData.category}\n`;
          response += `   • Rating: ${product.objectData.rating}/5 stars\n`;
          response += `   • [View on GadgetFinder](#product-${product.objectId})\n\n`;
        });
        
        response += "### Why Choose These?\n";
        response += "• **Verified quality** - All products are thoroughly reviewed\n";
        response += "• **Best prices** - Real-time price tracking across retailers\n";
        response += "• **Expert reviews** - AI-analyzed YouTube reviews and user feedback\n\n";
        response += "Would you like me to compare specific features or help you narrow down based on your budget?";
        
        return response;
      } else {
        let response = "I understand you're looking for ";
        
        if (lowerInput.includes('smartphone') || lowerInput.includes('phone')) {
          response += "a **smartphone**. While the specific model you mentioned isn't currently listed on our website, I can suggest some excellent alternatives:\n\n";
          response += "### Popular Smartphone Categories:\n";
          response += "• **Flagship phones** - iPhone 15 Pro, Samsung S24 Ultra\n";
          response += "• **Mid-range options** - OnePlus Nord, Samsung A-series\n";
          response += "• **Budget-friendly** - Redmi, Realme series\n\n";
        } else if (lowerInput.includes('laptop')) {
          response += "a **laptop**. Here are some great categories to consider:\n\n";
          response += "### Laptop Categories:\n";
          response += "• **Ultrabooks** - MacBook Air, Dell XPS\n";
          response += "• **Gaming laptops** - ASUS ROG, MSI Gaming\n";
          response += "• **Business laptops** - ThinkPad, HP EliteBook\n\n";
        } else {
          response += "electronic gadgets. ";
        }
        
        response += "This product is not currently listed on our website. You may check **Amazon India**, **Flipkart**, or the **official brand website** for latest prices and availability.\n\n";
        response += "### How I Can Still Help:\n";
        response += "• Suggest similar products from our catalog\n";
        response += "• Compare features and specifications\n";
        response += "• Find the best deals and prices\n";
        response += "• Provide expert reviews and recommendations\n\n";
        response += "What specific features or budget range are you looking for? I can recommend the perfect alternatives!";
        
        return response;
      }
    };

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
        // Check if it's a greeting or identity question
        const isGreeting = /^(hi|hello|hey|good morning|good afternoon|good evening|how are you|what's up|greetings|who are you|what are you|tell me about yourself)[\s\?!]*$/i.test(currentInput.trim());
        
        // Check if this is a product recommendation request (but not if it's a greeting)
        const isProductQuery = !isGreeting && /smartphone|laptop|headphone|tablet|watch|camera|gadget|recommend|suggest|buy|price|under|above|₹|\$/.test(currentInput.toLowerCase());
        
        let availableProducts = [];
        if (isProductQuery) {
          availableProducts = await checkProductAvailability(currentInput);
        }
        
        let systemPrompt, userPrompt;
        
        if (isGreeting) {
          systemPrompt = `You are GadgetGenie, a friendly AI assistant for GadgetFinder website. For greetings, respond warmly and briefly. For identity questions, introduce yourself as GadgetGenie and explain you help users find the best electronic gadgets. Always end by asking how you can help them find gadgets.`;
          userPrompt = currentInput;
        } else {
          systemPrompt = `You are GadgetGenie, a friendly electronics advisor for GadgetFinder website. Help users find the best electronic gadgets.

**Response Guidelines:**
- Use **bold** for important terms and product names
- Use ### for section headers (like "Available on GadgetFinder:")
- Use numbered lists for product recommendations
- Use bullet points for features and specifications
- Always be helpful, friendly, and enthusiastic about technology

**Available Products on Our Website:**
${availableProducts.length > 0 ? availableProducts.map(p => `- ${p.objectData.name} (₹${parseInt(p.objectData.price).toLocaleString('en-IN')}) - Category: ${p.objectData.category} - Link: [View on GadgetFinder](#product-${p.objectId})`).join('\n') : 'No matching products found on our website'}`;
        
          const chatHistory = messages.slice(-5).map(msg => 
            `${msg.sender}: ${msg.text}`
          ).join('\n');
        
          userPrompt = `${currentInput}\n\nChat History:\n${chatHistory}

Instructions:
- If products are available on our website, recommend them with clickable links like "[View on GadgetFinder](#product-ID)"
- If no products found on our website, mention "This product is not currently listed on our website. You may check Amazon India, Flipkart, or the official brand website for latest prices and availability."
- Provide helpful alternatives from our available products when possible`;
        }
        
        const response = await this.generateMockChatResponse(systemPrompt, userPrompt, currentInput, availableProducts);
        
        // If it's a product query but no products found, send alert
        if (isProductQuery && availableProducts.length === 0) {
          await sendMissingProductAlert(currentInput, currentInput);
        }
        
        const botMessage = {
          id: Date.now() + 1,
          text: response,
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

    const handleVoiceInput = () => {
      setIsListening(true);
      setIsVoiceActive(true);
      
      // Simulate voice recognition
      setTimeout(() => {
        const voiceQuery = "I need a gaming laptop under 80000 rupees";
        setInputMessage(voiceQuery);
        setIsListening(false);
        setIsVoiceActive(false);
        handleSendMessage();
      }, 3000);
    };

    if (!isOpen) {
      return (
        <div className="fixed bottom-6 right-6 z-50" data-name="chatbot-trigger" data-file="components/Chatbot.js">
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-[var(--primary-color)] text-white rounded-full shadow-lg hover:bg-[var(--secondary-color)] transition-colors duration-200 flex items-center justify-center group"
          >
            <div className="icon-message-circle text-2xl"></div>
            <div className="absolute -top-12 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat with GadgetGenie
            </div>
          </button>
        </div>
      );
    }

    return (
      <div className="fixed bottom-6 right-6 z-50" data-name="chatbot-open" data-file="components/Chatbot.js">
        <div className="bg-white rounded-lg shadow-xl w-96 h-96 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-[var(--border-color)]">
            <div>
              <h3 className="text-lg font-semibold">GadgetGenie</h3>
              <p className="text-xs text-[var(--text-secondary)]">AI Gadget Assistant</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
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
                  {message.sender === 'bot' ? (
                    <div 
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatBotMessage(message.text) }}
                      onClick={(e) => {
                        if (e.target.tagName === 'A' && e.target.href.includes('#product-')) {
                          e.preventDefault();
                          const productId = e.target.href.split('#product-')[1];
                          // Scroll to AI search section and filter by this product
                          document.getElementById('ai-search')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    />
                  ) : (
                    <p className="text-sm">{message.text}</p>
                  )}
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
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-[var(--border-color)]">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about any gadget..."
                className="flex-1 px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              <button
                onClick={handleVoiceInput}
                disabled={isListening || isTyping}
                className={`p-2 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 text-[var(--primary-color)] hover:bg-gray-200'
                }`}
              >
                <div className="icon-mic text-sm"></div>
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="btn-primary px-4 py-2"
              >
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
