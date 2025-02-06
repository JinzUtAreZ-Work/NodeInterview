"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sessionSwagger() {
    /**
     * @openapi
     * paths:
     *   '/api/sessions':
     *    post:
     *       tags:
     *       - Session:
     *       summary: Create user session
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *             schema:
     *                $ref: '#/components/schemas/CreateSessionInput'
     *       responses:
     *        200:
     *          description: Success
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/CreateSessionResponse'
     *        401:
     *          description: Unauthorized
     *    get:
     *      tags:
     *      - Session:
     *      summary: Retrieve list of access tokens and refresh tokens
     *      responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/GetSessionResponse'
     *       403:
     *         description: Forbidden
     */
}
exports.default = sessionSwagger;
//# sourceMappingURL=1_session.swagger.js.map