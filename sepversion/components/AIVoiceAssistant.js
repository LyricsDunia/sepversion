function AIVoiceAssistant({ isActive, setIsActive }) {
  try {
    const [isListening, setIsListening] = React.useState(false);
    const [transcript, setTranscript] = React.useState('');
    const [response, setResponse] = React.useState('');

    const startListening = () => {
      setIsListening(true);
      setIsActive(true);
      
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript("I'm looking for a gaming laptop under $1500");
        setIsListening(false);
        
        // Simulate AI response
        setTimeout(() => {
          setResponse("Based on your requirements, I recommend the ASUS ROG Strix G15 or HP Omen 16. Both offer excellent gaming performance within your budget. Would you like to see detailed comparisons?");
        }, 1000);
      }, 3000);
    };

    const stopListening = () => {
      setIsListening(false);
      setIsActive(false);
      setTranscript('');
      setResponse('');
    };

    if (!isActive) {
      return (
        <div className="fixed bottom-6 right-6 z-50" data-name="voice-assistant" data-file="components/AIVoiceAssistant.js">
          <button
            onClick={startListening}
            className="w-16 h-16 bg-[var(--primary-color)] text-white rounded-full shadow-lg hover:bg-[var(--secondary-color)] transition-colors duration-200 flex items-center justify-center"
          >
            <div className="icon-mic text-2xl"></div>
          </button>
        </div>
      );
    }

    return (
      <div className="fixed bottom-6 right-6 z-50" data-name="voice-assistant-active" data-file="components/AIVoiceAssistant.js">
        <div className="bg-white rounded-lg shadow-xl p-6 w-80 max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">AI Voice Assistant</h3>
            <button
              onClick={stopListening}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <div className="icon-x text-xl"></div>
            </button>
          </div>

          {isListening && (
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-3 flex items-center justify-center animate-pulse">
                <div className="icon-mic text-2xl text-white"></div>
              </div>
              <p className="text-[var(--text-secondary)]">Listening...</p>
            </div>
          )}

          {transcript && (
            <div className="mb-4">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="icon-user text-[var(--primary-color)] mr-2 mt-1"></div>
                  <p className="text-sm">{transcript}</p>
                </div>
              </div>
            </div>
          )}

          {response && (
            <div className="mb-4">
              <div className="bg-[var(--primary-color)] bg-opacity-10 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="icon-bot text-[var(--primary-color)] mr-2 mt-1"></div>
                  <p className="text-sm">{response}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={startListening}
              disabled={isListening}
              className="btn-primary flex-1 text-sm"
            >
              <div className="icon-mic mr-2 inline"></div>
              {isListening ? 'Listening...' : 'Ask Again'}
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AIVoiceAssistant component error:', error);
    return null;
  }
}