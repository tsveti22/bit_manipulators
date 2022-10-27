import React from 'react'
import './App.css'

import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import 'audio-react-recorder/dist/index.css'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recordState: null,
      audioData: null,
      resultText: null,
    }
  }

  start = () => {
    this.setState({
      recordState: RecordState.START
    })
  }

  pause = () => {
    this.setState({
      recordState: RecordState.PAUSE
    })
  }

  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    });
  }

  onStop = async (data) => {
    this.setState({
      audioData: data
    })

    console.log('onStop: audio data', data)
    let fd = new FormData();
    fd.append('audio_file', data['blob'], 'audio_file.wav');
    try {
      const response = await fetch(
            '/api/transcribe', {
            headers: { Accept: "application/json" },
            method: "POST", body: fd,}
        );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result)
      this.setState({
        resultText: result['summary']
      })

      console.log('result is: ', JSON.stringify(result, null, 4));

      console.log(result);
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  }

  render() {
    const { recordState } = this.state

    return (
      <div id="main-container">

      <div id="title">
        Papyrus
      </div>

      <div class="recorder">
        <AudioReactRecorder
          state={recordState}
          onStop={this.onStop}
          canvasWidth='250px'
          canvasHeight='20px'
          backgroundColor='rgb(255,255,255)'
          foregroundColor='rgb(217,132,67)'
        />
        <audio
          id='audio'
          controls
          src={this.state.audioData ? this.state.audioData.url : null}
        ></audio>

       <div class="button-box">
        <button id='record'  className={"button"} onClick={this.start}>
          Start
        </button>
        <button id='pause' className={"button"} onClick={this.pause}>
          Pause
        </button>
        <button id='stop'  className={"button"}  onClick={this.stop}>
          Stop
        </button>
      </div>
      </div>

      <div class="text-box">
      <div class="summary-title">Audio Summary:</div>
        {this.state.resultText}
      </div>

      <div class="footer">
      Created by the Bit Manipulators. JPMC Hackathon 2022.
      </div>
      </div>
    )
  }
}

export default App