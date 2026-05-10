from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/data")
def data():

    sensor_data = {
        "temperature": round(random.uniform(28, 35), 1),
        "humidity": round(random.uniform(60, 75), 1),
        "soil_moisture": random.randint(40, 60),
        "ph": round(random.uniform(6.0, 7.5), 2),
        "tds": random.randint(500, 700)
    }

    return jsonify(sensor_data)

if __name__ == "__main__":
    app.run(debug=True)