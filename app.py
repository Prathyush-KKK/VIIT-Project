from flask import Flask,flash,send_from_directory,render_template,request,redirect,session,g,url_for
import pyrebase
import re

app = Flask(__name__)
  
  
app.config['SECRET_KEY'] = "c6e803cd18a8c528c161eb9fcf013245248506ffb540ff70"

firebaseConfig = {'apiKey': "AIzaSyCdHYKD3CdAmNr7eVV6Fo7tgD_Dm1KeFXE",
  'authDomain': "w-techies.firebaseapp.com",
  'projectId': "w-techies",
  'storageBucket': "w-techies.appspot.com",
  'messagingSenderId': "590411978117",
  'databaseURL' : "https://w-techies-default-rtdb.firebaseio.com/"
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
db = firebase.database()
  


def check_username(username,password):
    try:
        mail = db.child("Usernames").child(username).get().val()
        auth.sign_in_with_email_and_password(mail, password)
        return True
    except:
        return False

@app.route('/')
@app.route('/login', methods =['GET', 'POST'])
def login():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        if check_username(username,password):
            session['loggedin'] = True
            session['username'] = username
            msg = 'Logged in successfully !'
            return render_template('index.html', msg = msg)
        else:
            msg = 'Incorrect username / password !'
    return render_template('login.html', msg = msg)
  
@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('username', None)
    return redirect(url_for('login'))
  
@app.route('/register', methods =['GET', 'POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form :
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        if check_username(username,password):
            msg = 'Account already exists !'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = 'Invalid email address !'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Username must contain only characters and numbers !'
        elif not username or not password or not email:
            msg = 'Please fill out the form !'
        else:
            auth.create_user_with_email_and_password(email,password)
            db.child("Usernames").update({username:email})
            msg = 'You have successfully registered !'
    elif request.method == 'POST':
        msg = 'Please fill out the form !'
    return render_template('register.html', msg = msg)

if __name__ == '__main__':
    app.run(debug=True)    