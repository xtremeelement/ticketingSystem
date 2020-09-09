const router = require("express").Router();
const auth = require("../middleware/auth");


router.get("/example", auth, (req, res) => {
    //your code here
})

module.exports = router;