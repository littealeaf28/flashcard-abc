import React, { Component } from 'react';
import './card.css';

class Card extends Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
    <div className="card" onClick={this.props.changeState}>
      <h2>{this.props.word_data[this.props.state]}</h2>
      <p>Difficulty: {this.props.word_data[1]}</p>
      <p>Frequency: {this.props.word_data[3]}</p>
      </div>
    )
  }
}
export default Card;
