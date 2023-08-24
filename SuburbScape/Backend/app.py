import pyodbc
from flask import Flask, jsonify
app = Flask(__name__)

# Azure SQL数据库连接信息
server = 'maverick.database.windows.net'
database = 'dev'  # 请替换为你的实际数据库名称
username = 'ta04'
password = 'Zty912815'
driver = '{ODBC Driver 18 for SQL Server}'  # 使用适当的驱动程序版本

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/rent_data')
def get_rent_data():
    try:
        data = []

        # 使用连接字符串创建数据库连接
        connection_string = f"DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}"
        conn = pyodbc.connect(connection_string)

        # 使用连接创建游标
        cursor = conn.cursor()

        # 执行SQL查询
        cursor.execute("SELECT * FROM rent_vF")  # 请替换为你的实际表名
        rows = cursor.fetchall()

        # 将查询结果转换为字典格式并添加到data列表中
        for row in rows:
            data.append({'Region': row[0], 'LGA': row[1], 'Count': row[2], 'Median': row[3]})

        # 关闭游标和数据库连接
        cursor.close()
        conn.close()

        # 返回JSON响应
        return jsonify(data)

    except pyodbc.Error as e:
        # 捕获pyodbc错误并记录
        error_message = str(e)
        print("An error occurred:", error_message)
        return jsonify({'error': error_message}), 500

@app.route('/api/crime_data')
def get_crime_data():
    try:
        data = []

        # 使用连接字符串创建数据库连接
        connection_string = f"DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}"
        conn = pyodbc.connect(connection_string)

        # 使用连接创建游标
        cursor = conn.cursor()

        # 执行SQL查询
        cursor.execute("SELECT * FROM crime_vF")  # 请替换为你的实际表名
        rows = cursor.fetchall()

        # 将查询结果转换为字典格式并添加到data列表中
        for row in rows:
            data.append({'LGA': row[0], 'Category': row[1], 'Offence Count': row[2], 'Rate per 100,000 population': row[3]})

        # 关闭游标和数据库连接
        cursor.close()
        conn.close()

        # 返回JSON响应
        return jsonify(data)

    except pyodbc.Error as e:
        # 捕获pyodbc错误并记录
        error_message = str(e)
        print("An error occurred:", error_message)
        return jsonify({'error': error_message}), 500


    
if __name__ == '__main__':
  app.run(host='0.0.0.0',port=5000)
