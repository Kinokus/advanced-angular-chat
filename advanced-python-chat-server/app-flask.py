import json

from flask import Flask, Response
from flask import request
from flask_socketio import SocketIO, emit
from tinydb import TinyDB, Query

# todo: add to angular building for python option
app = Flask(__name__, static_folder='../advanced-angular-chat-server/src/public/angular')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app=app)

json_file_path = 'db/MockDb.json'
db: TinyDB = TinyDB(json_file_path)
table_users = db.table('users')
table_messages = db.table('messages')
User = Query()


# table.insert({"name": "Sean Maxwell", "email": "sean.maxwell@gmail.com", "id": 159123164363})
# print(type(table_users.all()))


@socketio.on('connect')
def socket_connect():
    print('connected')
    emit('connected', {'data': 'Connected'})


@socketio.on('disconnect')
def socket_connect():
    print('disconnect')


@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)


@socketio.on('json')
def handle_json(message):
    print('received json: ' + message)


@app.route('/')
def index():
    return app.send_static_file('index.html')
    # return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def send_files(path):
    return app.send_static_file(path)


# @app.route('/<path:path>', methods=['POST'])
# def post_handler(path):
#     print(path)
#     print(request.get_json())
#
#     # return None
#     return ''


@app.route('/api/auth/login', methods=['POST'])
def login_handler():
    # const dbUser: IUser | null = await userDao.getOne(login.email);
    # print(request.get_json())
    payload = request.get_json()
    # user = table.search(User.email == payload['email'])
    users = table_users.search(User.email.matches(payload['email']))
    if len(users) == 0:
        response = {"status": False, "reason": "user not found"}
        print(response)
        return response
    else:
        user = users[0]
        if user['password'] != payload['password']:
            response = {"status": False, "reason": "password not correct"}
            print(response)
            return response
        else:
            response = {"status": True, 'user': user}
            print(response)
            return response

    # {"status": false, "reason": "user not found"}


@app.route('/api/users/all', methods=['GET'])
def users_all_handler():
    return json.dumps(table_users.all())


@app.route('/api/messages/all', methods=['GET'])
def messages_all_handler():
    return json.dumps(table_messages.all())


@app.route('/api/messages/add', methods=['POST'])
def messages_add_handler():
    payload = request.get_json()
    table_messages.insert(payload)
    return Response(json.dumps({'status': True}), status=201, mimetype='application/json')


@app.route('/api/users/add', methods=['POST'])
def users_add_handler():
    payload = request.get_json()
    users = table_users.search(User.email.matches(payload['email']))
    if len(users) == 0:
        table_users.insert(payload)
        return Response(json.dumps({'status': True}), status=201, mimetype='application/json')
    else:
        return Response(
            json.dumps({'status': False, 'reason': 'email already registered'}),
            status=500,
            mimetype='application/json'
        )


# TODO: maybe later
# @app.route('/login')
# def send_login():
#     return app.send_static_file('index.html')
#
# @app.route('/users-list')
# def send_login():
#     return app.send_static_file('index.html')

if __name__ == "__main__":
    # app.run()
    # socketio.init_app(app, cors_allowed_origins="*")
    socketio.run(app)
