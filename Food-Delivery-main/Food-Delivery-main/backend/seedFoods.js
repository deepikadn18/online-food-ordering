import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";

dotenv.config();

const foods = [
  {
    name: "Chicken Dum Biryani",
    description: "Hyderabadi dum biryani",
    price: 220,
    category: "Biryani",
    restaurantId: new mongoose.Types.ObjectId("69a4654d99ced64186a77347"),
    image: "biryani.png"
  },
  {
    name: "Paneer Butter Masala",
    description: "Creamy paneer curry",
    price: 180,
    category: "Veg Curries",
    restaurantId: new mongoose.Types.ObjectId("69a4654d99ced64186a77347"),
    image: "paneer.png"
  },
  {
    name: "Mango Milkshake",
    description: "Fresh mango shake",
    price: 120,
    category: "Milkshake",
    restaurantId: new mongoose.Types.ObjectId("69a4654d99ced64186a77347"),
    image: "milkshake.png"
  },
  {
    name: "Mutton Biryani",
    description: "Spicy mutton biryani",
    price: 260,
    category: "Biryani",
    restaurantId: new mongoose.Types.ObjectId("69a46eff343e1785918c91c2"),
    image: "muttonbiryani.png"
  },
  {
    name: "Butter Chicken",
    description: "Creamy butter chicken",
    price: 240,
    category: "Non-Veg Curries",
    restaurantId: new mongoose.Types.ObjectId("69a46eff343e1785918c91c2"),
    image: "butterchicken.png"
  },
  {
    name: "Chocolate Pastry",
    description: "Double Chocolate pastry",
    price: 150,
    category: "Dessert",
    restaurantId: new mongoose.Types.ObjectId("69a46eff343e1785918c91c2"),
    image: "pastry.png"
  },
  {
    name: "Special Chicken Biryani",
    description: "Chef special biryani",
    price: 230,
    category: "Biryani",
    restaurantId: new mongoose.Types.ObjectId("69a46f1d343e1785918c91c5"),
    image: "biryani2.png"
  },
  {
    name: "Chicken Curry",
    description: "Spicy chicken curry",
    price: 200,
    category: "Non-Veg Curries",
    restaurantId: new mongoose.Types.ObjectId("69a46f1d343e1785918c91c5"),
    image: "chickencurry.png"
  },
  {
    name: "Orange Juice",
    description: "Orange Juice made with Oranges",
    price: 140,
    category: "Juice",
    restaurantId: new mongoose.Types.ObjectId("69a46f1d343e1785918c91c5"),
    image: "orange.png"
  },
  {
    name: "Veg Biryani",
    description: "Aromatic veg biryani",
    price: 180,
    category: "Biryani",
    restaurantId: new mongoose.Types.ObjectId("69a46f30343e1785918c91c8"),
    image: "vegbiryani.png"
  },
  {
    name: "Kadai Paneer",
    description: "Paneer cooked with spices",
    price: 190,
    category: "Veg Curries",
    restaurantId: new mongoose.Types.ObjectId("69a46f30343e1785918c91c8"),
    image: "kadai.png"
  },
  {
    name: "Lime Juice",
    description: "Iced Lime Juice",
    price: 120,
    category: "Juice",
    restaurantId: new mongoose.Types.ObjectId("69a46f30343e1785918c91c8"),
    image: "lime.png"
  },
  {
    name: "Veg Fried Rice",
    description: "Chinese veg fried rice",
    price: 160,
    category: "Veg",
    restaurantId: new mongoose.Types.ObjectId("69a46fb0343e1785918c91cb"),
    image: "friedrice.png"
  },
  {
    name: "Chocolate Ice Cream",
    description: "Creamy chocolate ice cream",
    price: 120,
    category: "Ice Cream",
    restaurantId: new mongoose.Types.ObjectId("69a46fb0343e1785918c91cb"),
    image: "icecream.png"
  },
  {
    name: "Lassi",
    description: "Cold Lassi",
    price: 130,
    category: "Milkshake",
    restaurantId: new mongoose.Types.ObjectId("69a46fb0343e1785918c91cb"),
    image: "lassi.png"
  },
  {
    name: "Chicken Fried Rice",
    description: "Chinese chicken fried rice",
    price: 190,
    category: "Non-Veg",
    restaurantId: new mongoose.Types.ObjectId("69b256a089d4f69f9481322f"),
    image: "chickenfriedrice.png"
  },
  {
    name: "Chilli Chicken",
    description: "Spicy chilli chicken",
    price: 210,
    category: "Non-Veg",
    restaurantId: new mongoose.Types.ObjectId("69b256a089d4f69f9481322f"),
    image: "chillichicken.png"
  },
  {
    name: "Brownie",
    description: "Chocolate Yummy Brownie",
    price: 220,
    category: "Dessert",
    restaurantId: new mongoose.Types.ObjectId("69b256a089d4f69f9481322f"),
    image: "brownie.png"
  }
];

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
    console.log("Seed DB:", mongoose.connection.name);

    await foodModel.deleteMany({});
    const inserted = await foodModel.insertMany(foods);

    console.log("Foods seeded successfully");
    console.log("Inserted count:", inserted.length);

    const total = await foodModel.countDocuments();
    console.log("Total foods in DB:", total);

    process.exit();
  } catch (error) {
    console.log("Seed error:", error);
    process.exit(1);
  }
};

seedFoods();