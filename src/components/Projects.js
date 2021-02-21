import { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap'
import Overlay from './Overlay'
import '../css/Projects.css'

class Projects extends Component {

    render() {
        return (
            <Overlay current='projects'>
                <Jumbotron>
                    <h1>Projects!</h1>
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

export default Projects;