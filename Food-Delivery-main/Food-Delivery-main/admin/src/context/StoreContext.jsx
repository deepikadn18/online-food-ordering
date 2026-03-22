import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  const url = "http://localhost:4000";

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        toast.error("Products not fetching");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error while fetching products");
    }
  };

  const loadCartData = async (tokenValue) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token: tokenValue } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );

        if (!response.data.success) {
          toast.error("Something went wrong");
        }
      } catch (err) {
        console.log(err);
        toast.error("Server error");
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );

        if (!response.data.success) {
          toast.error("Something went wrong");
        }
      } catch (err) {
        console.log(err);
        toast.error("Server error");
      }
    }
  };

  const clearCart = async () => {
    setCartItems({});

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/clear",
          {},
          { headers: { token } }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const qty = cartItems[itemId];
      if (qty > 0) {
        const itemInfo = food_list.find((p) => p._id === itemId);
        if (!itemInfo) continue;
        totalAmount += itemInfo.price * qty;
      }
    }

    return totalAmount;
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();

      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    };

    loadData();
  }, []);

  const contextValue = {
    food_list,
    setFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;