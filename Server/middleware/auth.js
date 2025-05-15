const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Not authenticated' });
    }
    req.user = req.session.user;
    next();
};

module.exports = auth;