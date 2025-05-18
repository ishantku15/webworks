// AI Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotIcon = document.querySelector('.chatbot-icon');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const closeChatbot = document.querySelector('.close-chatbot');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSendBtn = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    // Toggle chatbot window
    chatbotIcon.addEventListener('click', function() {
        document.querySelector('.ai-chatbot').classList.toggle('active');
    });
    
    // Close chatbot window
    closeChatbot.addEventListener('click', function() {
        document.querySelector('.ai-chatbot').classList.remove('active');
    });
    
    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'chatbot-message user-message';
            userMessage.innerHTML = `<p>${message}</p>`;
            chatbotMessages.appendChild(userMessage);
            
            // Clear input
            chatbotInput.value = '';
            
            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            // Add typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chatbot-message typing-indicator';
            typingIndicator.innerHTML = '<p>Typing...</p>';
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            // Generate AI response after a delay
            setTimeout(() => {
                // Remove typing indicator
                chatbotMessages.removeChild(typingIndicator);
                
                // Add AI response
                const aiResponse = document.createElement('div');
                aiResponse.className = 'chatbot-message';
                
                // Simple response logic
                const response = generateAIResponse(message);
                aiResponse.innerHTML = `<p>${response}</p>`;
                chatbotMessages.appendChild(aiResponse);
                
                // Scroll to bottom
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 1500);
        }
    }
    
    // Generate AI response
    function generateAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello there! How can I assist you with your website needs today?";
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return "Our website development services start at just ₹6999 for basic websites. For premium websites with custom features, prices range from ₹9999 to ₹19999. Would you like me to send you our detailed pricing?";
        } else if (lowerMessage.includes('time') || lowerMessage.includes('long')) {
            return "Typically, we deliver basic websites within 5-7 business days. More complex projects may take 2-3 weeks depending on requirements.";
        } else if (lowerMessage.includes('feature') || lowerMessage.includes('include')) {
            return "Our websites include responsive design, SEO optimization, contact forms, and basic customization. Premium packages include additional features like AI chatbots, custom email, and advanced animations.";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('call')) {
            return "You can reach us directly at +91 85348 48815 or email ishant150407@gmail.com. We're available 10AM to 7PM, Monday to Saturday.";
        } else if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
            return "We specialize in frontend development for schools, gyms, and small businesses. Our services include website design, development, SEO optimization, and maintenance.";
        } else {
            return "Thank you for your message! For specific inquiries about pricing, services, or timelines, please let me know. You can also contact us directly at +91 85348 48815 for immediate assistance.";
        }
    }
    
    // Send button click event
    chatbotSendBtn.addEventListener('click', sendMessage);
    
    // Enter key event
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add some initial styles for the messages
    const style = document.createElement('style');
    style.textContent = `
        .chatbot-message {
            margin-bottom: 15px;
            padding: 10px 15px;
            background-color: #f0f0f0;
            border-radius: 18px;
            max-width: 80%;
        }
        .user-message {
            margin-left: auto;
            background-color: var(--primary-color);
            color: white;
        }
        .typing-indicator p::after {
            content: '...';
            animation: typingDots 1.5s infinite;
        }
        @keyframes typingDots {
            0%, 20% { content: '.'; }
            40% { content: '..'; }
            60%, 100% { content: '...'; }
        }
    `;
    document.head.appendChild(style);
});