import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link, useParams, useHistory } from "react-router-dom";
import Heart from "react-animated-heart";
import axios from "axios";

function Product({ product }) {
  const [isClick, setClick] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { id } = useParams();
  const history = useHistory();
  const [cartUuid, setCartUuid] = useState("");
  const [qty, setQty] = useState(1);
  const [likesUuid, setLikesUuid] = useState("");
  const defaultImage = process.env.PUBLIC_URL + "/images/sample.jpg";
  // console.log(product);

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
          // console.log("Cart ID fetched:", customerDetails.cart_id);
        } else {
          // console.log("No cart ID found for the current user.");
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
          // console.log("Likes ID fetched:", customerDetails.likes_id);
        } else {
          // console.log("No likes ID found for the current user.");
        }
      } catch (error) {}
    };

    fetchCustomerDetails();
  }, [userInfo, product.id]);

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
    <Card classname="my-3 p-3 rounded">
      <div style={{ position: "relative" }}>
        <Link to={`/products/${product.id}`}>
          <Card.Img
            src={
              product.images && product.images.length > 0
                ? product.images[0].image
                : defaultImage
            }
            variant="top"
          />
        </Link>
        <div style={{ position: "absolute", top: "-30px", right: "-30px" }}>
          <Heart
            isClick={isClick}
            onClick={() => {
              toggleLikesHandler();
            }}
          />
        </div>
      </div>
      <Card.Body>
        <Link to={`/products/${product.id}`}>
          <Card.Title as="div">
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            {product.average_rating} from {product.total_reviews} reviews
          </div>
        </Card.Text>

        <Card.Text as="h3">{product.unit_price}</Card.Text>

        <Rating
          value={product.average_rating}
          text={` ${product.total_reviews} reviews`}
          color={"#f8e825"}
        />
      </Card.Body>
    </Card>
  );
}

export default Product;
