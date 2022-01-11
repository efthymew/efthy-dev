import { Component } from "react";
import '../css/Header.css';
import { Navbar, NavItem } from 'react-bootstrap';
import { HashLink } from "react-router-hash-link";

class Header extends Component {
    render() {
        // const curr = this.props.current;
        return (
            <Navbar fixed="top" className="justify-content-center" style={{ position: 'sticky' }}>
                <NavItem>
                    <Navbar.Brand className='header-main-css'>
                        <HashLink smooth to="#" className='hashlink-css'>
                            <h1>Graham Efthymiou</h1>
                            <h2>Official Website</h2>
                        </HashLink>
                    </Navbar.Brand>
                </NavItem>
            </Navbar>
        )
    }
}

export default Header;