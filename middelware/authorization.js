const Auther = (fixRole) => {

    return (req, res, next) => {

        const userRole = req.role;

        if (fixRole.includes(userRole)) {
            next()
        } else {
            return res.send({ "msg": "Unauthorised" })
        }
    }

};

module.exports = {
    Auther
}