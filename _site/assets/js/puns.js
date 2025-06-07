document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const responseContainer = document.getElementById('response-container');
    const loadingIndicator = document.getElementById('loading');

    // API URLs to try (in order of preference)
    const API_URLS = [
        'https://yvonne-pun-api.vercel.app/api/chat',  // Your free endpoint
        'https://yvonne-pun-api.vercel.app/api/puns',  // Your OpenAI endpoint
        'http://localhost:5001/chat'  // Alternative port
    ];

    // Sample puns for fallback
    const samplePuns = {
        'code': [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why do Java developers wear glasses? Because they don't C#! 👓",
            "I told my code a joke about arrays, but it didn't get the index! 📝",
            "Debugging is like being a detective in a crime movie where you're also the murderer! 🔍"
        ],
        'programming': [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why do Java developers wear glasses? Because they don't C#! 👓",
            "I told my code a joke about arrays, but it didn't get the index! 📝",
            "Debugging is like being a detective in a crime movie where you're also the murderer! 🔍"
        ],
        'coffee': [
            "Thanks a latte for being brew-tiful! ☕",
            "You're brew-tiful just the way you are! ✨",
            "Life happens, coffee helps! ☕",
            "Espresso yourself! 💪",
            "I love you a latte! ❤️"
        ],
        'cats': [
            "You've got to be kitten me right meow! 🐱",
            "I'm feline good about this! 😸",
            "Purr-fect timing! ⏰",
            "That's simply claw-some! 🐾",
            "You're absolutely purr-fect! 💕"
        ],
        'data': [
            "I'm really Excel-lent at data analysis! 📊",
            "Data scientists have the best tables! 📋",
            "I'm having a SQL good time with databases! 💾",
            "This dataset is absolutely data-licious! 🍰",
            "My relationship status: In a relation-ship with my database! 💕"
        ],
        'toronto': [
            "Toronto is CN-credible! 🏙️",
            "I'm having a Tor-onto-p time in this city! 🎉",
            "This city really knows how to maple me happy! 🍁",
            "Toronto: where the 6ix meets perfection! ✨",
            "I'm totally hoser over heels for this city! ❤️"
        ]
    };

    searchButton.addEventListener('click', async function() {
        console.log('=== PUN GENERATION STARTED ===');
        
        const topic = searchInput.value.trim();
        console.log('Topic entered:', topic);
        
        if (!topic) {
            responseContainer.innerHTML = '<div style="color: #d63031;">Please enter a topic for puns!</div>';
            return;
        }

        // Show loading state
        searchButton.disabled = true;
        searchButton.textContent = 'Generating...';
        loadingIndicator.style.display = 'block';
        responseContainer.innerHTML = '<div style="color: #666; font-style: italic; text-align: center;">Brewing up some puns... ☕</div>';

        console.log('Starting API attempts...');
        let punsGenerated = false;

        // Try API endpoints first
        for (const apiUrl of API_URLS) {
            try {
                console.log(`🔄 Trying API: ${apiUrl}`);

                // Create abort controller and timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => {
                    console.log(`⏰ Timeout for ${apiUrl}`);
                    controller.abort();
                }, 5000);

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: `Generate puns about ${topic}` }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);
                console.log(`📡 Response from ${apiUrl}:`, response.status, response.ok);

                if (response.ok) {
                    const data = await response.json();
                    console.log(`✅ Success with ${apiUrl}:`, data);
                    const cleaned = data.response.trim();
                    displayPuns(cleaned.includes('\n') ? cleaned : `${cleaned}\n`);
                    punsGenerated = true;
                    break;
                } else {
                    console.log(`❌ API ${apiUrl} responded with status:`, response.status);
                }
            } catch (error) {
                console.log(`💥 Failed with API ${apiUrl}:`, error.name, error.message);
                continue; // Try next API
            }
        }

        // If all APIs failed, use sample puns
        if (!punsGenerated) {
            console.log('🔄 All APIs failed, using sample puns');
            const puns = getSamplePuns(topic);
            displayPuns(puns.join('\n\n'));
        }

        // Reset button state
        searchButton.disabled = false;
        searchButton.textContent = 'Generate Puns';
        loadingIndicator.style.display = 'none';
        
        console.log('=== PUN GENERATION COMPLETED ===');
    });
    // Allow Enter key to trigger search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    function getSamplePuns(topic) {
        const lowerTopic = topic.toLowerCase();
        
        // Check if we have specific puns for this topic
        for (const [key, puns] of Object.entries(samplePuns)) {
            if (lowerTopic.includes(key)) {
                return puns;
            }
        }
        
        // Generic puns if topic not found
        return [
            `${topic}? More like ${topic}-tastic! 🎉`,
            `I'm having a ${topic}-rific time thinking of puns! 😄`,
            `${topic} puns are simply un-${topic}-able! 🤪`,
            `Let's ${topic} our way to more puns! 🚀`,
            `${topic} me impressed with these puns! 👏`
        ];
    }

    function displayPuns(punsText) {
        console.log('🎨 displayPuns called with:', punsText);
        
        const puns = punsText.split('\n').filter(pun => pun.trim().length > 0);
        
        let html = '';
        puns.forEach((pun, index) => {
            const cleanPun = pun.replace(/^\d+\.\s*/, '').trim();
            if (cleanPun) {
                html += `<div style="
                    background: white;
                    padding: 15px;
                    margin: 10px 0;
                    border-radius: 6px;
                    border-left: 3px solid #FFD700;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    opacity: 1;
                ">${cleanPun}</div>`;
            }
        });
        
        responseContainer.innerHTML = html;
        console.log('🎨 Puns should now be visible without animation!');
    }
});