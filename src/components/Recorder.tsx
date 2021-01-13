import React from 'react';
import '../App.css';
import {
  Button
} from '@material-ui/core';

const audioType = 'audio/*';

interface IRecorder {
  recording: boolean;
  audios: any[];
}

export default class Recorder extends React.Component<{}, IRecorder> {
  constructor(props: any) {
    super(props);
    this.state = {
      recording: false,
      audios: [],
    };
  }

  audio: any = document.querySelector('.audio');
  mediaRecorder: any;
  chunks: any[] = [];

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    // init recording
    this.mediaRecorder = new MediaRecorder(stream);
    // show it to user
    this.audio.src = this.mediaRecorder;
    this.audio.play();
    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = (e: any) => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  startRecording(e: any) {
    e.preventDefault();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({recording: true});
  }

  stopRecording(e: any) {
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({recording: false});
    // save the video to memory
    this.saveAudio();
  }

  saveAudio() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, {type: audioType});
    // generate video url from blob
    const audioURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const audios = this.state.audios.concat([audioURL]);
    this.setState({audios});
  }

  deleteAudio(audioURL: any) {
    // filter out current videoURL from the list of saved videos
    const audios = this.state.audios.filter((a: any) => a !== audioURL);
    this.setState({audios});
  }

  render() {
    const {recording, audios} = this.state;
    return (
      <div>
        <audio
          className="audio"
          style={{width: 400}}
          ref={a => {
            this.audio = a;
          }}>
         <p>Audio stream not available.</p>
        </audio>
        <div>
          {!recording && <button onClick={e => this.startRecording(e)}>Record</button>}
          {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
        </div>
        <div>
          <h3>Recorded audios:</h3>
          {audios.map((audioURL, i) => (
            <div key={`audio_${i}`}>
              <audio controls style={{width: 200}} src={audioURL} />
              <div>
                <Button onClick={() => this.deleteAudio(audioURL)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}