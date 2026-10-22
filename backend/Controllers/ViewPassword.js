
const VaultItem = require("../MODELS/Vaultitem");
const User = require("../MODELS/Users");

const {
  unwrapVaultKey,
  decryptPassword,
} = require("../services/crypto");

const viewPassword = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch only this user's vault items
    const items = await VaultItem.find({
      owner: userId,
    }).sort({ createdAt: -1 });

    if (items.length === 0) {
      return res.status(200).json({
        success: true,
        items: [],
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

    // Decrypt each password
    const decryptedItems = items.map((item) => ({
      _id: item._id,
      title: item.title,
      password: decryptPassword(
        {
          encryptedPassword: item.encryptedPassword,
          iv: item.iv,
          authTag: item.authTag,
        },
        vaultKey
      ),
      createdAt: item.createdAt,
    }));

    return res.status(200).json({
      success: true,
      items: decryptedItems,
    });
  } catch (error) {
    console.error("View password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve passwords",
    });
  }
};

module.exports = viewPassword;
