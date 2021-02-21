import { Component } from "react";
import '../css/Header.css';
import { Navbar, NavItem } from 'react-bootstrap';

class Header extends Component {
    render() {
        const curr = this.props.current;
        console.log(curr);
        return (
            <Navbar fixed="top" className="justify-content-center" style={{ position: 'sticky' }}>
                <NavItem>
                    <Navbar.Brand href='/me' className={curr === 'aboutme' ? 'selected' : 'header-alt-css'}>
                        About Me
                    </Navbar.Brand>
                </NavItem>
                <NavItem>
                    <Navbar.Brand href='/' className='header-main-css'>
                        <h1>Graham Efthymiou</h1>
                        <h2>Official Website</h2>
                    </Navbar.Brand>
                </NavItem>
                <NavItem>
                    <Navbar.Brand href='/work' className={curr === 'work' ? 'selected' : 'header-alt-css'}>
                        Work
                    </Navbar.Brand>
                </NavItem>
            </Navbar>
        )
    }
}

export default Header;