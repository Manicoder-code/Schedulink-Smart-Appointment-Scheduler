from flask import Flask
import psycopg2

app = Flask(__name__)

@app.route("/")
def home():
    try:
        conn = psycopg2.connect(
            host="db",
            port=5432,
            dbname="schedulink",
            user="user",
            password="password"
        )
        conn.close()
        return "Connected to the database successfully!"
    except Exception as e:
        return f"Database connection failed: {e}"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001)

