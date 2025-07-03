const express = require("express");
const cors = require("cors");
const verifyToken = require("./verifyToken");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/verify-token", async (req, res) => {
  const { wallet } = req.body;

  if (!wallet) {
    return res.status(400).json({ valid: false, error: "Wallet required" });
  }

  try {
    const isValid = await verifyToken(wallet);
    return res.json({ valid: isValid });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ valid: false, error: "Verification error" });
  }
});

app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
