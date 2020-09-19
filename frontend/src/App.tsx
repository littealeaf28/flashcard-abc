import React from 'react';
import './App.css';
import Header  from './components/header/header';
import { VideoReader } from './components/video-reader/video-reader';

export function App() {
  return (
    <div className="App">
      <Header/>
      <h1>Video-2-Vocab</h1>
      <VideoReader />
    </div>
  );
}
