# from flask import Flask, request

# app = Flask(__name__)

# @app.route('/', methods=['POST'])
# def analyze_csv():
#     file = request.files['file']
#     # process the uploaded file here
#     return 'File received and processed'

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)

from flask import Flask,request

app = Flask(__name__)


@app.route('/analysis', methods=['GET', 'POST'])
def upload_file():
    uploaded_file = request.files['file']
    # Do something with the file
    return 'File uploaded successfully'

