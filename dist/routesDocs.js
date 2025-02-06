"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1_session_swagger_1 = __importDefault(require("./swagger/1_session.swagger"));
const product_swagger_1 = __importDefault(require("./swagger/product.swagger"));
const session_routes_1 = __importDefault(require("./routes/session.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const worker_thread_routes_1 = __importDefault(require("./routes/worker.thread.routes"));
function routesDocs(app) {
    /**
     * @openapi
     * security:
     *   - bearerAuth: []
     * components:
     *   securitySchemes:
     *     bearerAuth:
     *       type: http
     *       scheme: bearer
     *       bearerFormat: JWT
     * /healthcheck:
     *  get:
     *    tags:
     *    - Healthcheck
     *    description: Responds if app is up and running
     *    responses:
     *      200:
     *        description: App is up and running
     */
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    app.use("/api", user_routes_1.default);
    (0, _1_session_swagger_1.default)();
    app.use("/api", session_routes_1.default);
    (0, product_swagger_1.default)();
    app.use("/api/products", product_routes_1.default);
    app.use("/api/employee", employee_routes_1.default);
    app.use("/api/uploader", upload_routes_1.default);
    app.use("/api/workerthread", worker_thread_routes_1.default);
}
exports.default = routesDocs;
//# sourceMappingURL=routesDocs.js.map