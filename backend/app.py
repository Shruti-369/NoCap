from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Backend is running"
    })

@app.route("/prediction", methods=["POST"])
def prediction():
    data = request.get_json()
    news = data.get("news", "").lower()

    if not news.strip():
        return jsonify({
            "error": "No news text provided"
        }), 400
    
    reasoning = []
    score = 0

    # Linguistic cues often flagged by LLMs
    sensational_words = [
        "breaking", "shocking", "unbelievable",
        "guaranteed", "secret", "exposed", "100%"
    ]

    if len(news) < 40:
        score += 1
        reasoning.append("Very short news text lacks context")

    for word in sensational_words:
        if word in news:
            score += 1
            reasoning.append(f"Contains sensational term: '{word}'")

    if score >= 2:
        result = "Likely Fake News ❌"
    else:
        result = "Likely Real News ✅"

    return jsonify({
        "prediction": result,
        "confidence_basis": "LLM-inspired linguistic reasoning",
        "explanation": reasoning
    })

if __name__ == "__main__":
    app.run(debug=True)



