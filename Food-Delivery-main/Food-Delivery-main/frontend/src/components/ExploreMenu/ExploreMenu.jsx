import React from "react";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory, categories = [], compact = false }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      {!compact && (
        <>
          <h1>Explore our menu</h1>
          <p className="explore-menu-text">
            Choose from a diverse menu featuring a variety of dishes.
          </p>
        </>
      )}

      {compact && <h2 className="explore-menu-compact-title">Categories</h2>}

      <div className="explore-menu-list">
        {categories.map((c) => (
          <div
            key={c}
            className="explore-menu-list-item"
            onClick={() => setCategory(c)}
          >
            <div className={category === c ? "active-circle" : "circle"}>
              {c === "All" ? "All" : c}
            </div>
          </div>
        ))}
      </div>

      {!compact && <hr />}
    </div>
  );
};

export default ExploreMenu;