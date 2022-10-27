from flask import Flask, request, send_from_directory
from summary import get_summary
from transcribe_basics import get_transcript
import os

app = Flask(__name__, static_url_path='/')
app.debug = True


@app.route("/api/transcribe", methods=['POST', 'GET'])
def transcribe_audio():
    audio = request.files['audio_file'].read()
    binary_file = open("audio.wav", "wb")
    binary_file.write(audio)
    binary_file.close()
    # Audio to text
    text = get_transcript('audio.wav')
    print(text)
    try:
        summary_list = get_summary(text)['top_sentences']
        sentence_size = len(summary_list)
        top_n = len(summary_list)
        if len(summary_list) > 3:
            top_n = round(len(summary_list) / 3)
        summary = ' '.join(summary_list[:top_n])
        summary = summary.replace('\n', '')
        return {'summary': summary}
    except ZeroDivisionError:
        return {'summary': text}


root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ui")


@app.route("/", methods=['GET'])
def home():
    return app.send_static_file('index.html')


@app.route('/<path>')
def fallback(path):
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run()
