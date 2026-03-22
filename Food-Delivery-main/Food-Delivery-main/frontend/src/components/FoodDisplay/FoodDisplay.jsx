import React from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ foods = [], category }) => {
  const filtered =
    category === "All" ? foods : foods.filter((f) => f.category === category);

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-list">
        {filtered.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;