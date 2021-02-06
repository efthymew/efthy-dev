import { Component } from "react";
import '../css/Header.css';
import { Navbar, NavItem } from 'react-bootstrap';
class Header extends Component {
    render() {
        return (
            <Navbar fixed="top" className="justify-content-center">
                <NavItem>
                    <Navbar.Brand href='/' className='header-css'>
                        <h1>Graham Efthymiou</h1>
                        <h2>Official Website</h2>
                    </Navbar.Brand>
                </NavItem>
            </Navbar>
        )
    }
}

export default Header;