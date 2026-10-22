const VaultItem = require("../MODELS/Vaultitem");
const User = require("../MODELS/Users");

const deletePassword = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    const userId = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

    // Delete only if the item belongs to this user
    const item = await VaultItem.findOneAndDelete({
      _id: id,
      owner: userId,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Password entry not found",
      });
    }

    // Get the updated count
    const count = await VaultItem.countDocuments({
      owner: userId,
    });
    const user = await User.findById(userId);
    user.count = count;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password deleted successfully",
      count,
    });
  } catch (error) {
    console.error("Delete password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete password",
    });
  }
};

module.exports = deletePassword;
