function sessionSwagger() {
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
   * paths:
   *   '/api/sessions2':
   *    post:
   *       tags:
   *       - Session2:
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
   *      - Session2:
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

export default sessionSwagger;
