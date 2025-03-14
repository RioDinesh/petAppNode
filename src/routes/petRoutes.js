const express = require("express");
const router = express.Router();
const {
  registerPet,
  getPetsByUserId,
  updatePet,
  deletePet,
} = require("../controllers/petController");
const auth = require("../middleware/auth");
const upload = require("../utils/fileUpload");

// Configure multer for multiple file uploads
const petUpload = upload.fields([
  { name: "petImages", maxCount: 5 },
  { name: "certificates", maxCount: 5 },
]);

// All routes are protected
router.post("/register", auth, petUpload, registerPet);
router.get("/user/:userId", auth, getPetsByUserId);
router.put("/:id", auth, petUpload, updatePet);
router.delete("/:id", auth, deletePet);

module.exports = router;
