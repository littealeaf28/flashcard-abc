import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  render() {
    return (
      <div className="welcome-note">

        <p>
          <span id="name">V²</span>, learn a new language from the content you choose!
          It is as easy as 1.Insert an MP4 file you wish to be translated
          to English 2. Receive flashcards with translated words grouped by order of difficulty.
        </p>

        <p>
          Let the fun begin!
        </p>

      </div>
    )
  }
}

export default Home;
