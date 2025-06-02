
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const responseContainer = document.getElementById('response-container');
    const loadingIndicator = document.getElementById('loading');

    // Update this URL after deploying to Vercel
    // Replace 'your-vercel-app-name' with your actual Vercel app name
    const API_URL = 'https://yvonne-li-github-io.vercel.app/chat';
    
    // For local development, uncomment the line below:
    // const API_URL = 'http://localhost:5001/chat';

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
            // Fixed: Now uses the API_URL variable instead of hardcoded localhost
            const response = await fetch(API_URL, {
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
            responseContainer.innerHTML = 'Error: Could not connect to the pun server. Please try again later.';
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
</artArtifact>

