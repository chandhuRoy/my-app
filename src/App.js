import React, { Component } from 'react';
import { Player } from 'video-react';
import './App.css';
import './video.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Player
            playsInline
            poster="./download.png"
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          />
        </header>
      </div>
    );
  }
}

export default App;
