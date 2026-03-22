import React, { useState, useContext, useEffect } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const { url, token, admin } = useContext(StoreContext);

  const [image, setImage] = useState(false);

  // ✅ Restaurants dropdown
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Biryani",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ fetch restaurants for dropdown
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`${url}/api/restaurant/list`);
        if (res.data.success) {
          setRestaurants(res.data.data);

          // auto select first restaurant
          if (res.data.data.length > 0) {
            setRestaurantId(res.data.data[0]._id);
          }
        } else {
          toast.error("Failed to load restaurants");
        }
      } catch (err) {
        console.log(err);
        toast.error("Error loading restaurants");
      }
    };

    if (token && admin) fetchRestaurants();
  }, [url, token, admin]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!token || !admin) {
      toast.error("Admin login required");
      navigate("/");
      return;
    }

    if (!restaurantId) {
      toast.error("Please select a restaurant");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("restaurantId", restaurantId); // ✅ REQUIRED NOW
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Biryani",
        });
        setImage(false);
        toast.success(response.data.message || "Item added");
      } else {
        toast.error(response.data.message || "Failed to add item");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error while adding item");
    }
  };

  useEffect(() => {
    if (!token || !admin) {
      toast.error("Please login as admin");
      navigate("/");
    }
  }, [token, admin, navigate]);

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* ✅ Restaurant dropdown */}
        <div className="add-product-name flex-col">
          <p>Select restaurant</p>
          <select
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            required
          >
            {restaurants.length === 0 ? (
              <option value="">No restaurants found</option>
            ) : (
              restaurants.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="add-product-name flex-col">
          <p>Food name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Food description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Food category</p>
            <select
              name="category"
              required
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="Biryani">Biryani</option>
              <option value="Veg Curries">Veg Curries</option>
              <option value="Non-Veg Curries">Non-Veg Curries</option>
              <option value="Salad">Salad</option>
              <option value="Desserts">Desserts</option>
              <option value="Ice Cream">Ice Cream</option>
              <option value="Juice">Juice</option>
              <option value="Milkshake">Milkshake</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Food price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹20"
              required
              min="0"
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;