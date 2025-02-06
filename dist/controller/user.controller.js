"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const user_service_1 = require("../service/user.service");
async function createUserHandler(req, res) {
    try {
        const user = await (0, user_service_1.createUser)(req.body);
        return res.send(user);
    }
    catch (e) {
        //logger.error(e);
        console.error("control-create-user", e);
        let message = e;
        if (e.code === 11000) {
            message = "Duplicate email";
        }
        else {
            message = e.errordetails;
        }
        return res.status(409).send({ code: 409, message: message });
    }
}
exports.createUserHandler = createUserHandler;
//# sourceMappingURL=user.controller.js.map