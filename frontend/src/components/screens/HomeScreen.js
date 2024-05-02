import React, {useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Container,Row,Col} from "react-bootstrap";
import Product from '../Product';
import { listDealsProducts, listProductsYouMayLike,  listLatestProducts} from '../../actions/productAction';
import Loader from '../Loader';
import Message from '../Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function HomeScreen() {
    
    const dispatch = useDispatch();
    
    const [dealspage, dealssetPage] = useState(1);
    const {dealserror, dealsloading, dealsproducts, dealstotalPages} = useSelector(state=>state.dealsproductList);

    const [maylikepage, maylikesetPage] = useState(1);
    const {maylikeerror, maylikeloading, maylikeproducts, mayliketotalPages} = useSelector(state=>state.maylikeproductList);

    const [latestpage, latestsetPage] = useState(1);
    const {latesterror, latestloading, latestproducts, latesttotalPages} = useSelector(state=>state.latestproductList);

      // Add the userLogin part from Redux store to determine if the user is logged in
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(()=>{
        dispatch(listDealsProducts(dealspage));
    },[dispatch, dealspage])
    
    useEffect(()=>{
    if (userInfo && userInfo.accessToken) {
      dispatch(listProductsYouMayLike(maylikepage, userInfo));
    } else {
      console.log('No user info or access token available.');
    }
  }, [dispatch, maylikepage, userInfo]);

    useEffect(()=>{
      dispatch(listLatestProducts(latestpage));
    },[dispatch, latestpage])


    const dealshandlePrevious = () => {
        dealssetPage((prevPage) => Math.max(prevPage - 1, 1));
      };
    
    const dealshandleNext = () => {
      dealssetPage((prevPage) => Math.min(prevPage + 1, dealstotalPages));
    };

    const maylikehandlePrevious = () => {
      maylikesetPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    const maylikehandleNext = () => {
      maylikesetPage((prevPage) => Math.min(prevPage + 1, mayliketotalPages));
    };

    const latesthandlePrevious = () => {
      latestsetPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    const latesthandleNext = () => {
      latestsetPage((prevPage) => Math.min(prevPage + 1, latesttotalPages));
    };

      return (
        <div>
          <h1 className="text-center">DEALS!!!</h1>
        <div className="horizontal-scroll-wrapper">
          <div className={`pagination-control ${dealspage <= 1 ? 'disabled' : ''}`} onClick={dealshandlePrevious}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          {dealsloading ? (
            <Loader />
          ) : dealserror ? (
            <Message variant="danger">{dealserror}</Message>
          ) : (
            dealsproducts.map((product) => {
              return (
                <div key={product.id} className="product-card">
                  <Product product={product} />
                </div>
              );
            })
          )}
          <div className={`pagination-control ${dealspage >= dealstotalPages ? 'disabled' : ''}`} onClick={dealshandleNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>

        {userInfo && ( // Conditionally render this section if userInfo is not null
        <React.Fragment>
        <h1 className="text-center">Product You May Like</h1>
        <div className="horizontal-scroll-wrapper">
          <div className={`pagination-control ${maylikepage <= 1 ? 'disabled' : ''}`} onClick={maylikehandlePrevious}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          {maylikeloading ? (
            <Loader />
          ) : maylikeerror ? (
            <Message variant="danger">{maylikeerror}</Message>
          ) : (
            maylikeproducts.map((product) => (
              <div key={product.id} className="product-card">
                <Product product={product} />
              </div>
            ))
          )}
          <div className={`pagination-control ${maylikepage >= mayliketotalPages ? 'disabled' : ''}`} onClick={maylikehandleNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
        </React.Fragment>)}   

        <h1 className="text-center">Latest Product or (Hottest Product in your region)</h1>
        <div className="horizontal-scroll-wrapper">
          <div className={`pagination-control ${latestpage <= 1 ? 'disabled' : ''}`} onClick={latesthandlePrevious}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          {latestloading ? (
            <Loader />
          ) : latesterror ? (
            <Message variant="danger">{latesterror}</Message>
          ) : (
            latestproducts.map((product) => (
              <div key={product.id} className="product-card">
                <Product product={product} />
              </div>
            ))
          )}
          <div className={`pagination-control ${latestpage >= latesttotalPages ? 'disabled' : ''}`} onClick={latesthandleNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
        </div>
      );

}

export default HomeScreen



