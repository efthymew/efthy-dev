import { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';

import Background from './Background';
import Header from './Header';
import Footer from './Footer';

class Root extends Component {

    render() {
        return (
            <div>
                <Header />
                <Background />
                <Footer />
            </div>
        )
    }
}

export default Root;