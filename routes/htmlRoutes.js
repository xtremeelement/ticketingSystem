const router = require("express").Router();
const path = require("path");
const auth = require("../middleware/auth");
const authrole = require("../middleware/authrole");


// user authorized views - they all use the "auth" middleware
router.get("/dashboard", auth, (req, res) => res.sendFile(path.join(__dirname, "../public/dashboard.html")));
router.get("/user/mytickets", auth, (req, res) => res.sendFile(path.join(__dirname, "../public/mytickets.html")));
router.get("/user/profile", auth, (req, res) => res.sendFile(path.join(__dirname, "../public/profile.html")));
router.get("/user/createticket", auth, (req, res) => res.sendFile(path.join(__dirname, "../public/createTicket.html")));
router.get("/user/ticket", auth, (req,res) => res.sendFile(path.join(__dirname, "../public/ticket.html")));

// Admin routes
router.get("/admin/", auth, authrole, (req,res) => {
    res.sendFile(path.join(__dirname, "../public/admindash.html"));
})

// login and register forms view
router.get("/", (req, res) => res.sendFile(path.join(__dirname, "../public/login.html")));
router.get("/register", (req, res) => res.sendFile(path.join(__dirname, "../public/register.html")));

module.exports = router;