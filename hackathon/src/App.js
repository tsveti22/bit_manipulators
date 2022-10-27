import React from 'react'
import './App.css'

import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import 'audio-react-recorder/dist/index.css'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recordState: null,
      audioData: null
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
    })
  }

  onStop = (data) => {
    this.setState({
      audioData: data
    })
    console.log('onStop: audio data', data)
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


            Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

      </div>

      <div class="footer">
      Created by the Bit Manipulators. JPMC Hackathon 2022.
      </div>
      </div>
    )
  }
}

export default App