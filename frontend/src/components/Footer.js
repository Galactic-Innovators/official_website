import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLine, faMailchimp, faTiktok, faWeixin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileContract, faMailBulk, faShieldAlt, faShippingFast, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import "./index.css";

function Footer() {
  const wechatQRCode = process.env.PUBLIC_URL + "/images/wechat_qr_code.jpg";
  console.log(wechatQRCode);
  const [showWeChatPopup, setShowWeChatPopup] = useState(false);

  const handleWeChatClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setShowWeChatPopup(!showWeChatPopup);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.wechat-popup') && !event.target.closest('.wechat-icon')) {
      setShowWeChatPopup(false);
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
    <footer className="footer mt-auto py-4" style={{ backgroundColor: "#07072b", color: "grey" }}>
      <Container>
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
            <a href="/return-policy">
              <FontAwesomeIcon icon={faShippingFast} className="mx-1" />
              Refund Policy
            </a>
        </Col>

        <Col md="auto">
        <h5 style={{ color: 'grey' }} className="h5">Social Media</h5>
            <a href="https://www.instagram.com/galatic_innovators?igsh=aHo0ZGZ2MHJiZG5p">
              <FontAwesomeIcon icon={faInstagram} size="lg" className="footer-icon" />
            </a>
            <div className="wechat-icon-wrapper" style={{ display: 'inline-block', position: 'relative' }}>
              <a href="/aboutus" className="wechat-icon" onClick={handleWeChatClick}>
                <FontAwesomeIcon icon={faWeixin} size="lg" className="footer-icon" />
              </a>
              {showWeChatPopup && (
                <div className="wechat-popup">
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
            <a href="/aboutus">
              <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M22.405 9.879c.002.016.01.02.07.019h.725a.797.797 0 0 0 .78-.972a.794.794 0 0 0-.884-.618a.795.795 0 0 0-.692.794c0 .101-.002.666.001.777m-11.509 4.808c-.203.001-1.353.004-1.685.003a2.5 2.5 0 0 1-.766-.126a.025.025 0 0 0-.03.014L7.7 16.127a.025.025 0 0 0 .01.032c.111.06.336.124.495.124c.66.01 1.32.002 1.981 0q.017 0 .023-.015l.712-1.545a.025.025 0 0 0-.024-.036zM.477 9.91c-.071 0-.076.002-.076.01l-.01.08c-.027.397-.038.495-.234 3.06c-.012.24-.034.389-.135.607c-.026.057-.033.042.003.112c.046.092.681 1.523.787 1.74c.008.015.011.02.017.02c.008 0 .033-.026.047-.044q.219-.282.371-.606c.306-.635.44-1.325.486-1.706c.014-.11.021-.22.03-.33l.204-2.616l.022-.293c.003-.029 0-.033-.03-.034zm7.203 3.757a1.4 1.4 0 0 1-.135-.607c-.004-.084-.031-.39-.235-3.06a.4.4 0 0 0-.01-.082c-.004-.011-.052-.008-.076-.008h-1.48c-.03.001-.034.005-.03.034l.021.293q.114 1.473.233 2.946c.05.4.186 1.085.487 1.706c.103.215.223.419.37.606c.015.018.037.051.048.049c.02-.003.742-1.642.804-1.765c.036-.07.03-.055.003-.112m3.861-.913h-.872a.126.126 0 0 1-.116-.178l1.178-2.625a.025.025 0 0 0-.023-.035l-1.318-.003a.148.148 0 0 1-.135-.21l.876-1.954a.025.025 0 0 0-.023-.035h-1.56q-.017 0-.024.015l-.926 2.068c-.085.169-.314.634-.399.938a.5.5 0 0 0-.02.191a.46.46 0 0 0 .23.378a1 1 0 0 0 .46.119h.59c.041 0-.688 1.482-.834 1.972a.5.5 0 0 0-.023.172a.47.47 0 0 0 .23.398c.15.092.342.12.475.12l1.66-.001q.017 0 .023-.015l.575-1.28a.025.025 0 0 0-.024-.035m-6.93-4.937H3.1a.032.032 0 0 0-.034.033c0 1.048-.01 2.795-.01 6.829c0 .288-.269.262-.28.262h-.74c-.04.001-.044.004-.04.047c.001.037.465 1.064.555 1.263c.01.02.03.033.051.033c.157.003.767.009.938-.014c.153-.02.3-.06.438-.132c.3-.156.49-.419.595-.765c.052-.172.075-.353.075-.533q.003-3.495-.007-6.991a.03.03 0 0 0-.032-.032zm11.784 6.896q-.002-.02-.024-.022h-1.465c-.048-.001-.049-.002-.05-.049v-4.66c0-.072-.005-.07.07-.07h.863c.08 0 .075.004.075-.074V8.393c0-.082.006-.076-.08-.076h-3.5c-.064 0-.075-.006-.075.073v1.445c0 .083-.006.077.08.077h.854c.075 0 .07-.004.07.07v4.624c0 .095.008.084-.085.084c-.37 0-1.11-.002-1.304 0c-.048.001-.06.03-.06.03l-.697 1.519s-.014.025-.008.036s.013.008.058.008q2.622.003 5.243.002c.03-.001.034-.006.035-.033zm4.177-3.43q0 .021-.02.024c-.346.006-.692.004-1.037.004q-.021-.003-.022-.024q-.006-.651-.01-1.303c0-.072-.006-.071.07-.07l.733-.003c.041 0 .081.002.12.015c.093.025.16.107.165.204c.006.431.002 1.153.001 1.153m2.67.244a1.95 1.95 0 0 0-.883-.222h-.18c-.04-.001-.04-.003-.042-.04V10.21q.001-.198-.025-.394a1.8 1.8 0 0 0-.153-.53a1.53 1.53 0 0 0-.677-.71a2.2 2.2 0 0 0-1-.258c-.153-.003-.567 0-.72 0c-.07 0-.068.004-.068-.065V7.76c0-.031-.01-.041-.046-.039H17.93s-.016 0-.023.007q-.008.008-.008.023v.546c-.008.036-.057.015-.082.022h-.95c-.022.002-.028.008-.03.032v1.481c0 .09-.004.082.082.082h.913c.082 0 .072.128.072.128v1.148s.003.117-.06.117h-1.482c-.068 0-.06.082-.06.082v1.445s-.01.068.064.068h1.457c.082 0 .076-.006.076.079v3.225c0 .088-.007.081.082.081h1.43c.09 0 .082.007.082-.08v-3.27c0-.029.006-.035.033-.035l2.323-.003a.7.7 0 0 1 .28.061a.46.46 0 0 1 .274.407c.008.395.003.79.003 1.185c0 .259-.107.367-.33.367h-1.218c-.023.002-.029.008-.028.033q.276.655.57 1.303a.05.05 0 0 0 .04.026c.17.005.34.002.51.003c.15-.002.517.004.666-.01a2 2 0 0 0 .408-.075c.59-.18.975-.698.976-1.313v-1.981q.001-.191-.034-.38c0 .078-.029-.641-.724-.998"></path></svg>            
            </a>
        </Col>


        <Col md="auto">
        <h5 style={{ color: 'grey' }} className="h5">Support</h5>
        <a href="mailto:info@gigofficial.com" style={{ display: 'inline-block', width: '100%' }}> {/* Ensures the link takes the full width of the column */}
            <FontAwesomeIcon icon={faEnvelope} size="lg" className="mx-1" />
            <p style={{ display: 'inline' }}>info@gigofficial.com</p>
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