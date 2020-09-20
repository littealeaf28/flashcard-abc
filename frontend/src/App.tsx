import React from 'react';
import './App.css';
import Header from './components//header/header';
import Home from './components/home/home';
import Flash from './components/flash';
import { VideoReader } from './components/video-reader/video-reader';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export function App() {
  return (
<Router>
<div className="App">
      <Header />
      <Home />
        <VideoReader />
        <Route path="/flash" component={Flash} />
    </div>
</Router>

  );
}
