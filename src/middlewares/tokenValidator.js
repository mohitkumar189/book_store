const authController = require('../helpers/authController');

module.exports = async (req, res, next) => {
    const escapedUrlsPOST = ['verify-otp', 'user'];
    const escapedUrlsGET = ['verify-otp', 'user'];

    const reqUrl = req.url.split('/');
    const urlLength = reqUrl.length;

    if (urlLength > 1) {
        if (req.method == 'POST') {
            if (escapedUrlsPOST.indexOf(reqUrl[urlLength - 1]) > -1) {
                return next();
            } else {
                return next(new Error("Not authorize"));
            }
        } else if (req.method == 'GET') {
            if (escapedUrlsGET.indexOf(reqUrl[urlLength - 1]) > -1) {
                return next();
            } else {
                return next(new Error("Not authorize"));
            }
        } else {
            return next();
        }
    }

    if (req.token) {
        try {
            const payLoad = await authController.verifyToken(req.token);
            req.decoded = payLoad;
            return next();
        } catch (error) {
            return next(new Error("Invalid access token" + error));
        }
    } else {
        return next(new Error("Access token is missing"))
    }

}