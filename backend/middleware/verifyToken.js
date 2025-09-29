
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'Unauthorized access: No token' });

        const parts = authHeader.split(' ');
        if (parts.length !== 2) return res.status(401).json({ message: 'Unauthorized access: Invalid token format' });

        const token = parts[1];
        const payload = jwt.verify(token, 'freelancekey'); // same secret used for sign
        req.user = payload; // payload.id contains user id
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized access', error: err.message });
    }
}

module.exports = verifyToken;
