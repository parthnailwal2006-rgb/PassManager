const VaultItem = require("../MODELS/Vaultitem");
const User = require("../MODELS/Users");

const {
  unwrapVaultKey,
  encryptPassword,
} = require("../services/crypto");

const updatePassword = async (req, res) => {
  try {
    const { title, password } = req.body;
    const id = req.params.id || req.body.id;
    const userId = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

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

    // Find the specific item belonging to this user
    const item = await VaultItem.findOne({
      _id: id,
      owner: userId,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Password entry not found",
      });
    }

    // Retrieve the user's wrapped vault key
    const user = await User.findById(userId).select("wrappedVaultKey");

    if (!user || !user.wrappedVaultKey) {
      return res.status(404).json({
        success: false,
        message: "User or vault key not found",
      });
    }

    // Unwrap the vault key
    const vaultKey = unwrapVaultKey(user.wrappedVaultKey);

    // Encrypt the new password
    const encryptedData = encryptPassword(password, vaultKey);

    // Update the title and encrypted password fields
    item.title = title.trim();
    item.encryptedPassword = encryptedData.encryptedPassword;
    item.iv = encryptedData.iv;
    item.authTag = encryptedData.authTag;

    await item.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      item: {
        _id: item._id,
        title: item.title,
        createdAt: item.createdAt,
      },
    });
  } catch (error) {
    console.error("Update password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};

module.exports = updatePassword;
