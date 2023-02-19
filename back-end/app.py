import os

from flask import Flask, jsonify, request, render_template, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
from datetime import datetime
import json
from chickenBurger import analyze_csv
from flask_cors import CORS

ALLOWED_EXTENSIONS = set(['csv'])


app = Flask(__name__)

CORS(app)

@app.route('/upload')


def get_data():
    data = analyze_csv("bruh.csv")
    return data


if __name__ == '__main__':
    app.run(debug=True)

    