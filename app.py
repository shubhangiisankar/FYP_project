from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__, static_folder='static', template_folder='templates')

# MySQL database connection
def get_db_connection():
    conn = mysql.connector.connect(
        host='localhost',  # Database host
        user='root',       # Your database username
        password='shubhangiisankar@123',  # Your database password
        database='medicineapp_users'  # Updated database name
    )
    return conn

@app.route('/')
def home():
    return render_template('index.html')

# Signup route
@app.route('/signup', methods=['GET', 'POST'])  # Changed route to '/signup'
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        weight = request.form['weight']
        height = request.form['height']
        gender = request.form['gender']
        phone_number = request.form['phone_number']
        date_of_birth = request.form['date_of_birth']

        # Insert the data into the database (without address field and without password hashing)
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO medicine_site_users (name, email, password, weight, height, gender, phone_number, date_of_birth) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            (name, email, password, weight, height, gender, phone_number, date_of_birth)
        )
        conn.commit()
        cursor.close()
        conn.close()

        return redirect(url_for('login'))  # Redirect to login page after signup

    return render_template('signup.html')  # Render the signup.html page (updated to match the form)

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # Check if the user exists and verify the password (without hashing)
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM medicine_site_users WHERE email = %s', (email,))
        user = cursor.fetchone()  # Fetch one user matching the email

        if user and user[2] == password:  # user[2] is the password from the database
            return redirect(url_for('home'))  # Redirect to home page if login successful
        else:
            return "Invalid email or password"  # Return error if credentials are incorrect

    return render_template('login.html')  # Return the login form

if __name__ == '__main__':
    app.run(debug=True)
