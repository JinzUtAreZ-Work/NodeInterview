function productSwagger() {
  /**
   * @openapi
   * paths:
   *   '/api/products':
   *    post:
   *       tags:
   *       - Products:
   *       summary: Create user product
   *       requestBody:
   *        required: true
   *        content:
   *          application/json:
   *             schema:
   *                $ref: '#/components/schemas/CreateProductInput'
   *       responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/CreateProductResponse'
   *        403:
   *          description: Forbidden
   *        401:
   *          description: Bad Request
   */
}

export default productSwagger;
