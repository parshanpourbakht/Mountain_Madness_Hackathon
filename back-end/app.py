import os

from flask import Flask, request, render_template, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
from datetime import datetime
import json
from chatparser import parse_chat_data

ALLOWED_EXTENSIONS = set(['csv'])

app = Flask(__name__)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


app = Flask(__name__)

@app.route('/upload', methods=['GET', 'POST'])


def upload():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            
            ret_json = parse_chat_data(filename)
            ret_json = json.dumps(json.loads(ret_json))
            ret_json.headers.add('Access-Control-Allow-Origin', '*')
            #return json.loads(ret_json)
            return {1:1}
    return {1:1}


if __name__ == '__main__':
    app.run(debug=True)