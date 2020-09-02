/* checks to see if the request to a
certain page is allowed ie- not authorized
deny user access to page */
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //get token
    const token = req.headers.authorization.spilt("")[1];
    /*verity token - needs string you used to create token
      when user logged in */
    const decode = jwt.verity(token, "jwt_verity_password");
    next();
  } catch (error) {
    //error - not authenticated
    res.status(401).json({ message: "User not authorized" });
  }
};
