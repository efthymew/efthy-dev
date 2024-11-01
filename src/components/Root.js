import { Component } from 'react';

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