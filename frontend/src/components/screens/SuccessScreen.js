
import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessScreen = () => {
    // Extract the session ID from the URL if needed for verification or display
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get('session_id');

    return (
        <div className="success-screen">
            <h1 style={{ fontSize: '60px' }}>Thanks for your order!</h1>
            <p style={{ fontSize: '24px' }}>We appreciate your business. If you have any questions, please email <a href="mailto:support@gigoffical.com">support@gigoffical.com</a>.</p>
            {/* Optionally display the session ID or other transaction details */}
            {sessionId && <p>Your session ID: {sessionId}</p>}
        </div>
    );
};

export default SuccessScreen;
