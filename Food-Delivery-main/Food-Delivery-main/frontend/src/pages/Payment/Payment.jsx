import React, { useContext, useState } from "react";
import "./Payment.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = () => {
  const { getTotalCartAmount, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  const address = JSON.parse(localStorage.getItem("deliveryAddress")) || {};
  const total = getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2;

  const handlePayment = async () => {
    try {
      if (getTotalCartAmount() === 0) {
        toast.error("Cart is empty");
        navigate("/cart");
        return;
      }

      if (!address.firstName || !address.phone) {
        toast.error("Please fill delivery information first");
        navigate("/order");
        return;
      }

      await clearCart();
      localStorage.removeItem("deliveryAddress");

      if (method === "cod") {
        toast.success("Order placed successfully");
      } else if (method === "upi") {
        toast.success("UPI payment successful");
      } else {
        toast.success("Card payment successful");
      }

      navigate("/success");
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment</h1>

      <div className="payment-container">
        <div className="payment-left">
          <h2>Delivery Details</h2>
          <p>
            <strong>Name:</strong> {address.firstName} {address.lastName}
          </p>
          <p>
            <strong>Email:</strong> {address.email}
          </p>
          <p>
            <strong>Address:</strong> {address.street}, {address.city}, {address.state}, {address.zipcode}, {address.country}
          </p>
          <p>
            <strong>Phone:</strong> {address.phone}
          </p>
        </div>

        <div className="payment-right">
          <h2>Select Payment Method</h2>

          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={method === "cod"}
              onChange={(e) => setMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={method === "upi"}
              onChange={(e) => setMethod(e.target.value)}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={method === "card"}
              onChange={(e) => setMethod(e.target.value)}
            />
            Credit / Debit Card
          </label>

          <div className="payment-total">
            <p>Total Amount</p>
            <h3>₹{total}</h3>
          </div>

          <button type="button" onClick={handlePayment}>
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;