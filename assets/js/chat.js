document.addEventListener('DOMContentLoaded', (event) => {
    // Create the chat button
    const chatButton = document.createElement('button');
    chatButton.innerText = 'Chat';
    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '20px';
    chatButton.style.right = '20px';
    document.body.appendChild(chatButton);

    // Create the chat container
    const chatContainer = document.createElement('div');
    chatContainer.style.display = 'none';
    chatContainer.style.position = 'fixed';
    chatContainer.style.bottom = '60px';
    chatContainer.style.right = '20px';
    chatContainer.style.width = '300px';
    chatContainer.style.height = '400px';
    chatContainer.style.border = '1px solid black';
    chatContainer.style.backgroundColor = 'white';
    chatContainer.style.zIndex = '1000'; // Ensure it stays on top of other elements
    document.body.appendChild(chatContainer);

    // Create the chat messages container
    const chatMessages = document.createElement('div');
    chatMessages.style.height = '350px';
    chatMessages.style.overflowY = 'scroll';
    chatMessages.style.padding = '10px';
    chatContainer.appendChild(chatMessages);

    // Create the chat input field
    const chatInput = document.createElement('input');
    chatInput.style.width = '100%';
    chatInput.style.padding = '10px';
    chatInput.style.boxSizing = 'border-box';
    chatContainer.appendChild(chatInput);

    // Toggle chat window visibility
    chatButton.addEventListener('click', () => {
        chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Handle Enter key press in input
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();

            // Input validation: Ensure user input is not empty
            if (message === '') {
                alert('Please enter a message!');
                return;
            }

            // Clear the input field and add the user message to the chat
            chatInput.value = '';
            addMessage('You', message);

            // Show a loader or placeholder message while waiting for the response
            addMessage('Bot', '...thinking...');

            // Send the message to the Flask server
            fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            })
            .then(response => response.json())
            .then(data => {
                // Remove the loader message and show the bot's response
                chatMessages.lastChild.remove(); // Removes '...thinking...' message
                addMessage('Bot', data.response);
            })
            .catch(error => {
                // Handle any errors and display a user-friendly message
                chatMessages.lastChild.remove(); // Removes '...thinking...' message
                addMessage('Bot', 'Sorry, something went wrong.');
                console.error('Error:', error);
            });
        }
    });

    // Function to add a new message to the chat window
    function addMessage(sender, message) {
        const messageElement = document.createElement('p');
        messageElement.innerText = `${sender}: ${message}`;
        messageElement.style.margin = '5px 0';
        chatMessages.appendChild(messageElement);

        // Scroll to the bottom of the chat after a new message is added
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
