import React from 'react';
import "./RefundPolicyScreen.css";
const RefundPolicyScreen = () => {
    return (
        <div className='refund-policy-container'>
        <h1 style={{ textAlign: "center" }}>Refund Policy</h1>
        <h4 style={{ textAlign: "left" }}>No refunds or exchanges</h4>
        <p style={{ textAlign: "left" }}>
        Due to each item being made to order, we are unable to process returns of exchanges for any prop, figure or custom 3D prints after shipping. If you do have a problem with your order, please contact us right away and we will do everything to make things right.
        </p>
        <h4 style={{ textAlign: "left" }}>Damages and issues</h4>
        <p style={{ textAlign: "left" }}>
        Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
        </p>
        <h4 style={{ textAlign: "left" }}>Cancellations and refunds</h4>
        <p style={{ textAlign: "left" }}>
        If you would like to cancel and refund an order before it has gone into production we would be more than happy to do so. Orders that have gone into production cannot be cancelled and refunded.  If you do have a problem with your order, please contact us right away and we will do everything to make things right
        </p>
        </div>
    );
};

export default RefundPolicyScreen;