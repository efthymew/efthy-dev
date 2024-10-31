import { Component } from "react";
import '../css/Header.css';
import { Navbar, NavItem } from 'react-bootstrap';
import { HashLink } from "react-router-hash-link";
import { TypeAnimation } from 'react-type-animation';

class Header extends Component {
    render() {
        // const curr = this.props.current;
        return (
            <Navbar fixed="top" className="justify-content-center">
                <NavItem>
                    <Navbar.Brand className='header-main-css'>
                        <HashLink smooth to="#" className='hashlink-css'>
                            <TypeAnimation
                                wrapper="h1"
                                sequence={[
                                    1000,
                                    'graham efthymiou'
                                ]}
                                speed={50}
                            />
                        </HashLink>
                    </Navbar.Brand>
                </NavItem>
            </Navbar>
        )
    }
}

export default Header;