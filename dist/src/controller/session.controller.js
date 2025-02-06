"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionHandler = exports.getUserSessionsHandler = exports.createUserSessionHandler = void 0;
const config_1 = __importDefault(require("config"));
const session_service_1 = require("../service/session.service");
const user_service_1 = require("../service/user.service");
const jwt_utils_1 = require("../utils/jwt.utils");
async function createUserSessionHandler(req, res) {
    // Validate the user's password
    const user = await (0, user_service_1.validatePassword)(req.body);
    //console.log("handler", user);
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    // create a session
    const session = await (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
    //console.log("handler", session);
    // create an access token
    const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), "accessTokenPrivateKey", { expiresIn: config_1.default.get("accessTokenTtl") } // 15 minutes,
    );
    // create a refresh token
    const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), "refreshTokenPrivateKey", { expiresIn: config_1.default.get("refreshTokenTtl") } // 15 minutes
    );
    // return access & refresh tokens
    return res.send({ accessToken, refreshToken });
}
exports.createUserSessionHandler = createUserSessionHandler;
async function getUserSessionsHandler(req, res) {
    //console.log("getUser", res.locals);
    const userId = res.locals.user._id;
    const sessions = await (0, session_service_1.findSessions)({ user: userId, valid: true });
    //console.log("session", sessions);
    return res.send(sessions);
}
exports.getUserSessionsHandler = getUserSessionsHandler;
async function deleteSessionHandler(req, res) {
    const sessionId = res.locals.user.session;
    await (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}
exports.deleteSessionHandler = deleteSessionHandler;
//# sourceMappingURL=session.controller.js.map