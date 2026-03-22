import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // stored filename from uploads
  description: { type: String, default: "" },
});

const restaurantModel =
  mongoose.models.restaurant || mongoose.model("restaurant", restaurantSchema);

export default restaurantModel;