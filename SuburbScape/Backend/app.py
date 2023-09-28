import pyodbc
from flask import Flask, jsonify
app = Flask(__name__)

# Azure SQL connection
#https://dev04backend.azurewebsites.net/api/data
server = 'devm.database.windows.net'
database = 'devm' 
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
        cursor.execute("SELECT * FROM join_dataset")  # Change table name here
        rows = cursor.fetchall()

        # json format data API
        for row in rows:
            data.append({'LGA': row[0], 'Offence_Count': row[1], 'Rate_per_100000_population': row[2], 'Median': row[3], 'Description': row[4]})

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Json response
        return jsonify(data)

    except pyodbc.Error as e:
        error_message = str(e)
        print("An error occurred:", error_message)
        return jsonify({'error': error_message}), 500
    
@app.route('/api/pro_data')
def get_prof_data():
    try:
        data = []

        # connection 
        connection_string = f"DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}"
        conn = pyodbc.connect(connection_string)

        # create cursor
        cursor = conn.cursor()

        # select all
        cursor.execute("SELECT * FROM prof")  # Change the table name
        rows = cursor.fetchall()

        # json format data API
        for row in rows:
            data.append({'LGA': row[0], 'Description': row[1], 
                         'Region': row[2], 'Distance': row[3], 
                         'Travel_Time': row[4],'Born_Overseas':row[5],
                         'Speak_LOTE':row[6], 'Family_Incidents':row[7],
                         'Drug_usage_possession_offences':row[8], 
                         'Total_offences':row[9],
                         'Good_Facilities':row[10], 'Unemployment_rate':row[11],
                         'Number_of_hospitals':row[12],
                         'Pharmacies':row[13], 'Number_of_kindergartens':row[14],
                         'Number_of_schools':row[15]
                         })

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Json response
        return jsonify(data)

    except pyodbc.Error as e:
        error_message = str(e)
        print("An error occurred:", error_message)
        return jsonify({'error': error_message}), 500    

@app.route('/api/emp_data')
def get_emp_data():
    try:
        data = []

        # connection 
        connection_string = f"DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}"
        conn = pyodbc.connect(connection_string)

        # create cursor
        cursor = conn.cursor()

        # select all
        cursor.execute("SELECT * FROM emp")  # Change the table name
        rows = cursor.fetchall()

        # json format data API
        for row in rows:
            data.append({'LGA': row[0], 'Year': row[1], 
                         'Managers': row[2], 'Professionals': row[3], 
                         'Technicians_trades_workers':row[4],
                         'Community_and_personal_service_workers':row[5],
                         'Clerical_and_administrative_workers':row[6],
                         'Sales_workers':row[7],
                         'Machinery_operators_and_drivers':row[8],
                         'Labourers':row[9],
                         'Occupation_unknown':row[10]
                         })

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Json response
        return jsonify(data)

    except pyodbc.Error as e:
        error_message = str(e)
        print("An error occurred:", error_message)
        return jsonify({'error': error_message}), 500

@app.route('/api/rentregion_data')
def get_rentregion_data():
    try:
        data = []

        # connection 
        connection_string = f"DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}"
        conn = pyodbc.connect(connection_string)

        # create cursor
        cursor = conn.cursor()

        # select all
        cursor.execute("SELECT * FROM rent_new")  # Change the table name
        rows = cursor.fetchall()

        # json format data API
        for row in rows:
            data.append({'Region': row[0], 'LGA':row[1], 'Rent':row[2]})

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Json response
        return jsonify(data)

    except pyodbc.Error as e:
        error_message = str(e)
        print("An error occurred:", error_message)
        return jsonify({'error': error_message}), 500

@app.route('/api/rent_new_data')
def get_rentnew_data():
    try:
        data = []

        # connection 
        connection_string = f"DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}"
        conn = pyodbc.connect(connection_string)

        # create cursor
        cursor = conn.cursor()

        # select all
        cursor.execute("SELECT * FROM rent_i3")  # Change the table name
        rows = cursor.fetchall()

        # json format data API
        for row in rows:
            data.append({'Region': row[0], 'Cat':row[1], 'LGA':row[2], 'Rent':row[3]})

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Json response
        return jsonify(data)

    except pyodbc.Error as e:
        error_message = str(e)
        print("An error occurred:", error_message)
        return jsonify({'error': error_message}), 500
    
@app.route('/api/score_data')
def get_score_data():
    try:
        data = []

        # connection 
        connection_string = f"DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}"
        conn = pyodbc.connect(connection_string)

        # create cursor
        cursor = conn.cursor()

        # select all
        cursor.execute("SELECT * FROM score")  # Change the table name
        rows = cursor.fetchall()

        # json format data API
        for row in rows:
            data.append({'LGA': row[0], 'Distance':row[1], 'Crime':row[2], 'Hospital':row[3], 'School':row[4], 
                         'Distance_Score':row[5], 'Safety_Score':row[6], 'Hospital_Score':row[7], 'School_Score':row[8]})

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
