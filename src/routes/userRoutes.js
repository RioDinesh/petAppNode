const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUserByPhone,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const upload = require("../utils/fileUpload");

// Public routes
router.post("/register", upload.single("profilePic"), registerUser);
router.get("/phone/:phoneNumber", getUserByPhone);

// Protected routes
router.get("/", auth, getUsers);
router.get("/:id", auth, getUser);
router.put("/:id", auth, upload.single("profilePic"), updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
