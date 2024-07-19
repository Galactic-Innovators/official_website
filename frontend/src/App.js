import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import AllProductScreen from "./components/screens/AllProductScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import AboutScreen from "./components/screens/AboutScreen";
import ContactScreen from "./components/screens/ContactScreen";
import CheckoutScreen from "./components/screens/CheckoutScreen";
import axios from "axios";
import SessionCheck from "./components/SessionCheck";
import WishlistScreen from "./components/screens/WishlistScreen";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import OrderConfirmationScreen from "./components/screens/OrderConfirmationScreen";
import SuccessScreen from "./components/screens/SuccessScreen";
import setupAxiosInterceptors from "./axiosConfig";
import { SpeedInsights } from "@vercel/speed-insights/react";
import NotFoundScreen from "./components/screens/NotFoundScreen";
import PrivacyPolicyScreen from "./components/screens/PrivacyPolicyScreen";
import TermsofServiceScreen from "./components/screens/TermsofServiceScreen";
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       alert('Your session has expired. Please log in again.');
//       localStorage.removeItem('userInfo');
//       // Redirect or handle logout
//     }
//     return Promise.reject(error);
//   }
// );

function App() {
  // const stripePromise = loadStripe('pk_test_A7jK4iCYHL045qgjjfzAfPxu');
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);
  return (
    // <Elements stripe={stripePromise}>
    <div>
      <Router>
        <SessionCheck />
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <Route path="/" component={AboutScreen} exact />
              <Route path="/home" component={HomeScreen} exact />
              <Route path="/login" component={LoginScreen} exact />
              <Route path="/register" component={RegisterScreen} exact />
              <Route path="/products/:id" component={ProductScreen} exact />
              <Route path="/cart/:id?" component={CartScreen} exact />
              <Route path="/wishlist/:id?" component={WishlistScreen} exact />
              <Route path="/all_products" component={AllProductScreen} exact />
              <Route path="/aboutus" component={AboutScreen} exact />
              {/* <Route
            path="/aboutus"
            component={() => {
              window.location.href =
                "https://mp.weixin.qq.com/s/4NwUE30WQT4H_jIIK5dIWA";
              return null;
            }}
            exact
          /> */}
              <Route path="/contactus" component={ContactScreen} exact />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/privacy-policy" component={PrivacyPolicyScreen} />
              <Route path="/terms-of-service" component={TermsofServiceScreen} />
              {/* <Route path="/payments" component={CheckoutScreen} exact /> */}
              <Route
                path="/order-confirmation"
                component={OrderConfirmationScreen}
              />
              <Route path="/success" component={SuccessScreen} />
              <Route component={NotFoundScreen} />{" "}
              {/* This route catches all unmatched routes */}
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
      <SpeedInsights />
    </div>
    // </Elements>
  );
}

export default App;
