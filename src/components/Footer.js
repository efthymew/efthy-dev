import { Component } from "react";
import '../css/Footer.css';
import TwitterLogo from '../imgs/Twitter_Logo_WhiteOnBlue.svg';
import GithubLogo from '../imgs/github-logo.svg';
import TwitchLogo from '../imgs/twitch-tile.svg';
import { Navbar, NavbarBrand, Fade } from 'react-bootstrap';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadein: 0
        }
        this.doneFade = this.doneFade.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {this.setState({fadein: 1})}, 500);
    }

    doneFade() {
        this.setState((state) => {
            return {fadein: state.fadein + 1};
          });
    }
    render() {
        const curr = this.state.fadein;
        return (
            <Navbar fixed="bottom" className="justify-content-center">
                <Fade in={curr >= 1} onEntered={this.doneFade}>
                    <NavbarBrand href="https://twitter.com/efthymew" target="_blank" className="nav-icon">
                        <img src={TwitterLogo} width="50" alt='twitter' style={{ borderRadius: '50%' }} />
                    </NavbarBrand>
                </Fade>
                <Fade in={curr >= 2} onEntered={this.doneFade}>
                    <NavbarBrand href="https://github.com/efthymew" target="_blank" className="nav-icon-git">
                        <img src={GithubLogo} width="50" alt='github' style={{ borderRadius: '50%' }} />
                    </NavbarBrand>
                </Fade>
                <Fade in={curr >= 3}>
                    <NavbarBrand href="https://twitch.tv/efthymew" target="_blank" className="nav-icon">
                        <img src={TwitchLogo} width="50" alt='twitch' style={{ borderRadius: '50%' }} />
                    </NavbarBrand>
                </Fade>
            </Navbar>
        )
    }
}

export default Footer;