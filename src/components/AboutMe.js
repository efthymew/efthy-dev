import { Component } from "react";

import Footer from './Footer';
import Header from './Header';

import '../css/AboutMe.css';

class AboutMe extends Component {

    render() {
        return (
            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${this.props.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                top: '0',
                left: '0',
                position: 'fixed',
                width: '100%',
                height: '100%'
            }}>
                <Header />
                <Footer />
            </div>
        )
    }
}

export default AboutMe;