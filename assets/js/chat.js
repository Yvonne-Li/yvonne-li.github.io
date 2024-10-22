document.addEventListener('DOMContentLoaded', (event) => {
    // Create chat elements
    const chatButton = document.createElement('button');
    chatButton.className = 'chat-button';
    chatButton.innerText = '💭 Chat';

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';

    const chatHeader = document.createElement('div');
    chatHeader.className = 'chat-header';
    chatHeader.innerText = 'Chat with AI';

    const chatMessages = document.createElement('div');
    chatMessages.className = 'chat-messages';

    const inputContainer = document.createElement('div');
    inputContainer.className = 'chat-input-container';

    const chatInput = document.createElement('input');
    chatInput.className = 'chat-input';
    chatInput.placeholder = 'Type your message...';

    // Assemble the chat interface
    document.body.appendChild(chatButton);
    document.body.appendChild(chatContainer);
    chatContainer.appendChild(chatHeader);
    chatContainer.appendChild(chatMessages);
    chatContainer.appendChild(inputContainer);
    inputContainer.appendChild(chatInput);

    // Toggle chat window
    chatButton.addEventListener('click', () => {
        chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
        if (chatContainer.style.display === 'flex') {
            chatInput.focus();
        }
    });

    // Handle input
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (!message) return;

            addMessage('You', message, 'user');
            chatInput.value = '';

            const thinkingMessage = addMessage('AI', '...thinking...', 'bot-thinking');

            fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            })
            .then(response => response.json())
            .then(data => {
                thinkingMessage.remove();
                addMessage('AI', data.response, 'bot');
            })
            .catch(error => {
                thinkingMessage.remove();
                addMessage('AI', 'Sorry, I encountered an error. Please try again.', 'bot-error');
                console.error('Error:', error);
            });
        }
    });

    // Add messages
    function addMessage(sender, message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${type}`;
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message.replace(/\n/g, '<br>')}`;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return messageElement;
    }

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!chatContainer.contains(e.target) && e.target !== chatButton) {
            chatContainer.style.display = 'none';
        }
    });
});