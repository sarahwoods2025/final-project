const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // serve static files

// Serve the index.ejs view
app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome to StudyPerks",
    name: null,
    currentPage: "home"
  });
});

// POST endpoint for email verification
app.post("/verify-email", (req, res) => {
  const email = req.body.studentEmail;

  if (email.endsWith("@student.ncirl.ie")) {
    console.log("Verified student email:", email);
    res.send("✅ Email verified successfully. You're eligible for a StudyPerks token.");
  } else {
    res.send("❌ Invalid email. Must be a student email (e.g., @student.ncirl.ie).");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
