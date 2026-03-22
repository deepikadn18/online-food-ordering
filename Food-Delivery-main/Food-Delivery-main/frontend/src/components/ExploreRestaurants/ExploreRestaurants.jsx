import React, { useContext } from "react";
import "./ExploreRestaurants.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const ExploreRestaurants = ({ restaurants }) => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  return (
    <div className="explore-restaurants">
      <h2>Explore Restaurants</h2>

      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="restaurant-card"
            onClick={() => navigate(`/restaurant/${restaurant._id}`)}
          >
            <img
              src={`${url}/images/${restaurant.image}`}
              alt={restaurant.name}
            />

            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreRestaurants;