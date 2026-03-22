import restaurantModel from "../models/restaurantModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

// add restaurant
const addRestaurant = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData || userData.role !== "admin") {
      if (req.file?.filename) fs.unlink(`uploads/${req.file.filename}`, () => {});
      return res.json({ success: false, message: "You are not admin" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "Image is required" });
    }

    const restaurant = new restaurantModel({
      name: req.body.name,
      description: req.body.description || "",
      image: req.file.filename,
    });

    await restaurant.save();
    return res.json({ success: true, message: "Restaurant Added" });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error" });
  }
};

// list restaurants
const listRestaurant = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    return res.json({ success: true, data: restaurants });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error" });
  }
};

// remove restaurant
const removeRestaurant = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData || userData.role !== "admin") {
      return res.json({ success: false, message: "You are not admin" });
    }

    const restaurant = await restaurantModel.findById(req.body.id);

    if (!restaurant) {
      return res.json({ success: false, message: "Restaurant not found" });
    }

    fs.unlink(`uploads/${restaurant.image}`, () => {});
    await restaurantModel.findByIdAndDelete(req.body.id);

    return res.json({ success: true, message: "Restaurant Removed" });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error" });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById(req.params.id);

    if (!restaurant) {
      return res.json({ success: false, message: "Restaurant not found" });
    }

    res.json({ success: true, data: restaurant });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// update restaurant image
const updateRestaurantImage = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData || userData.role !== "admin") {
      if (req.file?.filename) fs.unlink(`uploads/${req.file.filename}`, () => {});
      return res.json({ success: false, message: "You are not admin" });
    }

    if (!req.body.id) {
      if (req.file?.filename) fs.unlink(`uploads/${req.file.filename}`, () => {});
      return res.json({ success: false, message: "Restaurant id is required" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "Image is required" });
    }

    const restaurant = await restaurantModel.findById(req.body.id);

    if (!restaurant) {
      fs.unlink(`uploads/${req.file.filename}`, () => {});
      return res.json({ success: false, message: "Restaurant not found" });
    }

    // delete old image
    if (restaurant.image) {
      fs.unlink(`uploads/${restaurant.image}`, () => {});
    }

    restaurant.image = req.file.filename;
    await restaurant.save();

    return res.json({ success: true, message: "Restaurant image updated" });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error updating restaurant image" });
  }
};

export {
  addRestaurant,
  listRestaurant,
  removeRestaurant,
  updateRestaurantImage,
  getRestaurant
};