
import React from 'react'
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, UncontrolledDropdown} from 'reactstrap'
import { useRecoilState } from 'recoil'
import { isLoggedInState, } from '../store'
import { FcMenu } from "react-icons/fc";
import { Link } from 'react-router-dom';

interface Props {
    logOut: () => void
  }

const Header = ({logOut}: Props) => {
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInState)

    return (
        <Navbar className="header" fixed="top">
            <NavbarBrand>
                <>
                <img alt="logo" src="/logo.png" width="30" height="30" />
                Tross Partners
                </>
            </NavbarBrand>
            <Nav>
                {loggedIn && <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                        <FcMenu />
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem tag={Link} to="/">
                        Home
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/settings">
                        Account
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/login" onClick={logOut}>
                        Logout
                    </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>}
            </Nav>
        </Navbar>
    )
}

export default Header