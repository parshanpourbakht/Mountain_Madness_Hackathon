from flask import Flask, jsonify, request

app = Flask(__name__)



@app.route('/', methods=['POST', 'GET'])
def data():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(debug=True)

    