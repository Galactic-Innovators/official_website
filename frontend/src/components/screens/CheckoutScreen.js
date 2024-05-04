// CheckoutScreen.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Row, Card, ListGroup, Image } from 'react-bootstrap';
import { addToCart,removeFromCart, fetchCartDetails } from '../../actions/cartActions';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// import { saveShippingAddress } from '../../actions/cartActions'; // You need to implement this

// import paypalLogo from '../../assets/paypal.png'; // Path to PayPal logo
// import shopLogo from '../../assets/shop.png'; // Path to shop logo
// import applePayLogo from '../../assets/applepay.png'; // Path to Apple Pay logo

import paypalLogo from '../../images/paypl.png'; // Path to PayPal logo
import shopLogo from '../../images/shop.jpg'; // Path to shop logo
import applePayLogo from '../../images/apple.jpg'; // Path to Apple Pay logo

function CheckoutScreen() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [message, setMessage] = useState("");
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    console.log("User Info",userInfo);

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;
    const { shippingAddress } = cart;
    console.log("Checkout Cart",cart);

    // const [address, setAddress] = useState(shippingAddress.address || '');
    // const [city, setCity] = useState(shippingAddress.city || '');
    // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    // const [country, setCountry] = useState(shippingAddress.country || '');
    const [showOrderSummary, setShowOrderSummary] = useState(false);
    

    const stripePromise = loadStripe('pk_test_kbqUrvH0YXB7wc9EHEO6e9dP00Ox2h6G5M');

    const toggleOrderSummary = () => {
        setShowOrderSummary((prevShowOrderSummary) => !prevShowOrderSummary);
    };

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    useEffect(() => {
        const fetchCustomerCartId = async () => {
            if (!userInfo) {
                history.push('/login');
                return;
            }
            try {
                const config = {
                    headers: {
                        'Authorization': `JWT ${userInfo.accessToken}`, 
                    },
                };
                console.log("Getting /store/customers/ with key", `JWT ${userInfo.accessToken}`);
                const { data } = await axios.get('/store/customers/', config);
                // Assuming the response includes the cart_id directly
                const customerCartId = data.find(customer => customer.user_id === userInfo.id).cart_id;
                console.log("cartID:", customerCartId);
                if (customerCartId) {
                    dispatch(fetchCartDetails(customerCartId));
                }
            } catch (error) {
                console.error('Failed to fetch customer cart ID:', error);
            }
        };

        fetchCustomerCartId();
    }, [userInfo, history, dispatch]);

    const defaultImage = process.env.PUBLIC_URL + '/images/sample.jpg';
    const calculateSubtotal = () => cartItems.reduce((acc, item) => acc + item.qty * item.unit_price, 0).toFixed(2);
    
    const subtotal = calculateSubtotal();
    
    const location = useLocation();
    const cartItemsPayload = cartItems.map(item => ({
                name: item.name,
                amount: item.unit_price * 100, // Convert price to cents
                currency: "cad",
                quantity: item.qty,
                stripe_id: item.stripe_id, // Use a default image if no image is available
            }));
    console.log(cartItemsPayload);        

    return (
        <div className="d-flex justify-content-center align-items-start">
        <div style={{ maxWidth: '600px', width: '100%' }}>
            <Card className="mb-3">
                <Card.Header className="d-flex justify-content-between align-items-center" onClick={toggleOrderSummary} style={{ cursor: 'pointer' }}>
                    {showOrderSummary ? 'Hide' : 'Show'} order summary 
                    <span className="float-right">
                        {showOrderSummary ? '▲' : '▼'}
                    </span>
                </Card.Header>
                {showOrderSummary && (
                    <ListGroup variant="flush">
                        {cartItems.map((item, index) => (
                            /* STYLE 1*/
                            // <ListGroup.Item key={index}>
                            //     <div className="d-flex justify-content-between">
                            //         <div className="d-flex">
                            //             <Image src={item.images.length > 0 ? item.images[0].image : defaultImage} alt={item.name}  style={{ width: '50px', height: '50px', objectFit: 'cover' }}/>
                            //             <div className="ml-3" style={{ marginLeft: '20px' }}>
                            //                 <p>{item.name}</p>
                            //                 <p>Qty: {item.qty}</p>
                            //             </div>
                            //         </div>
                            //         <div>${item.total_price.toFixed(2)}</div>
                            //     </div>
                            // </ListGroup.Item>
                            /* STYLE 2*/
                            <ListGroup.Item key={index}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div style={{ position: 'relative' }}>
                                    <Image src={item.images.length > 0 ? item.images[0].image : defaultImage} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                    <span style={{
                                        position: 'absolute',
                                        top: '-15px', // Half the height of the sticker to move it up
                                        right: '-15px', // Half the width of the sticker to move it to the right
                                        backgroundColor: 'rgba(90,90,90,0.8)',
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        color: 'white',
                                    }}>
                                        {item.qty}
                                    </span>
                                </div>
                                <div className="ml-3" style={{ marginLeft: '15px' }}>
                                    <p>{item.name}</p>
                                </div>
                                <div>${item.total_price.toFixed(2)}</div>
                            </div>
                        </ListGroup.Item>
                        ))}
                        {/* <ListGroup.Item>
                            <div className="d-flex">
                                <input type="text" className="form-control" placeholder="Discount code or gift card" />
                                <Button variant="outline-secondary" className="ml-2">Apply</Button>
                            </div>
                        </ListGroup.Item> */}
                        <ListGroup.Item>
                            <div className="d-flex justify-content-between">
                                <span style={{ fontSize: '1.5em' }}>Subtotal</span>
                                <span style={{ fontSize: '1.5em' }}>${subtotal}</span>
                            </div>
                        </ListGroup.Item>
                        {/* Discount Code Input */}

                    </ListGroup>
                )}
            </Card>


        <div className="container mt-5"> {/* Adds some top margin for spacing */}
            {/* <Form onSubmit={submitHandler} className="w-100" style={{ maxWidth: '600px', margin: '0 auto' }}> */}
            <h3>Shipping Details</h3>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter address'
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter city'
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter postalCode'
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter country'
                ></Form.Control>
            </Form.Group>
            {/* Add similar Form.Group components for city, postalCode, and country */}

             {/* </Form> */}

             <div style={{ height: '2rem' }}></div> {/* Adjust '2rem' to the amount of space you want */}                        


            <Form.Group className="text-center mb-4">
                <Form.Label as="legend">Express checkout</Form.Label>
                <div className="d-flex justify-content-around">
                    <Button variant="light" className="payment-method-button" onClick={() => setPaymentMethod('PayPal')}>
                        <img src={paypalLogo} alt="PayPal" style={{ maxWidth: '600px' }} />
                    </Button>

                    <Button variant="light" className="payment-method-button" onClick={() => setPaymentMethod('shop')}>
                        <img src={shopLogo} alt="shop" style={{ maxWidth: '600px' }} />
                    </Button>

                    <Button variant="light" className="payment-method-button" onClick={() => setPaymentMethod('ApplePay')}>
                        <img src={applePayLogo} alt="Apple Pay" style={{ maxWidth: '600px' }} />
                    </Button>
                </div>
            </Form.Group>

              {/* "OR" Divider with Lines */}
              <div className="d-flex align-items-center my-4">
                    <div className="flex-grow-1" style={{ height: '1px', backgroundColor: '#ccc' }}></div> {/* Left line */}
                    <span className="mx-2">OR</span> {/* "OR" text */}
                    <div className="flex-grow-1" style={{ height: '1px', backgroundColor: '#ccc' }}></div> {/* Right line */}
                </div>

               
           

            <Card className="mb-3">
                <Card.Body>
                <Card.Title>Credit / Debit Card Payment</Card.Title>
                <Card.Text className="text-muted" style={{ fontSize: '1rem' }}>
                    All transactions are secure and encrypted. Powered by Stripe.
                </Card.Text>
                {/* <div className="mt-4">
                    <Elements stripe={stripePromise}>
                    <CheckoutForm />
                    </Elements>
                </div> */}
                </Card.Body>
            </Card>
            {/* {message ? (
                    <p>{message}</p>
                ) : (
                    <Button onClick={handleCheckout}>Proceed to Payment</Button>
                )} */}

                <section>
                {/* <div className="product">
                    <img
                    src="https://i.imgur.com/EHyR2nP.png"
                    alt="The cover of Stubborn Attachments"
                    />
                    <div className="description">
                    <h3>Stubborn Attachments</h3>
                    <h5>$20.00</h5>
                    </div>
                </div> */}
                <form action="/api/stripe/create-checkout-session" method="POST"> 
                {cartItemsPayload.map((item, index) => (
                <React.Fragment key={item.id}>
                    <input type="hidden" name={`items[${index}][id]`} value={item.id} />
                    <input type="hidden" name={`items[${index}][name]`} value={item.name} />
                    <input type="hidden" name={`items[${index}][amount]`} value={item.amount} />
                    <input type="hidden" name={`items[${index}][currency]`} value={item.currency} />
                    <input type="hidden" name={`items[${index}][quantity]`} value={item.quantity} />
                    <input type="hidden" name={`items[${index}][stripe_id]`} value={item.stripe_id} />
                </React.Fragment>
                ))}
                    <button className="checkout-button" type="submit">
                    Proceed to Payment
                    </button>
                    {/* <button className="checkout-button" onClick={handleCheckout}>
                    Proceed to Payment
                    </button> */}
                </form>
                </section>
            
        </div>
        </div>
        </div>
    );
}

export default CheckoutScreen;
