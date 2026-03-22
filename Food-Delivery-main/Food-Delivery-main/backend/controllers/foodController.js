import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

// ✅ add food items (now includes restaurantId)
const addFood = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData || userData.role !== "admin") {
      if (req.file?.filename) fs.unlink(`uploads/${req.file.filename}`, () => {});
      return res.json({ success: false, message: "You are not admin" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "Image is required" });
    }

    if (!req.body.restaurantId) {
      fs.unlink(`uploads/${req.file.filename}`, () => {});
      return res.json({ success: false, message: "restaurantId is required" });
    }

    const image_filename = req.file.filename; // ✅ FIX: define it

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
      restaurantId: req.body.restaurantId,
    });

    await food.save();
    return res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

// ✅ list foods (all) - keep for admin / debugging
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    return res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

// ✅ list foods by restaurant
const listFoodByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const foods = await foodModel.find({ restaurantId });
    return res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

// ✅ remove food item
const removeFood = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData || userData.role !== "admin") {
      return res.json({ success: false, message: "You are not admin" });
    }

    const food = await foodModel.findById(req.body.id);
    if (!food) return res.json({ success: false, message: "Food not found" });

    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);

    return res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, listFoodByRestaurant, removeFood };