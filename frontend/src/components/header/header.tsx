import React, {Component} from 'react';
import './header.css';
import Logo from '../../images/logo.jpg';


class Header extends Component {
  render() {
    return (
      <div>
        <img src={Logo}/>
      </div>
    )
    }
}

export default Header;
