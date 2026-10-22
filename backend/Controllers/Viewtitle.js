
const VaultItem = require("../MODELS/Vaultitem");

const viewTitle = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch only this user's vault items
    const items = await VaultItem.find({
      owner: userId,
    }).sort({ createdAt: -1 });

    // Return all titles
    const titles = items.map((item) => ({
      _id: item._id,
      title: item.title,
      createdAt: item.createdAt,
    }));

    return res.status(200).json({
      success: true,
      titles: titles,
    });
  } catch (error) {
    console.error("View title error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve titles",
    });
  }
};

module.exports = viewTitle;
