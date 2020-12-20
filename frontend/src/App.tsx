import React, {Component} from 'react';
import './App.css';
import Header from './components//header/header';
import Home from './components/home/home';
import Flash from './components/flash';
import { VideoReader } from './components/video-reader/video-reader';
//import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


class App extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      cards: [],
      show_cards: false,
    };
  }

  // [word, level or freq, translated, timestamp]
  translate = (cards: any) => {
    console.log("translate");
    this.setState({
      cards:cards,
      show_cards:true
    });
  }

  close = () => {
    this.setState({
      cards:[],
      show_cards:false
    });
  }

  render() {
    return (
    <div className="App">
        <Header />
        {this.state.show_cards && <Flash cards={this.state.cards} close={this.close}/>}
        <Home />
        <VideoReader translate={this.translate}/>
      </div>

    );
  }
}

export default App;
