import React, { Component } from 'react';
import Card from './card';

class Flash extends Component<any, any> {

  // props: cards, close
  constructor(props: any) {
    super(props);
    this.state = {
      current: 0, // which card
      state: 0 // card state
    };
  }

  prevCard = () => {
    if (this.state.current >= 1) {
      this.setState({
        current: this.state.current-1,
        state: 0
      });
    }
  }

  nextCard = () => {
    if (this.state.current < this.props.cards.length - 1) {
      this.setState({
        current: this.state.current+1,
        state: 0
      });
    }
  }

  changeState = () => {
    this.setState({
      state:2-this.state.state
    });
  }

  render() {
    return (
      <div id="flash">
        <button id="close" onClick={this.props.close}>x</button>
        <Card changeState={this.changeState} word_data={this.props.cards[this.state.current]} state={this.state.state}/>
        <button id="prev" onClick={this.prevCard}>prev</button>
        <button id="next" onClick={this.nextCard}>next</button>
      </div>
    )
  }
}
export default Flash;
