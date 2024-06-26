import React from "react";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import './Header.css'; // Make sure to import the CSS file

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logo = process.env.PUBLIC_URL + "/images/ESTR.jpg";
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="header-container">
      <Navbar expand="lg" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={`${process.env.PUBLIC_URL}/images/GIG_Logo_Trans.png`}
                alt="GIG Logo"
                className="header-logo"
              />
            </Navbar.Brand>
          </LinkContainer>

          {/* <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "10vh" }}
              navbarScroll
            > */}
              {/* <LinkContainer to="/all_products">
                <Nav.Link>
                  <i className="fas fa-th"></i> All Product
                </Nav.Link>
              </LinkContainer> */}
{/* 
              <LinkContainer to="/">
                <Nav.Link aria-label="Home">
                  <i className="fas fa-home"></i> Home
                </Nav.Link>
              </LinkContainer> */}

              {/* <LinkContainer to="/contactus">
                <Nav.Link>
                  <i className="fas fa-envelope"></i> Contact Us
                </Nav.Link>
              </LinkContainer> */}
{/* 
              <LinkContainer to="/aboutus">
                <Nav.Link>
                  <i className="fas fa-info-circle"></i> About Us
                </Nav.Link>
              </LinkContainer>
            </Nav> */}

            {/* <Nav className="ms-auto">
              <LinkContainer to="/wishlist">
                <Nav.Link>
                  <i className="fas fa-heart"></i> Wishlist
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer> */}

              {/* {userInfo ? (
                <NavDropdown
                  title={`${userInfo.first_name} ${userInfo.last_name}`}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )} */}
            {/* </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
