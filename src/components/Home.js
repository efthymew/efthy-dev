import { Component } from "react";
//import { CrossfadeImage } from 'react-crossfade-image';
//import StickyFooter from 'react-sticky-footer';

import Footer from './Footer';
import Header from './Header';


import '../css/Home.css';

// wallpapers
import back1 from "../imgs/715670.png";
import back2 from "../imgs/8fe6b53060e19d3d695ed17f39ce3129.jpg";
import back3 from "../imgs/9QnsAKY.jpg";
import back4 from "../imgs/4501512-ilya-kuvshinov-women-with-shades-sunglasses-simple-background.png";
import back5 from "../imgs/4532012-ilya-kuvshinov-women-artwork.png";
import back6 from "../imgs/by-ilya-kuvshinov-ilia-kuvshinov-portret-devushki-rozovyi-fo.jpg";
import back7 from "../imgs/b405fe9b82b64a38db1a4913a7500d8d-700.jpg";
import back8 from "../imgs/ilia-kuvshinov-portret-devushki-profil-dlinnye-volosy-rodink.jpg";
import back9 from "../imgs/ilya-kuvshinov-digital-art-anime-girls-ilya-wallpaper.jpg";
import back10 from "../imgs/ilya-kuvshinov-artwork-female-anime-wallpaper.jpg";
import back11 from "../imgs/Z2jLo93.png";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundUrls: [
                back1,
                back2,
                back3,
                back4,
                back5,
                back6,
                back7,
                back8,
                back9,
                back10,
                back11
            ],
            currentBackground: Math.floor(Math.random() * 11)
        }
        this.changeBackground = this.changeBackground.bind(this);
    }

    componentDidMount() {
        setInterval(this.changeBackground, 10000);
    }

    changeBackground() {
        this.setState({ currentBackground: (this.state.currentBackground + 1) % this.state.backgroundUrls.length });
    }
    render() {
        const bg = this.state.backgroundUrls[this.state.currentBackground];
        return (
            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
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

export default Home;