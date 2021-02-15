import { Component } from "react";
//import { CrossfadeImage } from 'react-crossfade-image';
//import StickyFooter from 'react-sticky-footer';

import Footer from './Footer';
import Header from './Header';
import AnimatedBackground from './AnimatedBackground';

import '../css/Overlay.css';

class Overlay extends Component {

    render() {
        return (
            <div>
                <Header />
                <AnimatedBackground />
                <Footer />
            </div>
        )
    }
}

export default Overlay;