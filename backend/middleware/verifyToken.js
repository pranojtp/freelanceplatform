
// const jwt = require('jsonwebtoken');

// function verifyToken(req, res, next) {
//     try {
//         const authHeader = req.headers['authorization'];
//         if (!authHeader) return res.status(401).json({ message: 'Unauthorized access: No token' });

//         const parts = authHeader.split(' ');
//         if (parts.length !== 2) return res.status(401).json({ message: 'Unauthorized access: Invalid token format' });

//         const token = parts[1];
//         const payload = jwt.verify(token, 'freelancekey'); // same secret used for sign
//         req.user = payload; // payload.id contains user id
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: 'Unauthorized access', error: err.message });
//     }
// }

// module.exports = verifyToken;

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }

    const token = parts[1];

    // Make sure secret matches the one used during login
    const payload = jwt.verify(token, 'freelancekey'); 

    // Attach user info to request
    req.userId = payload.id;     // user _id from login token
    req.role = payload.role;     // "client" or "freelancer"

    next();
    console.log("JWT Payload:", payload);

  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token', error: err.message });
  }
}

module.exports = verifyToken;
