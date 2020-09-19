import React, {Component} from 'react';
import './header.css';
import Logo from '../../public/logo.jpg';


class Header extends Component {
  render() {
    return (
      <div>
        <img src={Logo}></img>
      </div>
    )
    }
}

export default Header;
