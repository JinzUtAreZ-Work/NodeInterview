"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../utils/jwt.utils");
const session_service_1 = require("../service/session.service");
const user_service_1 = require("../service/user.service");
const deserializeUser = async (req, res, next) => {
    var _a;
    //NOTE: the get method converted the null to string null
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = (_a = (0, lodash_1.get)(req, "headers.x-refresh")) === null || _a === void 0 ? void 0 : _a.toString(); // remove error below
    //NOTE:  the tokens repetition = no: open api declarations
    //console.log("tokens", "ref" + refreshToken, "acc" + accessToken);
    if (!accessToken || accessToken === "null") {
        return next();
    }
    const { decoded, expired, valid } = (0, jwt_utils_1.verifyJwt)(accessToken, "accessTokenPublicKey");
    const user = await (0, user_service_1.validatePassword)(req.body);
    //console.log("deserialize", valid, user, accessToken);
    if (!valid && !user) {
        return res.status(401).json({ error: "Please login again" });
    }
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = await (0, session_service_1.reIssueAccessToken)({ refreshToken });
        if (newAccessToken) {
            //res.setHeader("x-access-token", newAccessToken);
            res.set({
                "x-access-token": newAccessToken,
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 24 * 60 * 60 * 1000,
            });
        }
        const result = (0, jwt_utils_1.verifyJwt)(newAccessToken, "accessTokenPublicKey");
        res.locals.user = result.decoded;
        //console.log("deserialize", result);
        return next();
    }
    //console.log("deserialized", decoded, expired);
    return next();
};
exports.default = deserializeUser;
// google.com fetch request error
// pending handleRefreshToken in refreshtokenrotation
//# sourceMappingURL=deserializeUser.js.map