# Create this file: api/index.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)

# Simple pun database for free deployment
PUN_DATABASE = {
    'programming': [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
        "Why do Java developers wear glasses? Because they don't C#!",
        "How do you comfort a JavaScript bug? You console it!",
        "Why did the programmer quit his job? He didn't get arrays!",
        "What's a programmer's favorite hangout place? Foo Bar!",
        "Why do programmers hate nature? It has too many bugs!",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem!"
    ],
    'food': [
        "Why did the coffee file a police report? It got mugged!",
        "What do you call cheese that isn't yours? Nacho cheese!",
        "Why don't eggs tell jokes? They'd crack each other up!",
        "What do you call a fake noodle? An impasta!",
        "Why did the banana go to the doctor? It wasn't peeling well!",
        "What do you call a sleeping bull? A bulldozer!",
        "Why did the cookie go to the doctor? Because it felt crumbly!"
    ],
    'animals': [
        "What do you call a sleeping bull? A bulldozer!",
        "Why don't elephants use computers? They're afraid of the mouse!",
        "What do you call a bear with no teeth? A gummy bear!",
        "Why don't oysters donate? Because they are shellfish!",
        "What do you call a fish wearing a crown? A king fish!",
        "Why don't cats play poker in the jungle? Too many cheetahs!",
        "What do you call a cow with no legs? Ground beef!"
    ],
    'general': [
        "Why don't scientists trust atoms? Because they make up everything!",
        "What do you call a fake stone? A shamrock!",
        "Why did the math book look so sad? Because it had too many problems!",
        "I told my wife she was drawing her eyebrows too high. She looked surprised!",
        "What do you call a parade of rabbits hopping backwards? A receding hare-line!",
        "Why did the scarecrow win an award? He was outstanding in his field!",
        "What do you call a factory that makes okay products? A satisfactory!"
    ]
}

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        if not data or 'message' not in data:
            return jsonify({'error': 'Message field is required'}), 400
        
        message = data['message'].lower()
        
        # Simple keyword matching
        category = 'general'
        if any(word in message for word in ['programming', 'code', 'developer', 'computer', 'software', 'bug', 'javascript', 'python']):
            category = 'programming'
        elif any(word in message for word in ['food', 'eat', 'cook', 'restaurant', 'hungry', 'coffee', 'cheese']):
            category = 'food'
        elif any(word in message for word in ['animal', 'dog', 'cat', 'pet', 'zoo', 'bear', 'fish']):
            category = 'animals'
        
        # Get random puns from the category
        available_puns = PUN_DATABASE[category]
        num_puns = min(5, len(available_puns))
        selected_puns = random.sample(available_puns, num_puns)
        
        response_text = f"Here are some {category} puns for you:\n\n" + "\n\n".join(f"{i+1}. {pun}" for i, pun in enumerate(selected_puns))
        
        return jsonify({'response': response_text})
        
    except Exception as e:
        return jsonify({'error': f'Something went wrong: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'message': 'Pun API is running!'})

# For Vercel
def handler(event, context):
    return app(event, context)

if __name__ == '__main__':
    app.run(debug=True)
</artArtifact>