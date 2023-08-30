import pyodbc
from flask import Flask, jsonify
app = Flask(__name__)

# Azure SQL connection
#https://devmaverick.azurewebsites.net/api/data
server = 'maverick.database.windows.net'
database = 'dev' 
username = 'ta04'
password = 'Zty912815'
driver = '{ODBC Driver 18 for SQL Server}'  

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/data')
def get_rent_data():
    try:
        data = []

        # connection 
        connection_string = f"DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}"
        conn = pyodbc.connect(connection_string)

        # create cursor
        cursor = conn.cursor()

        # select all
        cursor.execute("SELECT * FROM join_dataset")  # Database Name
        rows = cursor.fetchall()

        # json format data API
        for row in rows:
            data.append({'LGA': row[0], 'Offense_Count': row[1], 'Rate_per_100000_population': row[2], 'Median': row[3], 'Description': row[4]})

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Json response
        return jsonify(data)

    except pyodbc.Error as e:
        error_message = str(e)
        print("An error occurred:", error_message)
        return jsonify({'error': error_message}), 500

if __name__ == '__main__':
  app.run(host='0.0.0.0',port=5000)
