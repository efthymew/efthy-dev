import { Component } from 'react';
import { Container, Carousel } from 'react-bootstrap'
import back9 from "../imgs/ilya-kuvshinov-digital-art-anime-girls-ilya-wallpaper.jpg";
import back10 from "../imgs/ilya-kuvshinov-artwork-female-anime-wallpaper.jpg";
import back11 from "../imgs/Z2jLo93.png";

class SplashPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            direction: null,
        };
    }

    render() {
        return (
            <Container>
            <Carousel style={{fontFamily: 'Roboto Slab'}}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={back10}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={back11}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={back9}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </Container>
        )
    }
}

export default SplashPage;