from http.client import InvalidURL
from operator import truediv
import os
import sys
import requests
from PIL import Image
from io import BytesIO
from flask import Flask, flash, jsonify, request, send_file, redirect,abort



mode=os.getenv('mode')
app = Flask(__name__)

# Debug is set to either true or false depending on the env
if os.environ.get('DEVELOPMENT'):
    app.config['DEBUG'] = True
else:
    app.config['DEBUG'] = False


def ratio(height, width):
    ratio = float(width) / float(height)
    return ratio


def sanitze(value):
    # Make sure people don't crash the server with huge image sizes.
    value = int(value)
    if value > 400:
        value = 400
    return value


def measurements(image, width=None, height=None):
    # Get the current image size.
    (current_width, current_height) = image.size
    ratio = float(current_width) / float(current_height)

    # If nothing is passed in, set the width.
    if not width and not height:
        width = 150

    # If only the width passed in, calculate the new height.
    if width:
        width = sanitze(width)
        height = int(width / ratio)

    # If only the height passed in, calculate the new width.
    elif height:
        height = sanitze(height)
        width = int(height * ratio)
    return (width, height)

@app.route('/',methods=['GET'])
def index():
    
    width = request.args.get('width')
    height = request.args.get('height')
    url = request.args.get('url')
    if not width or not height or not url:
        return abort(400)
    url = url[1:-1] 
    try:
        response = requests.get(url)
    except InvalidURL:
        return redirect(url)
    # Open the image.
    image = Image.open(BytesIO(response.content))
    
    if not width and not height:
        desired_width = 400
        desired_height = 400
    elif not width:
        desired_height = int(height)
        desired_width = desired_height
    elif not height:
        desired_width = int(width)
        desired_height = desired_width
    else:
        desired_height = int(height)
        desired_width = int(width)
    # Calculate the desired height and width of the image.
    # desired_width, desired_height = measurements(image, width, height)
    buffer_image = BytesIO()
    print ("Numbers is", desired_width, desired_height)
    resized_image = image.resize((desired_width, desired_height), Image.ANTIALIAS)
    resized_image.save(buffer_image, 'JPEG', quality=90)
    buffer_image.seek(0)

    return send_file(buffer_image, mimetype='image/jpeg')

@app.route('/',methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        print('baddd 1',file=sys.stderr)
        return redirect(request)
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename

    if file.filename == '':
        return redirect(request.url)
    desired_width = request.args.get('width',300)
    desired_height = request.args.get('height',300)
    image = Image.open(BytesIO(file.read()))
    buffer_image = BytesIO()

    resized_image = image.resize((desired_width, desired_height), Image.ANTIALIAS)
    resized_image.save(buffer_image, 'JPEG', quality=90)
    
    buffer_image.seek(0)

    return send_file(buffer_image, mimetype='image/jpeg')

    
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 4000))
    app.run(host='0.0.0.0', port=port)