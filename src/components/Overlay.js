import { Component } from "react";
//import { CrossfadeImage } from 'react-crossfade-image';
//import StickyFooter from 'react-sticky-footer';

import Footer from './Footer';
import Header from './Header';
import AnimatedBackground from './AnimatedBackground';

import '../css/Overlay.css';
import { Fade } from "react-bootstrap";

class Overlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadein: false
        }
        this.setForFade = this.setForFade.bind(this);
    }
    componentDidMount() {
        setTimeout(this.setForFade, 1200);
    }
    setForFade() {
        this.setState({fadein: true});
    }
    render() {
        return (
            <div>
                <AnimatedBackground />
                <Header current={this.props.current} />
                <Fade appear in={this.state.fadein}>
                    {this.props.children}
                </Fade>
                <Footer />
            </div>
        )
    }
}

export default Overlay;