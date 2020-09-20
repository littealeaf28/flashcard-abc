import React, { Component } from 'react';
import '../components/home/home.css';

class Card extends Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
    <div className="card" onClick={this.props.changeState}>
      <h2>{this.props.word_data[this.props.state]}</h2>
      <p>difficulty: {this.props.word_data[1]}</p>
      <p>time: {this.props.word_data[3]}</p>
      </div>
    )
  }
}
export default Card;
