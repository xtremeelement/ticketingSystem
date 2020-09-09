const router = require("express").Router();
const path = require("path");
const auth = require("../middleware/auth");


// user authorized views - they all use the "auth" middleware
router.get("/dashboard", auth, (req, res) => res.sendFile(path.join(__dirname, "../public/dashboard.html")));
router.get("/user/page2", auth, (req, res) => res.sendFile(path.join(__dirname, "../public/page2.html")));
router.get("/user/profile", auth, (req, res) => res.sendFile(path.join(__dirname, "../public/profile.html")));
router.get("/user/createticket", auth, (req, res) => res.sendFile(path.join(__dirname, "../public/createTicket.html")));

// login and register forms view
router.get("/", (req, res) => res.sendFile(path.join(__dirname, "../public/login.html")));
router.get("/register", (req, res) => res.sendFile(path.join(__dirname, "../public/register.html")));

module.exports = router;