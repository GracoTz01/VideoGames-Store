// Verify is user is admin

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    } else {
        next();
    }
}

module.exports = isAdmin;
// This middleware checks if the user has an admin role before allowing access to certain routes.