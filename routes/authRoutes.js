const router = require("express").Router();
const bcrypt = require('bcryptjs');
const db = require("../models");
const passport = require("../config/passport");
const auth = require("../middleware/auth");

// All routes start with: /auth
// Route: /auth/register
router.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        const { username, email, password, passwordTwo, role } = req.body;
        // check if there are any empty fields
        if (!username || !email || !password || !passwordTwo) return res.status(400).json({ message: "Please fill all fields" });
        // check for correct email format
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) return res.status(400).json({ message: "Invalid email format" });
        // check for password length - al least 6 characters
        if (password.length < 6) return res.status(400).json({ message: "Password needs to be at least 6 characters" });
        // for both passwords to be the same
        if (password !== passwordTwo) return res.status(400).json({ message: "Passwords don't match" });
        // check database for a user with the email entered in the form
        const useremail = await db.User.findOne({ where: { email: email } });
        // Check database for a user with the username entered.
        const usersname = await db.User.findOne({ where: {username: username } });
        

        if (useremail) {
            // if user already in database, send error
            res.status(400).json({ message: "Email address already exists." })
        }else if(usersname){
            res.status(400).json({ message: "Username already exists."})
        }else {
            // Using bcrypt to hash the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) throw err;
                    // save hashed password into dtaa base
                    db.User.create(
                        {
                            username,
                            email,
                            password: hash,
                            role
                        }
                    )
                    .then(data => {
                        const { id, email, username } = data;
                        res.json(
                            {
                                id,
                                email,
                                username,
                                role
                            }
                        );
                    })
                    .catch(err => console.log(err));
                });
            });
        }
    } catch (err) {
        if (err) res.status(500).json({ message: "Internal Error" })
    }

});

// Route: /auth/register
router.post("/login", (req, res, next) => {

    const { username, password } = req.body;

    // check if there are any empty fields
    if (username === "" || password === "") return res.status(400).json({ message: "Please fill all fields" });
    // passport Authentication using the "Local strategy" inside the "config" folder config/passport.js."
    // passport check the email and password and returns a function passing three arguments (err, info, user)
    passport.authenticate('local', (err, user, info) => {
        if (err) next(err);
        // if can't find email, or if password is incorrect, send error message (info)
        if (!user) res.status(404).json(info);
        // Log user
        req.logIn(user, function (err) {
            if (err) next(err);
            return res.json(user);
        });
    })(req, res, next);
});

// Route: /auth/user
// route to get user information which is passing the middleware "auth" which checks if user is Authenticated before getting the information from the user.
// you can use the middleware auth to restrict access to pages to users that are not Authenticated
router.get("/user", auth, async (req, res) => {
    try {
        const userdId = req.session.passport.user;
        const user = await db.User.findOne({ where: { id: userdId } })
        const { id, email, username, role } = user;
        res.json({ id, email, username, role });
    } catch (err) {
        if (err) console.log(err)
    }
})
// Route: /auth/logout
router.get("/logout", (req, res) => {
    // Log out user
    req.logout();
    // redirect to main page
    res.redirect('/');
});

module.exports = router;