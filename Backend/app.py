from flask import Flask, request, jsonify, send_from_directory, url_for
from flask_cors import CORS
import os
import requests
import random
import re
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions"

# Initialize sentiment analyzer
analyzer = SentimentIntensityAnalyzer()

# Define path to music files
MUSIC_FOLDER = "static/music"
MUSIC_FILES = ["song1.mp3", "song2.mp3", "song3.mp3", "song4.mp3"]  

# Expanded sadness keywords list
sad_keywords = ["sad", "depressed", "unhappy", "down", "upset", "lonely", "miserable", "heartbroken", "melancholy", 
                "feeling low", "very sad", "not okay", "not feeling good", "hopeless", "disappointed", "stressed out", "not ok"]

def detect_sadness(user_input):
    """
    Detects sadness based on sentiment score and keyword matching.
    """
    cleaned_input = re.sub(r"[^a-zA-Z\s]", "", user_input.lower().strip())  # Remove punctuation
    sentiment_score = analyzer.polarity_scores(cleaned_input)["compound"]

    keyword_match = any(word in cleaned_input for word in sad_keywords)

    print(f"DEBUG: User Input: {user_input}")
    print(f"DEBUG: Cleaned Input: {cleaned_input}")
    print(f"DEBUG: Sentiment Score: {sentiment_score}")
    print(f"DEBUG: Keyword Match: {keyword_match}")

    return sentiment_score < -0.5 or keyword_match  # Either sentiment is too negative or keyword is found

@app.route('/process', methods=['POST'])
def process_question():
    try:
        data = request.get_json()
        if "question" not in data:
            return jsonify({"error": "Missing 'question' field"}), 400

        user_input = data["question"]
        is_sad = detect_sadness(user_input)

        if is_sad:
            selected_song = random.choice(MUSIC_FILES)  # Pick a random song
            music_link = url_for('serve_music', filename=selected_song, _external=True)  # Generate full URL
            return jsonify({
                "response": "I'm sensing that you're feeling down. Here's some relaxing music for you! 🎵",
                "isSad": True,
                "music": music_link
            })

        # If sentiment is neutral/positive, process with AI model
        headers = {
            "Authorization": f"Bearer {TOGETHER_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo-128K",
            "messages": [{"role": "user", "content": user_input}]
        }

        response = requests.post(TOGETHER_API_URL, json=payload, headers=headers)

        if response.status_code == 200:
            api_data = response.json()
            if "choices" in api_data and api_data["choices"]:
                chatbot_response = api_data["choices"][0]["message"]["content"]
                formatted_response = chatbot_response.replace("\n\n", "<br><br>").replace("\n", "<br>")
                return jsonify({"response": formatted_response, "isSad": False})
        
        return jsonify({"error": "Together API Error", "details": response.text}), response.status_code

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

