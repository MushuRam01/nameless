import os
from flask import Flask, render_template, request, jsonify

# Initialize Flask app
# Flask will look for templates in a 'templates' folder
# and static files in a 'static' folder by default.
app = Flask(__name__)

# --- Routes ---

@app.route('/')
def home():
    """
    Renders the home page of the website.
    This will look for 'index.html' inside the 'templates' folder.
    """
    return render_template('index.html')

@app.route('/about')
def about():
    """
    Renders the about page.
    """
    return render_template('about.html')

@app.route('/services')
def services():
    """
    Renders the services page.
    """
    return render_template('services.html')

@app.route('/portfolio')
def portfolio():
    """
    Renders the portfolio page.
    """
    return render_template('portfolio.html')

@app.route('/contact')
def contact():
    """
    Renders the contact page.
    """
    return render_template('contact.html')




if __name__ == '__main__':
    # Run the Flask development server
    # debug=True allows for automatic reloading on code changes and provides a debugger
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port)