from flask import Flask, request, jsonify, send_file, render_template, redirect, url_for
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask("AI Assistant Rapid Web App Developer")
CORS(app)  # Enable CORS for all routes

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')  # Load the API key from the environment variable

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    idea = data.get('idea')
    details = data.get('details')
    photos = data.get('photos')  # Assuming photos are URLs or base64 strings

    if not idea or not details:
        return jsonify({'error': 'Missing required fields: idea or details'}), 400

    # Prepare the prompt for Gemini AI
    prompt = (
        f"Create a modern, well-furbished frontend code using html and css that is pleasing, aesthetic, interactive, add different color backgrounds\n"
        f"and add some fun elements to the webpage. Make sure that the header and footer are present and give a few other pages on the left.\n"
        f"- Increase Sales\n"
        f"- Provide Information\n"
        f"- Build Brand Awareness\n"
        f"- Offer Customer Support\n\n"
        f"Details:\n"
        f"{details}\n"
        f"{idea}\n"
    )

    # Call Gemini AI API
    try:
        response = requests.post(
            f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}',
            json={
                "contents": [{
                    "role": "user",
                    "parts": [{"text": prompt}]
                }]
            },
            headers={'Content-Type': 'application/json'}
        )
        response.raise_for_status()  # Raise an exception for HTTP errors
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error calling Gemini API: {e}")
        return jsonify({'error': 'Failed to generate code'}), 500

    # Log API response for debugging
    app.logger.info(f"Gemini API response: {response.text}")

    try:
        response_json = response.json()
    except ValueError as e:
        app.logger.error(f"Error parsing JSON response: {e}")
        return jsonify({'error': 'Failed to parse response from Gemini API'}), 500

    # Extract generated content
    if 'candidates' in response_json and response_json['candidates']:
        parts = response_json['candidates'][0]['content'].get('parts', [])
        if parts and isinstance(parts[0], dict) and 'text' in parts[0]:
            html_content = parts[0]['text']

            if "<html" in html_content:
                start_index = html_content.find('<html')
                end_index = html_content.find('</html>') + len('</html>')
                html_content = html_content[start_index:end_index]

            # Save the generated code to a temporary file
            temp_file_path = '/tmp/generated_code.html'
            with open(temp_file_path, 'w') as temp_file:
                temp_file.write(html_content)

            return jsonify({'code': html_content, 'edit_url': '/edit', 'download_url': '/download'})

    app.logger.error(f"Unexpected response structure: {response_json}")
    return jsonify({'error': 'Unexpected response structure from Gemini API'}), 500

@app.route('/edit', methods=['GET'])
def edit():
    temp_file_path = '/tmp/generated_code.html'
    if not os.path.exists(temp_file_path):
        return jsonify({'error': 'No generated code available for editing'}), 404

    with open(temp_file_path, 'r') as file:
        code = file.read()

    return jsonify({'code': code})

@app.route('/save', methods=['POST'])
def save():
    data = request.json
    updated_code = data.get('code')

    if not updated_code:
        return jsonify({'error': 'No code provided for saving'}), 400

    temp_file_path = '/tmp/generated_code.html'
    with open(temp_file_path, 'w') as file:
        file.write(updated_code)

    return jsonify({'message': 'Code updated successfully'})

@app.route('/api/generated-code', methods=['GET'])
def get_generated_code():
    temp_file_path = '/tmp/generated_code.html'
    if not os.path.exists(temp_file_path):
        return jsonify({'error': 'No generated code available for preview'}), 404

    with open(temp_file_path, 'r') as file:
        html_content = file.read()

    return jsonify({'code': html_content})

@app.route('/download', methods=['GET'])
def download():
    temp_file_path = '/tmp/generated_code.html'
    if not os.path.exists(temp_file_path):
        return jsonify({'error': 'No generated code available for download'}), 404

    return send_file(temp_file_path, as_attachment=True, download_name='generated_code.html')

if __name__ == '__main__':
    app.run(debug=True)