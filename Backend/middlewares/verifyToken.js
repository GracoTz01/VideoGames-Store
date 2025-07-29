// Verify Token Middleware
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Failed to authenticate token.' });
        }
        req.user = {
            id: decoded.userId,
            role: decoded.role
        };
        next();
    });
}

module.exports = verifyToken;
// This middleware checks for a valid JWT token in the request headers.