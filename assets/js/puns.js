document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const responseContainer = document.getElementById('response-container');
    const loadingIndicator = document.getElementById('loading');

    searchButton.addEventListener('click', async function() {
        const topic = searchInput.value.trim();
        
        if (!topic) {
            responseContainer.innerHTML = 'Please enter a topic for puns!';
            return;
        }

        // Show loading indicator
        loadingIndicator.style.display = 'block';
        responseContainer.innerHTML = '';

        try {
            const response = await fetch('http://localhost:5001/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: topic })
            });

            const data = await response.json();

            if (response.ok) {
                // Format the response with line breaks
                responseContainer.innerHTML = data.response.replace(/\n/g, '<br>');
            } else {
                responseContainer.innerHTML = `Error: ${data.error || 'Failed to generate puns'}`;
            }
        } catch (error) {
            console.error('Error:', error);
            responseContainer.innerHTML = 'Error: Could not connect to the server. Make sure the Flask app is running.';
        } finally {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
        }
    });

    // Allow Enter key to trigger the button
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});