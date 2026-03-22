import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import axios from "axios";

import Header from "../../components/Header/Header";
import ExploreRestaurants from "../../components/ExploreRestaurants/ExploreRestaurants";
import { StoreContext } from "../../context/StoreContext";

const Home = () => {
  const { url } = useContext(StoreContext);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`${url}/api/restaurant/list`);
        if (res.data.success) {
          setRestaurants(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRestaurants();
  }, [url]);

  return (
    <div>
      <Header />
      <ExploreRestaurants restaurants={restaurants} />
    </div>
  );
};

export default Home;