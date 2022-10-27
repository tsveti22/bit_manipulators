from flask import Flask, request
from summary import get_summary
from transcribe_basics import get_transcript

app = Flask(__name__)
app.debug = True


@app.route("/api/transcribe", methods=['POST', 'GET'])
def transcribe_audio():
    print(request.files)
    print(request.form)
    audio = request.files['audio_file'].read()
    binary_file = open("audio.wav", "wb")
    binary_file.write(audio)
    binary_file.close()
    # Audio to text
    text = get_transcript('audio.wav')
    print(text)
    summary_list = get_summary(text)['top_sentences']
    sentence_size = len(summary_list)
    top_n = len(summary_list)
    if len(summary_list) > 3:
        top_n = round(len(summary_list) / 3)
    summary = ' '.join(summary_list[:top_n])
    summary = summary.replace('\n', '')
    return {'summary': summary}


if __name__ == '__main__':
    app.run()
