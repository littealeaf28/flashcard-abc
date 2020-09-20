import React, { useState } from 'react';
import axios from 'axios';
import './video-reader.css';

export function VideoReader() {
  const [video, setVideo] = useState<string | ArrayBuffer | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const getVideo = (e: any) => {
    const reader = new FileReader();
    const videoFile: File = e.target.files[0];

    // In the case, user is switching out video
    if (videoFile) {
      reader.readAsDataURL(videoFile);
      setVideoFile(videoFile);
    }

    reader.addEventListener('load', () => {
      setVideo(reader.result);
    })
  }

  const submitVideo = (e: any) => {
    e.preventDefault();

    if (video && videoFile) {
      let videoURL = video as string;
      videoURL = videoURL.replace(/^data:(.*?);base64,/, '');
      const videoFileName = videoFile.name.replace(/\s/g, '-')
        .substr(0, videoFile.name.length - 4);
      axios.post(`${process.env.REACT_APP_PROXY}/video-process`, { name: videoFileName, videoURL })
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
