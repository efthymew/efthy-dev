import { Component } from "react";
import '../css/Footer.css';
import TwitterLogo from '../imgs/Twitter_Logo_WhiteOnBlue.svg';
import GithubLogo from '../imgs/github-logo.svg';
import TwitchLogo from '../imgs/twitch-tile.svg';
import { Navbar, NavbarBrand } from 'react-bootstrap';
class Footer extends Component {
    render() {
        return (
            <Navbar fixed="bottom" className="justify-content-center">
                <NavbarBrand href="https://twitter.com/efthymew" target="_blank" className="nav-icon">
                    <img src={TwitterLogo} width="50" alt='twitter' style={{ borderRadius: '50%' }}/>
                </NavbarBrand>
                <NavbarBrand href="https://github.com/efthymew" target="_blank" className="nav-icon-git">
                    <img src={GithubLogo} width="50" alt='github' style={{ borderRadius: '50%' }}/>
                </NavbarBrand>
                <NavbarBrand href="https://twitch.tv/efthymew" target="_blank" className="nav-icon">
                    <img src={TwitchLogo} width="50" alt='twitch' style={{ borderRadius: '50%' }}/>
                </NavbarBrand>
            </Navbar>
        )
    }
}

export default Footer;