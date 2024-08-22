import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faWeixin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileContract, faShieldAlt, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import "./Footer.css";

function Footer() {
  const wechatQRCode = process.env.PUBLIC_URL + "/images/wechat_qr_code.jpg";
  const [showWeChatPopup, setShowWeChatPopup] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleWeChatClick = (e) => {
    e.preventDefault();
    if (!showWeChatPopup) {
      setPopupVisible(true);
      setShowWeChatPopup(true);
    } else {
      setShowWeChatPopup(false);
      setTimeout(() => setPopupVisible(false), 1); // Match the fade-out duration
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.wechat-popup') && !event.target.closest('.wechat-icon')) {
      setShowWeChatPopup(false);
      setTimeout(() => setPopupVisible(false), 1); // Match the fade-out duration
    }
  };

  useEffect(() => {
    if (showWeChatPopup) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showWeChatPopup]);

  return (
    <footer className="footer">
      <Container>
        <Row className="my-3">
          <hr style={{ color: 'white', backgroundColor: 'white', height: 2, marginTop: '1.5vh'}} />
        </Row>
        <Row className="align-items-center justify-content-between">
          <Col md="auto">
            <h5 style={{ color: 'grey' }} className="h5">Quick Link</h5>
            <a href="/privacy-policy">
              <FontAwesomeIcon icon={faShieldAlt} className="mx-1" />
              Privacy Policy
            </a>
            <span className="mx-1">|</span>
            <a href="/terms-of-service">
              <FontAwesomeIcon icon={faFileContract} className="mx-1" />
              Terms of Service
            </a>
            <span className="mx-1">|</span>
            <a href="/refund-policy">
              <FontAwesomeIcon icon={faShippingFast} className="mx-1" />
              Refund Policy
            </a>
          </Col>
          <Col md="auto">
            <h5 style={{ color: 'grey' }} className="h5">Support</h5>
            <a href="mailto:info@gigofficial.com" style={{ display: 'inline-block', width: '100%' }}>
              <FontAwesomeIcon icon={faEnvelope} size="lg" className="mx-1" />
              <p style={{ display: 'inline' }}>info@gigofficial.com</p>
            </a>
          </Col>
          <Col md="auto">
            <h5 style={{ color: 'grey' }} className="h5">Social Media</h5>
            <a href="https://www.instagram.com/galactic_innovators?igsh=NzZua2thNm85Y3Q0">
              <FontAwesomeIcon icon={faInstagram} size="lg" className="footer-icon" />
            </a>
            <div className="wechat-icon-wrapper" style={{ display: 'inline-block', position: 'relative' }}>
              <a href="/aboutus" className="wechat-icon" onClick={handleWeChatClick}>
                <FontAwesomeIcon icon={faWeixin} size="lg" className="footer-icon" />
              </a>
              {popupVisible && (
                <div className={`wechat-popup-overlay ${showWeChatPopup ? 'fade-in' : 'fade-out'}`}>
                  <div className="wechat-popup-content">
                    <img src={wechatQRCode} alt="WeChat QR Code" className="wechat-qr-code"/>
                  </div>
                  <div className="wechat-arrow"></div>
                </div>
              )}
            </div>
            <a href="/aboutus">
              <FontAwesomeIcon icon={faTiktok} size="lg" className="footer-icon" />
            </a>
          </Col>
        </Row>
        <Row className="my-3">
          <hr style={{ color: 'white', backgroundColor: 'white', height: 2, marginTop: '1.5vh'}} />
        </Row>
        <Row className="text-center">
          <Col>
            © 2024 Galactic Innovators Group | All Rights Reserved
          </Col>
        </Row>
        <div className="extra-space"></div>
      </Container>
    </footer>
  );
}

export default Footer;