import React, {Component} from 'react';
import './header.css';
import Logo from '../../images/logo.jpg';


class Header extends Component {
  render() {
    return (
      <div className="container">
        <img src={Logo} />
        <div className="logo-text">
          <h1>Video-<span id="logo-2">2</span>-Vocab</h1>
          <p>V²</p>
        </div>
      </div>
    )
    }
}

export default Header;
