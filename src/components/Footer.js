import { Component } from "react";
import '../css/Footer.css';
import TwitterLogo from '../imgs/Twitter_Logo_WhiteOnBlue.svg';
import { Nav, NavItem } from 'react-bootstrap';
class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Nav className="nav-class">
                    <NavItem className='nav-icon'>
                        <a href="https://twitter.com/efthymew" target="_blank" rel="noreferrer">
                            <img src={TwitterLogo} width="60" alt='twitter' style={{ borderRadius: '50%' }}/>
                        </a>
                    </NavItem>
                </Nav>

            </div>
        )
    }
}

export default Footer;