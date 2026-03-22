import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
import {
  addRestaurant,
  listRestaurant,
  removeRestaurant,
  updateRestaurantImage,
  getRestaurant,
} from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();

// image storage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// routes
restaurantRouter.post("/add", upload.single("image"), authMiddleware, addRestaurant);
restaurantRouter.get("/list", listRestaurant);
restaurantRouter.get("/:id", getRestaurant);
restaurantRouter.post("/remove", authMiddleware, removeRestaurant);
restaurantRouter.post(
  "/update-image",
  upload.single("image"),
  authMiddleware,
  updateRestaurantImage
);

export default restaurantRouter;