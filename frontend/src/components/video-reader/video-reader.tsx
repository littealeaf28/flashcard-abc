import React, { useState } from 'react';
import axios from 'axios';
import './video-reader.css';

export function VideoReader() {
  const [video, setVideo] = useState<string | ArrayBuffer | null>(null);

  const getVideo = (e: any) => {
    const reader = new FileReader();
    const videoFile: File = e.target.files[0];

    if (videoFile) {
      reader.readAsDataURL(videoFile);
    }

    reader.addEventListener('load', () => {
      setVideo(reader.result);
    })
  }

  const submitVideo = (e: any) => {
    e.preventDefault();

    // ${process.env.REACT_APP_PROXY}

    if (video) {
      axios.post(`${process.env.REACT_APP_PROXY}/video-process`, { video: video })
      console.log('Only hit if video is not null');
    }
  }

  return (
    <form onSubmit={submitVideo}>
      <input type="file" accept="video/*" onChange={getVideo} required/>
      { video && <div>
        <h3>Video Preview</h3>
        <video controls autoPlay>
          <source src={ video as string } type="video/mp4"/>
        </video>
      </div> }
      <button type="submit">Convert</button>
    </form>
  )
}
