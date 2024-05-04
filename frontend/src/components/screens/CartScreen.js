import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../Message'
import { addToCart,removeFromCart, fetchCartDetails } from '../../actions/cartActions'
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    // const [cartUuid, setCartUuid] = useState('');
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    // console.log("User Info",userInfo);
    const cart = useSelector(state => state.cart)
    //const { cartItems } = cart
    const cartItems = useSelector(state => state.cart.cartItems);
    console.log("cart", cart);
    console.log("cartItem", cartItems);
    const stripePromise = loadStripe('pk_test_kbqUrvH0YXB7wc9EHEO6e9dP00Ox2h6G5M');

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
                // console.log("Getting /store/customers/ with key", `JWT ${userInfo.accessToken}`);
                const { data } = await axios.get('/store/customers/', config);
                // Assuming the response includes the cart_id directly
                const customerCartId = data.find(customer => customer.user_id === userInfo.id).cart_id;
                // console.log("cartID:", customerCartId);
                if (customerCartId) {
                    dispatch(fetchCartDetails(customerCartId));
                }
            } catch (error) {
                console.error('Failed to fetch customer cart ID:', error);
            }
        };

        fetchCustomerCartId();
    }, [userInfo, history, dispatch]);

    const cartItemsPayload = cartItems.map(item => ({
        name: item.name,
        amount: item.unit_price * 100, // Convert price to cents
        currency: "cad",
        quantity: item.qty,
        stripe_id: item.stripe_id, // Use a default image if no image is available
    }));
    console.log(cartItemsPayload);       

    useEffect(() => {
        if (productId && cart.cartId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty, cart.cartId]);

    const removeFromCartHandler = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=payments')
    }

    const defaultImage = process.env.PUBLIC_URL + '/images/sample.jpg';
    return (
        <Row className="justify-content-center">
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item =>{
                                console.log(item);
                                return (
                                <ListGroup.Item key={item.id}>
                                    <Row className="align-items-center">
                                    <Row>
                                        <Col md={2} className="d-flex align-items-center justify-content-center">
                                        <Image src={item.images && item.images.length > 0 ? item.images[0].image : defaultImage} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3} className="d-flex align-items-center">
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={2} className="d-flex align-items-center justify-content-center">
                                            ${item.unit_price}
                                        </Col>

                                        <Col md={2} className="d-flex align-items-center justify-content-center">
                                             <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >

                                            {/* <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(updateCartItemQuantity(cart.cartId, item.product, Number(e.target.value)))}
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control> */}

                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                                </option>
                                            ))}
                                            </Form.Control>
                                        </Col>
                                        
                                        <Col md={2} className="d-flex align-items-center justify-content-center"> {/* New Column for Total Price */}
                                        ${item.total_price ? item.total_price.toFixed(2) : '0.00'}
                                        </Col>
                                        

                                        <Col md={1} className="d-flex align-items-center justify-content-center">
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            )}
                        </ListGroup>
                    )}
            </Col>

            <Col md={4}>
            <Card className="mx-auto" style={{ width: 'auto' }}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h2>Summary</h2>
                        {/* Subtotal */}
                        <div>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items): 
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.unit_price, 0).toFixed(2)}
                        </div>
                        {/* GST/HST Calculation */}
                        <div>GST/HST Estimated: 
                            ${(
                                0.13 * cartItems.reduce((acc, item) => acc + item.qty * item.unit_price, 0)
                            ).toFixed(2)}
                        </div>
                        {/* Final Price */}
                        <div>Total: 
                            ${(
                                1.13 * cartItems.reduce((acc, item) => acc + item.qty * item.unit_price, 0)
                            ).toFixed(2)}
                        </div>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        {/* <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                         */}
                         <form action="/api/stripe/create-checkout-session" method="POST"> 
                        {cartItemsPayload.map((item, index) => (
                        <React.Fragment key={item.id}>
                            {/* <input type="hidden" name={`items[${index}][id]`} value={item.id} />
                            <input type="hidden" name={`items[${index}][name]`} value={item.name} />
                            <input type="hidden" name={`items[${index}][amount]`} value={item.amount} />
                            <input type="hidden" name={`items[${index}][currency]`} value={item.currency} /> */}
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
                    </ListGroup.Item>


                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
