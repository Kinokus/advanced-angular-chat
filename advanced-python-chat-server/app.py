from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO, emit

# todo: add to angular building for python option
app = Flask(__name__, static_folder='../advanced-angular-chat-server/src/public/angular')
# app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def index():
    return app.send_static_file('index.html')
    # return render_template('index.html')


@app.route('/<path:path>')
def send_files(path):
    return app.send_static_file(path)




# TODO: maybe later
# @app.route('/login')
# def send_login():
#     return app.send_static_file('index.html')
#
# @app.route('/users-list')
# def send_login():
#     return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run()
