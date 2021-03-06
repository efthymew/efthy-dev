import { Component } from 'react';
import { Jumbotron, Button, Container, Row } from 'react-bootstrap'
import Overlay from './Overlay'

class SplashPage extends Component {

    render() {
        return (
            <Overlay>
                <Container>
                    <Row>
                        <Jumbotron>
                            <h1>Hello, world! Home PAGE!</h1>
                            <p>
                                This is a simple hero unit, a simple jumbotron-style component for calling
                                extra attention to featured content or information.
                            </p>
                            <p>
                                <Button variant="primary">Learn more</Button>
                            </p>
                        </Jumbotron>
                    </Row>
                </Container>

            </Overlay>
        )
    }
}

export default SplashPage;