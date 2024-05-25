import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartDetails, clearCart } from "../../actions/cartActions";
import { login } from "../../actions/userActions";
import FormContainer from "../FormContainer";
import { fetchLikesDetails, clearLikes } from "../../actions/likesActions";
import "./index.css";

function LoginScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const [delay, setDelay] = useState(false); // Initialize delay state

  useEffect(() => {
    if (userInfo) {
      setDelay(true); // Set delay state to true upon successful login
      setTimeout(() => {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("likesItems");
        dispatch(clearCart()); // Clear the cart in Redux state
        dispatch(clearLikes());
        dispatch(fetchCartDetails(userInfo.cartId)); // Optionally, fetch the new user's cart
        dispatch(fetchLikesDetails(userInfo.likesId));
        history.push(redirect);
      }, 2000); // 1-second delay
    }
  }, [history, userInfo, redirect, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  return (
    <div className="main-container">
      <div className="or-divider">
        <div className="border" />
        <span className="or">OR</span>
        <div className="border-1" />
      </div>
      <div className="sign-in-forms">
        <div className="input">
          <span className="email">Email</span>
          <div className="input-2">
            <span className="span-johndoe-mail">johndoe@mail.com</span>
            <input className="input-3" />
          </div>
        </div>
        <div className="input-4">
          <span className="span-password">Password</span>
          <div className="input-5">
            <input className="input-6" />
            <span className="span-eye">eye</span>
            <div className="password-text" />
          </div>
        </div>
      </div>
      <button className="button">
        <span className="sign-in-account">Sign in</span>
      </button>
      <div className="dont-have-account">
        <span className="dont-have-account-7">Don't have an account yet?</span>
        <span className="space"> </span>
        <span className="sign-up">Sign Up</span>
      </div>
      {/* <span className="all-rights-reserved">© 2023 All rights reserved.</span> */}
      <div className="bg-circle" />
      <div className="noise-texture" />
      <div className="login_logo" />
      <div className="frame">
        <div className="top-texture" />
      </div>
      <span className="sign-in-account-8">G.I.G. Creating Innovation</span>
      <div className="sign-in-buttons">
        <button className="sign-in-way-button">
          <div className="icon-google">
            <div className="group" />
          </div>
          <span className="sign-in-google">Sign in with Google</span>
        </button>
        <button className="sign-in-way-button-9">
          <div className="icon-facebook">
            <div className="facebook" />
          </div>
          <span className="sign-in-facebook">Sign in with Facebook</span>
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {delay && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text" // Change to 'text' if it's just a username
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="mt-3" type="submit" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default LoginScreen;
