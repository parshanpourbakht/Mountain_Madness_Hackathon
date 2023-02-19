import os

from flask import Flask, jsonify, request, render_template, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
from datetime import datetime
import json
from chatparser import parse_chat_data
from chickenBurger import analyze_csv

ALLOWED_EXTENSIONS = set(['csv'])

app = Flask(__name__)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


app = Flask(__name__)

@app.route('/upload')


def get_data():
    data = analyze_csv("bruh.csv")
    return data


if __name__ == '__main__':
    app.run(debug=True)