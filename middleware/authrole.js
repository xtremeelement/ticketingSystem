// this middleware is created to check if user is Authenticated before grantin access
const url = require("url");

module.exports = function (req, res, next) {
    // "isAuhenticated" is a passport method to check the user
    if (req.user[0].role == "admin") {
        return next();
    } else {
        res.redirect(url.format({
            pathname: "/dashboard",
            query: {
                "auth" : "notAuthorized"
            }
        }))
    }

}