import { Component } from "react";
import { Jumbotron, Button } from 'react-bootstrap'
import Overlay from './Overlay';
import '../css/Work.css';

class Work extends Component {

    render() {
        return (
            <Overlay current='work'>
                <Jumbotron>
                    <h1>Work PAGE!</h1>
                    <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information.
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
                </Jumbotron>
            </Overlay>
        )
    }
}

export default Work;