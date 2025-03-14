const Pet = require("../models/petModel");
const User = require("../models/userModel");

// Register pet profile
const registerPet = async (req, res) => {
  try {
    const { userId, petName, breed, dob } = req.body;

    // Validate required fields
    if (!userId || !petName || !breed || !dob) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Process uploaded files
    const images = req.files["petImages"]
      ? req.files["petImages"].map((file) => `/uploads/images/${file.filename}`)
      : [];

    const certificates = req.files["certificates"]
      ? req.files["certificates"].map((file) => ({
          name: file.originalname,
          fileUrl: `/uploads/certificates/${file.filename}`,
        }))
      : [];

    // Create pet object
    const pet = new Pet({
      userId,
      petName,
      breed,
      dob: new Date(dob),
      images,
      certificates,
    });

    // Save pet
    await pet.save();

    res.status(201).json({
      message: "Pet profile registered successfully",
      pet: {
        id: pet._id,
        petName: pet.petName,
        breed: pet.breed,
        dob: pet.dob,
        images: pet.images,
        certificates: pet.certificates,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pet profiles by user ID
const getPetsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const pets = await Pet.find({ userId });

    if (!pets.length) {
      return res.status(404).json({ message: "No pets found for this user" });
    }

    res.json({ pets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update pet profile
const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      pet[key] = updates[key];
    });

    // Handle new images
    if (req.files["petImages"]) {
      const newImages = req.files["petImages"].map(
        (file) => `/uploads/images/${file.filename}`
      );
      pet.images = [...pet.images, ...newImages];
    }

    // Handle new certificates
    if (req.files["certificates"]) {
      const newCertificates = req.files["certificates"].map((file) => ({
        name: file.originalname,
        fileUrl: `/uploads/certificates/${file.filename}`,
      }));
      pet.certificates = [...pet.certificates, ...newCertificates];
    }

    await pet.save();
    res.json({ message: "Pet profile updated successfully", pet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete pet profile
const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json({ message: "Pet profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerPet,
  getPetsByUserId,
  updatePet,
  deletePet,
};
