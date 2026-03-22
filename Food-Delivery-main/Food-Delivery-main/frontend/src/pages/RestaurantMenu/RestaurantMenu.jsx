import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import Header from "../../components/Header/Header";
import { getCategoriesFromFoods } from "../../utils/categories";
import "./RestaurantMenu.css";

const RestaurantMenu = () => {
  const { url } = useContext(StoreContext);
  const { id } = useParams();

  const [category, setCategory] = useState("All");
  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantAndFoods = async () => {
      try {
        const r = await axios.get(`${url}/api/restaurant/${id}`);
        if (r.data.success) {
          setRestaurant(r.data.data);
        }

        const f = await axios.get(`${url}/api/food/list/${id}`);
        if (f.data.success) {
          setFoods(f.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchRestaurantAndFoods();
    setCategory("All");
  }, [id, url]);

  const categories = getCategoriesFromFoods(foods);

  return (
    <div>
      <Header />

      <div style={{ padding: "20px 0" }}>
        {restaurant && (
          <div className="restaurant-banner">
            <img src={url + "/images/" + restaurant.image} alt={restaurant.name} />
            <div className="restaurant-banner-info">
              <h1>{restaurant.name}</h1>
              <p>{restaurant.description}</p>
            </div>
          </div>
        )}

        <ExploreMenu
          category={category}
          setCategory={setCategory}
          categories={categories}
          compact={false}
        />

        <FoodDisplay foods={foods} category={category} />
      </div>
    </div>
  );
};

export default RestaurantMenu;