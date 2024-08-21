import React from "react";
import { Container } from "react-bootstrap";
import "./MaintenanceScreen.css";

function MaintenanceScreen() {
    const Web_Development_GIF = process.env.PUBLIC_URL + '/images/MaintenanceScreen/Web_GIF.gif';
    const Tomorrow_GIF = process.env.PUBLIC_URL + '/images/MaintenanceScreen/Tomorrow_GIF.gif';
    return (
        <Container className="maintenance-container">
            <h1 className="maintenance-heading fade-in">We'll be back.</h1>
            <img 
                src = {Web_Development_GIF}
                alt="Working hard" 
                className="maintenance-gif fade-in"
                style={{ animationDelay: "0.5s" , width: "70%" }}
            />
            <h2 className="maintenance-subheading fade-in" style={{ animationDelay: "1s" }}>
                GIGs is updating the website.
            </h2>
            <img 
                src={Tomorrow_GIF}
                alt="Update in progress" 
                className="maintenance-gif fade-in"
                style={{ animationDelay: "1.5s", width: "40%" }}
            />
            <p className="maintenance-text fade-in" style={{ animationDelay: "2s" }}>
                Please check back soon.
            </p>
        </Container>
    );
}

export default MaintenanceScreen;