import pyodbc
from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Azure SQL
server = 'maverick.database.windows.net'
database = 'dev'
username = 'ta04'
password = 'Zty912815'
driver = '{ODBC Driver 18 for SQL Server}'

@app.route('/', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask API'}
    return jsonify(data)

@app.route('/api/rent_data')
def get_rent_data():
    try:
        data = []

        connection_string = f"DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}"
        conn = pyodbc.connect(connection_string)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM rent_vF")
        rows = cursor.fetchall()
        for row in rows:
            data.append({'Region': row[0], 'LGA': row[1], 'Count': row[2], 'Median': row[3], 'Description': row[4]})
        cursor.close()
        conn.close()
        return jsonify(data)

    except pyodbc.Error as e:
        error_message = str(e)
        print("An error occurred:", error_message)
        return jsonify({'error': error_message}), 500

@app.route('/api/crime_data')
def get_crime_data():
    try:
        data = []
        connection_string = f"DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}"
        conn = pyodbc.connect(connection_string)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM crime_vF")
        rows = cursor.fetchall()
        for row in rows:
            data.append({'LGA': row[0], 'Category': row[1], 'Offence_Count': row[2], 'Rate_per_100000_population': row[3]})
        cursor.close()
        conn.close()
        return jsonify(data)

    except pyodbc.Error as e:
        error_message = str(e)
        print("An error occurred:", error_message)
        return jsonify({'error': error_message}), 500

if __name__ == '__main__':
  app.run(host='0.0.0.0',port=5000)
