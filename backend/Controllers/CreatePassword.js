
const VaultItem = require("../MODELS/Vaultitem");
const User = require("../MODELS/Users");

const {
  unwrapVaultKey,
  encryptPassword,
} = require("../services/crypto");

const createPassword = async (req, res) => {
  try {
    const { title, password } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and password are required",
      });
    }

    // Get the user's wrapped vault key
    const user = await User.findById(userId).select("wrappedVaultKey");

    if (!user || !user.wrappedVaultKey) {
      return res.status(404).json({
        success: false,
        message: "User or vault key not found",
      });
    }
    

    // Unwrap the vault key
    const vaultKey = unwrapVaultKey(user.wrappedVaultKey);

    // Encrypt the password
    const encryptedData = encryptPassword(password, vaultKey);

    // Save encrypted password
    const savedItem = await VaultItem.create({
      owner: userId,
      title: title.trim(),
      encryptedPassword: encryptedData.encryptedPassword,
      iv: encryptedData.iv,
      authTag: encryptedData.authTag,
    });
    user.count = (user.count || 0) + 1;
await user.save();
    return res.status(201).json({
      success: true,
      message: "Password saved successfully",
      item: {
        _id: savedItem._id,
        title: savedItem.title,
        createdAt: savedItem.createdAt,
      },
      count:user.count
    });
  } catch (error) {
    console.error("Create password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to save password",
    });
  }
};

module.exports = createPassword;
