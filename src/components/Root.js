import { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap'
import Overlay from './Overlay'
import { HashLink } from 'react-router-hash-link';

class Root extends Component {

    render() {
        return (
            <Overlay>
                <Container>
                    <Row id="test1" style={{ paddingBottom: "70vh" }}>
                        <Col>
                            <Jumbotron>
                                <h1>Hello, world! Home PAGE!</h1>
                                <p>
                                    This is a simple hero unit, a simple jumbotron-style component for calling
                                    extra attention to featured content or information.
                                </p>
                                <p>
                                    <HashLink smooth to="#learn-more">
                                        Learn More!
                                    </HashLink>
                                </p>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row id="learn-more" style={{ paddingTop: "13.5vh", paddingBottom: "70vh" }}>
                        <Col>
                            <Jumbotron>
                                <h1>Test Jumbotron</h1>
                                <p>
                                    This is a simple hero unit, a simple jumbotron-style component for calling
                                    extra attention to featured content or information.
                                </p>
                                <p>
                                    <Button variant="primary">Learn more</Button>
                                </p>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>

            </Overlay>
        )
    }
}

export default Root;