# Route to serve MP3 files
@app.route('/music/<filename>')
def serve_music(filename):
    return send_from_directory(MUSIC_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os
# import requests
# from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# app = Flask(__name__)
# CORS(app)

# TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
# TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions"

# # Initialize sentiment analyzer
# analyzer = SentimentIntensityAnalyzer()

# @app.route('/process', methods=['POST'])
# def process_question():
#     try:
#         data = request.get_json()
#         if "question" not in data:
#             return jsonify({"error": "Missing 'question' field"}), 400

#         user_input = data["question"]

#         # Analyze sentiment
#         sentiment_score = analyzer.polarity_scores(user_input)["compound"]

#         # If sentiment is negative, recommend music
#         if sentiment_score < -0.5:
#             return jsonify({
#                 "response": "I'm sensing that you're feeling down. Here's some relaxing music for you! 🎵",
#                 "isSad": True,
#                 "music": "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1"
#             })

#         # If sentiment is neutral/positive, process with AI model
#         headers = {
#             "Authorization": f"Bearer {TOGETHER_API_KEY}",
#             "Content-Type": "application/json"
#         }

#         payload = {
#             "model": "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo-128K",
#             "messages": [{"role": "user", "content": user_input}]
#         }

#         response = requests.post(TOGETHER_API_URL, json=payload, headers=headers)

#         if response.status_code == 200:
#             api_data = response.json()
#             if "choices" in api_data and api_data["choices"]:
#                 chatbot_response = api_data["choices"][0]["message"]["content"]
#                 formatted_response = chatbot_response.replace("\n\n", "<br><br>").replace("\n", "<br>")
#                 return jsonify({"response": formatted_response, "isSad": False})
        
#         return jsonify({"error": "Together API Error", "details": response.text}), response.status_code

#     except Exception as e:
#         return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)

# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# import os
# import requests
# from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
# TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions"

# # Initialize sentiment analyzer
# analyzer = SentimentIntensityAnalyzer()

# # Define the correct path to MP3 files
# MUSIC_FOLDER = os.path.join(os.getcwd(), "static/music")
# if not os.path.exists(MUSIC_FOLDER):
#     os.makedirs(MUSIC_FOLDER)

# # Dynamically find the first available MP3 file
# def get_music_file():
#     files = [f for f in os.listdir(MUSIC_FOLDER) if f.endswith(".mp3")]
#     return files[0] if files else None

# @app.route('/process', methods=['POST'])
# def process_question():
#     try:
#         data = request.get_json()
#         if "question" not in data:
#             return jsonify({"error": "Missing 'question' field"}), 400

#         user_input = data["question"]

#         # Analyze sentiment
#         sentiment_score = analyzer.polarity_scores(user_input)["compound"]

#         # If sentiment is negative, recommend music
#         if sentiment_score < -0.5:
#             music_file = get_music_file()
#             if music_file:
#                 return jsonify({
#                     "response": "I'm sensing that you're feeling down. Here's some relaxing music for you! 🎵",
#                     "isSad": True,
#                     "music": f"http://127.0.0.1:5000/music/{music_file}"
#                 })
#             else:
#                 return jsonify({"response": "I'm sensing you're feeling down, but no music file is available."})

#         # If sentiment is neutral/positive, process with AI model
#         if not TOGETHER_API_KEY:
#             return jsonify({"error": "Missing API Key for Together API"}), 500

#         headers = {
#             "Authorization": f"Bearer {TOGETHER_API_KEY}",
#             "Content-Type": "application/json"
#         }

#         payload = {
#             "model": "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo-128K",
#             "messages": [{"role": "user", "content": user_input}]
#         }

#         response = requests.post(TOGETHER_API_URL, json=payload, headers=headers)

#         if response.status_code == 200:
#             api_data = response.json()
#             if "choices" in api_data and api_data["choices"]:
#                 chatbot_response = api_data["choices"][0]["message"]["content"]
#                 formatted_response = chatbot_response.replace("\n\n", "<br><br>").replace("\n", "<br>")
#                 return jsonify({"response": formatted_response, "isSad": False})
        
#         return jsonify({"error": "Together API Error", "details": response.text}), response.status_code

#     except Exception as e:
#         return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

# # Route to serve MP3 files with correct CORS headers
# @app.route('/music/<filename>')
# def serve_music(filename):
#     response = send_from_directory(MUSIC_FOLDER, filename)
#     response.headers['Access-Control-Allow-Origin'] = '*'  # Allow audio playback
#     return response

# if __name__ == '__main__':
#     app.run(debug=True)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os
# import requests

# app = Flask(__name__)
# CORS(app)

# TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
# TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions"

# @app.route('/process', methods=['POST'])
# def process_question():
#     try:
#         data = request.get_json()

#         if "question" not in data:
#             return jsonify({"error": "Missing 'question' field"}), 400

#         headers = {
#             "Authorization": f"Bearer {TOGETHER_API_KEY}",
#             "Content-Type": "application/json"
#         }

#         payload = {
#             "model": "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo-128K",
#             "messages": [{"role": "user", "content": data["question"]}]
#         }

#         response = requests.post(TOGETHER_API_URL, json=payload, headers=headers)

#         if response.status_code == 200:
#             api_data = response.json()
#             if "choices" in api_data and api_data["choices"]:
#                 chatbot_response = api_data["choices"][0]["message"]["content"]

#                 # Enhanced formatting
#                 formatted_response = chatbot_response.replace("\n\n", "<br><br>").replace("\n", "<br>")
#                 return jsonify({"response": formatted_response})
#             else:
#                 return jsonify({"error": "Invalid API response format", "details": api_data}), 500

#         return jsonify({"error": "Together API Error", "details": response.text}), response.status_code

#     except Exception as e:
#         return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)