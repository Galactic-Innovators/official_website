import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../Rating";
import Loader from "../Loader";
import Message from "../Message";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productAction";
import { productDetailsReducers } from "../../reducers/productReducers";
import Product from "../Product";
import Heart from "react-animated-heart";

function ProductScreen({ match, history }) {
  const { id } = useParams();
  const [isClick, setClick] = useState(false);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [cartUuid, setCartUuid] = useState("");
  const [likesUuid, setLikesUuid] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const defaultImage = process.env.PUBLIC_URL + "/images/sample.jpg";
  const maxReviewsDisplay = 2;

  // Function to go back to the previous page
  const goBackHandler = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  // //for recommender
  // useEffect(() => {
  //   dispatch(listProductDetails(id));
  // }, [dispatch, id]);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (!userInfo) {
        console.log("User is not logged in");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `JWT ${userInfo.accessToken}`,
          },
        };
        const { data } = await axios.get("/store/customers/", config);
        const customerDetails = data.find(
          (customer) => customer.user_id === userInfo.id
        ); // Assuming userInfo.id holds the user ID
        if (customerDetails && customerDetails.cart_id) {
          setCartUuid(customerDetails.cart_id);
        } else {
        }
        if (customerDetails && customerDetails.likes_id) {
          setLikesUuid(customerDetails.likes_id);
          const wishlistData = await axios.get(
            `/store/likes/${customerDetails.likes_id}/items/`,
            config
          );
          const isProductInWishlist = wishlistData.data.some(
            (item) => item.product.id === product.id
          );

          setClick(isProductInWishlist);
          console.log(isProductInWishlist);
        } else {
        }
      } catch (error) {}
    };

    fetchCustomerDetails();
  }, [userInfo]);

  const addToCartHandler = async () => {
    if (!userInfo) {
      history.push("/login");
      return;
    }
    try {
      let currentCartId = cartUuid; // Assuming this state holds the current user's cart ID

      // If the user does not have a cart ID, create a new cart
      if (!currentCartId) {
        const config = {
          headers: {
            Authorization: `JWT ${userInfo.accessToken}`,
          },
        };
        const { data } = await axios.post("/store/carts/", {}, config);
        currentCartId = data.id; // Assuming the response includes the cart ID

        // Optionally, update the cartUuid state or redux store with the new cart ID
      }

      // Add the product to the cart
      if (currentCartId) {
        const config = {
          headers: {
            Authorization: `JWT ${userInfo.accessToken}`,
          },
        };

        const postData = {
          product_id: id, // id from useParams()
          quantity: qty,
        };

        // console.log(currentCartId,"with id");
        await axios.post(
          `/store/carts/${currentCartId}/items/`,
          postData,
          config
        );

        // Redirect to cart page or show success message
        history.push("/cart");
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      // Handle error, e.g., show error message
    }
  };

  const toggleLikesHandler = async () => {
    if (!userInfo) {
      history.push("/login");
      return;
    }
    try {
      let currentLikesId = likesUuid;
      // Ensure the user has a likes ID
      if (!currentLikesId) {
        const config = {
          headers: {
            Authorization: `JWT ${userInfo.accessToken}`,
          },
        };
        const { data } = await axios.post("/store/likes/", {}, config);
        currentLikesId = data.id;
        setLikesUuid(currentLikesId);
      }

      const config = {
        headers: {
          Authorization: `JWT ${userInfo.accessToken}`,
        },
      };
      // Fetch current wishlist items
      const { data: wishlist } = await axios.get(
        `/store/likes/${currentLikesId}`,
        config
      );
      const itemInWishlist = wishlist.items.find(
        (item) => item.product.id === product.id
      );
      if (itemInWishlist) {
        // If the product is already in the wishlist, remove it
        await axios.delete(
          `/store/likes/${currentLikesId}/items/${itemInWishlist.id}`,
          config
        );
        setClick(false); // Update the heart to show it is not clicked
      } else {
        // If the product is not in the wishlist, add it
        const postData = {
          product_id: product.id,
        };
        await axios.post(
          `/store/likes/${currentLikesId}/items/`,
          postData,
          config
        );
        setClick(true); // Update the heart to show it is clicked
      }
    } catch (error) {
      history.push("/login");
      console.error("Failed to toggle item in wishlist:", error);
    }
  };

  return (
    <div>
      <button className="btn btn-dark my-3" onClick={goBackHandler}>
        Go Back
      </button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error} </Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              {product.images && product.images.length > 0 ? (
                <Carousel>
                  {product.images.map((image) => (
                    <Carousel.Item key={image.id}>
                      <img
                        className="d-block w-100"
                        src={process.env.PUBLIC_URL + image.image}
                        alt="Product image"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <img
                  src={defaultImage}
                  alt="Default product"
                  className="img-fluid"
                />
              )}
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div style={{ position: "relative" }}>
                    <h3>{product.title}</h3>
                    <div
                      style={{
                        position: "absolute",
                        top: "-40px",
                        right: "-55px",
                      }}
                    >
                      <Heart
                        isClick={isClick}
                        onClick={() => {
                          toggleLikesHandler();
                        }}
                      />
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.average_rating}
                    text={`${product.total_reviews} reviews`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.unit_price}</ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.unit_price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.inventory > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.inventory > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.inventory).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      disabled={product.inventory === 0}
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <div className="mt-5">
            <h3>Reviews</h3>
            {product.reviews && product.reviews.length > 0 ? (
              <ListGroup variant="flush">
                {/* limit the number of reviews displayed, in descending order of date */}
                {product.reviews
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, maxReviewsDisplay)
                  .map((review) => {
                    // console.log(review);
                    return (
                      <ListGroup.Item key={review.id}>
                        {/* <strong>{review.name}</strong> */}
                        <Rating value={review.rating} />
                        <p>{review.date}</p>
                        <p className="review-description">
                          {review.description}
                        </p>
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            ) : (
              <Message>No reviews yet</Message>
            )}
          </div>

          {/* for recommender */}
          <div className="mt-5">
            <h3>Similar products you may like</h3>
            <div className="horizontal-scroll-wrapper">
              {product.recommended_products &&
                product.recommended_products.map((recommendedProduct) => (
                  <div key={recommendedProduct.id} className="product-card m-2">
                    {recommendedProduct.images &&
                    recommendedProduct.images.length > 0 ? (
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          recommendedProduct.images[0].image
                        }
                        alt={recommendedProduct.title}
                        className="img-fluid"
                      />
                    ) : (
                      <img
                        src={defaultImage}
                        alt="Default product"
                        className="img-fluid"
                      />
                    )}
                    <div className="product-info">
                      <h3 className="product-subtitle">
                        {recommendedProduct.title}
                      </h3>
                      <p className="product-description">
                        {recommendedProduct.description}
                      </p>
                      <Button
                        variant="primary"
                        onClick={() =>
                          history.push(`/products/${recommendedProduct.id}`)
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  // <Card key={recommendedProduct.id} className="m-2" style={{ width: "20rem" }}>
                  //   <Card.Img variant="top" src={recommendedProduct.image} />
                  //   <Card.Body>
                  //     <Card.Title style={{ fontSize: "1rem",width: "10rem" , marginBottom: "0.5rem" , overflowWrap: "break-word"}}>
                  //       {recommendedProduct.title} </Card.Title>
                  //     <Card.Text style={{ width: "10rem" , overflowWrap : "break-word"}}>{recommendedProduct.description.length > 15?
                  //       recommendedProduct.description.substring(0, 15) + "...": recommendedProduct.description }</Card.Text>
                  //     <Button variant="primary" onClick={() => history.push(`/products/${recommendedProduct.id}`)}>View Details</Button>
                  //   </Card.Body>
                  // </Card>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductScreen;
