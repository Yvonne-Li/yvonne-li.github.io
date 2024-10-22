document.addEventListener('DOMContentLoaded', (event) => {
    const chatButton = document.createElement('button');
    chatButton.innerText = 'Chat';
    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '20px';
    chatButton.style.right = '20px';
    document.body.appendChild(chatButton);

    const chatContainer = document.createElement('div');
    chatContainer.style.display = 'none';
    chatContainer.style.position = 'fixed';
    chatContainer.style.bottom = '60px';
    chatContainer.style.right = '20px';
    chatContainer.style.width = '300px';
    chatContainer.style.height = '400px';
    chatContainer.style.border = '1px solid black';
    chatContainer.style.backgroundColor = 'white';
    document.body.appendChild(chatContainer);

    const chatMessages = document.createElement('div');
    chatMessages.style.height = '350px';
    chatMessages.style.overflowY = 'scroll';
    chatContainer.appendChild(chatMessages);

    const chatInput = document.createElement('input');
    chatInput.style.width = '100%';
    chatContainer.appendChild(chatInput);

    chatButton.addEventListener('click', () => {
        chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value;
            chatInput.value = '';
            addMessage('You', message);
            
            fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message: message}),
            })
            .then(response => response.json())
            .then(data => {
                addMessage('Bot', data.response);
            });
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('p');
        messageElement.innerText = `${sender}: ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});