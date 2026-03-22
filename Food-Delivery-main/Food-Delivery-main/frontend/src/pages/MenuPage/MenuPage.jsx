import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { StoreContext } from "../../context/StoreContext";
import { getCategoriesFromFoods } from "../../utils/categories";
import "./MenuPage.css";

const MenuPage = () => {
  const { url } = useContext(StoreContext);
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${url}/api/food/list`);

        if (response.data.success) {
          setFoods(response.data.data);
        } else {
          setError("Failed to load food items");
        }
      } catch (err) {
        console.log("FETCH ERROR:", err);
        setError("Server not reachable or API failed");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [url]);

  const categories = getCategoriesFromFoods(foods);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesCategory =
        category === "All" || food.category === category;

      const q = searchQuery.toLowerCase().trim();

      const matchesSearch =
        q === "" ||
        food.name.toLowerCase().includes(q) ||
        food.description.toLowerCase().includes(q) ||
        food.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [foods, category, searchQuery]);

  return (
    <div className="menu-page">
      {loading && <p className="menu-status">Loading menu...</p>}
      {error && <p className="menu-status error">{error}</p>}

      {!loading && !error && (
        <>
          <ExploreMenu
            category={category}
            setCategory={setCategory}
            categories={categories}
          />

          <div className="menu-results-bar">
            <div>
              <h2>
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : category === "All"
                  ? "All dishes"
                  : `${category} dishes`}
              </h2>
              <p>{filteredFoods.length} item(s) found</p>
            </div>
          </div>

          {filteredFoods.length === 0 ? (
            <div className="menu-empty-state">
              <h3>No dishes found</h3>
              <p>Try another search term or choose a different category.</p>
            </div>
          ) : (
            <FoodDisplay
            foods={filteredFoods}
            category="All"
            title={
            searchQuery
            ? `Search results`
            : category === "All"
            ? "All dishes"
            : `${category} dishes`
            }
          />
          )}
        </>
      )}
    </div>
  );
};

export default MenuPage;