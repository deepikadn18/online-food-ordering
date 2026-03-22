import React, { useEffect } from "react";
import "./Success.css";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/myorders");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>Order Placed Successfully</h1>
        <p>Your food is being prepared.</p>
        <p>Estimated delivery: 30 minutes</p>

        <div className="success-buttons">
          <button onClick={() => navigate("/myorders")}>Track Order</button>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Success;