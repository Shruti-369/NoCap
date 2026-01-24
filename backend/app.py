# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pickle

# app = Flask(__name__)
# CORS(app)

# # model load
# vector = pickle.load(open("vectorizer.pkl", "rb"))
# model = pickle.load(open("finalized_model.pkl", "rb"))

# @app.route("/prediction", methods=["POST"])
# def prediction():
#     data = request.get_json()
#     news = data["news"]

#     return jsonify({
#         "prediction": "Fake News ❌ (dummy response)"
#     })


# if __name__ == "__main__":
#     app.run(debug=True)

